import * as React from "react";
import { CategoryAfterProcess } from "./interface/category";
import { getColorType } from "./constants/index";
import { Row, Col, Dropdown, Input, Empty, Button, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface State {
  textLabel?: string;
  textValue?: string;
  size?: number;
  background?: string;
  borderWidth?: number;
  mounthSelected?: string;
  categoryData?: CategoryAfterProcess[];
  filteredCategoryData?: CategoryAfterProcess[];
}

export const initialState: State = {
  textLabel: "",
  textValue: "",
  size: 200,
  mounthSelected: "",
  categoryData: [],
  filteredCategoryData: [],
};

export class ReactCircleCard extends React.Component<{}, State> {
  private static updateCallback: ((data: State) => void) | null = null;

  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    ReactCircleCard.updateCallback = (newState: State): void => {
      this.setState(newState);
    };
  }

  componentWillUnmount() {
    ReactCircleCard.updateCallback = null;
  }

  static update(newState: State) {
    if (typeof ReactCircleCard.updateCallback === "function") {
      ReactCircleCard.updateCallback(newState);
    }
  }

  renderSquareBoxes(squareCount: number, arrayBgrColor: number[]) {
    const squareBoxes = [];

    for (let i = 0; i < squareCount; i++) {
      if (arrayBgrColor[i] === 0) continue;
      const backgroundColor = getColorType.get(arrayBgrColor[i]);
      squareBoxes.push(
        <div key={i} className="square-box" style={{ backgroundColor }}>
          <p style={{ textAlign: "center" }}>{i + 1}</p>
        </div>
      );
    }

    return squareBoxes;
  }

  renderFailureBox(
    title: string,
    squareCount: number,
    arrayBgrColor: number[],
    renderBoxBefore?: boolean
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: renderBoxBefore ? "space-between" : "",
          alignItems: "center",
          position: "relative",
        }}
      >
        {renderBoxBefore && this.renderSquareBoxes(squareCount, arrayBgrColor)}
        <div className="chart-divider"></div>
        <div className="rectangle-box">
          <p className="content">{title}</p>
        </div>
        {!renderBoxBefore && this.renderSquareBoxes(squareCount, arrayBgrColor)}
      </div>
    );
  }

  render() {
    const items = [
      {
        label: "Jan",
        key: "Jan",
      },
      {
        label: "Feb",
        key: "Feb",
      },
      {
        label: "Mar",
        key: "Mar",
      },
      {
        label: "Apr",
        key: "Apr",
      },
      {
        label: "May",
        key: "May",
      },
      {
        label: "Jun",
        key: "Jun",
      },
      {
        label: "Jul",
        key: "Jul",
      },
      {
        label: "Aug",
        key: "Aug",
      },
      {
        label: "Sep",
        key: "Sep",
      },
      {
        label: "Oct",
        key: "Oct",
      },
      {
        label: "Nov",
        key: "Nov",
      },
      {
        label: "Dec",
        key: "Dec",
      },
    ];

    const menuProps = {
      items,
      onClick: (e: any) => {
        this.setState({ mounthSelected: e.key });
        this.setState({
          filteredCategoryData: this.state.categoryData.filter((item) => {
            return item.Datatime === e.key;
          }),
        });
        console.log("filteredCategoryData", this.state.filteredCategoryData);
      },
    };

    const {
      textLabel,
      textValue,
      size,
      background,
      borderWidth,
      categoryData,
    } = this.state;

    const style: React.CSSProperties = {
      width: size,
      height: size,
      background,
      borderWidth,
    };

    return (
      <>
        <Row justify={"end"} style={{ width: "100%", marginBottom: "20px" }}>
          <Col span={6}>
            <Dropdown menu={menuProps}>
              <Button className="dropdown">
                <Space>
                  {this.state.filteredCategoryData[0]
                    ? this.state.filteredCategoryData[0]?.Datatime
                    : "Please select month!"}
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <div
        >
          {this.state.filteredCategoryData[0] ? (
            <div className="chart-wrapper">
              <div>
                {this.state.filteredCategoryData
                  .slice(0, 7)
                  .map((item: CategoryAfterProcess, index) => {
                    if (index > 6) return;
                    return (
                      <div
                        key={item.Id}
                        style={{
                          position: "relative",
                          borderRight: [0, 6].includes(index)
                            ? ""
                            : "2px solid black",
                        }}
                      >
                        {[0, 6].includes(index) && (
                          <div
                            className={`${index === 0
                                ? "vertical-line-top"
                                : "vertical-line-bottom "
                              }`}
                          ></div>
                        )}
                        {this.renderFailureBox(item.Category, 7, item.Gate)}
                      </div>
                    );
                  })}
              </div>
              <div>
                <div className="circle-card" style={style}>
                  <div className="vector-x"></div>
                  <div className="vector-y"></div>
                  <p className="content">
                    Major Train <br /> Accident
                    <div className="square-box-of-circle-card">
                      Raillway Transport <br /> Operations
                    </div>
                  </p>
                </div>
              </div>
              <div>
                {this.state.filteredCategoryData
                  .slice(7, 12)
                  .map((item: CategoryAfterProcess, index) => {
                    console.log("index", index);

                    if (index > 5) return;
                    return (
                      <div
                        key={item.Id}
                        style={{
                          position: "relative",
                          borderLeft: [0, 4].includes(index)
                            ? ""
                            : "2px solid black",
                        }}
                      >
                        {[0, 4].includes(index) && (
                          <div
                            className={`${index === 0
                                ? "vertical-line-top-1"
                                : "vertical-line-bottom-1"
                              }`}
                          ></div>
                        )}
                        {this.renderFailureBox(
                          item.Category,
                          7,
                          item.Gate,
                          true
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </>
    );
  }
}
