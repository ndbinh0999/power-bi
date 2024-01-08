"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IViewport = powerbi.IViewport;
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";

// Import React dependencies and the added component
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactVisualCard, initialState } from "./component";
import "./../style/visual.less";

export class Visual implements IVisual {
  private target: HTMLElement;
  private reactRoot: React.ComponentElement<any, any>;
  private viewport: IViewport;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  public getMonthName(monthNumber: number): string {
    const monthNames: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber - 1] || "";
  }
  public getCurrentMonth(): string {
    const currentDate: Date = new Date();
    const currentMonth: number = currentDate.getMonth() + 1;

    return this.getMonthName(currentMonth);
  }

  private clear() {
    ReactVisualCard.update(initialState);
  }

  constructor(options: VisualConstructorOptions) {
    this.reactRoot = React.createElement(ReactVisualCard, {});
    this.target = options.element;
    this.formattingSettingsService = new FormattingSettingsService();

    ReactDOM.render(this.reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    const currentMonth: string = this.getCurrentMonth();

    function processJSON(jsonString) {
      try {
        const result = [];

        const idValues = jsonString.categories[0].values;
        const categoryValues = jsonString.categories[1].values;
        const gate1Values = jsonString.categories[2].values;
        const gate2Values = jsonString.categories[3].values;
        const gate3Values = jsonString.categories[4].values;
        const gate4Values = jsonString.categories[5].values;
        const gate5Values = jsonString.categories[6].values;
        const gate6Values = jsonString.categories[7].values;
        const gate7Values = jsonString.categories[8].values;

        const datetimeValues = jsonString.categories[9].values;

        for (let i = 0; i < idValues.length; i++) {
          const item = {
            Id: idValues[i],
            Category: categoryValues[i],
            Gate: [
              gate1Values[i],
              gate2Values[i],
              gate3Values[i],
              gate4Values[i],
              gate5Values[i],
              gate6Values[i],
              gate7Values[i],
            ],
            Datatime: datetimeValues[i],
          };
          result.push(item);
        }

        return result;
      } catch (error) {
        console.error("Error processing JSON:", error);
        return [];
      }
    }

    const inputJson = options.dataViews[0].categorical;
    const processedData = processJSON(inputJson);
    console.log("processedData", processedData);

    if (processedData) {
      const filteredData = processedData.filter(
        (item) => item.Datatime === currentMonth
      );
      ReactVisualCard.update({ categoryData: processedData });
      ReactVisualCard.update({ filteredCategoryData: filteredData });
    }

    if (options.dataViews && options.dataViews[0]) {
      const dataView: DataView = options.dataViews[0];
      this.viewport = options.viewport;
      const { width, height } = this.viewport;
      const size = Math.min(width, height);
      this.formattingSettings =
        this.formattingSettingsService.populateFormattingSettingsModel(
          VisualFormattingSettingsModel,
          options.dataViews
        );
      const circleSettings = this.formattingSettings.circleCard;
      // console.log(processedData);

      ReactVisualCard.update({
        textLabel: dataView.metadata.columns[0].displayName,
        textValue: dataView.single.value.toString(),
        size,
        borderWidth: circleSettings.circleThickness.value,
        background: circleSettings.circleColor.value.value,
      });
    } else {
      this.clear();
    }
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
