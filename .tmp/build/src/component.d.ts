import * as React from "react";
import { CategoryAfterProcess } from "./interface/category";
interface State {
    textLabel?: string;
    textValue?: string;
    size?: number;
    background?: string;
    borderWidth?: number;
    mounthSelected?: string;
    categoryData?: CategoryAfterProcess[];
    filteredCategoryData?: CategoryAfterProcess[];
    categorySelected?: CategoryAfterProcess;
}
export declare const initialState: State;
export declare class ReactVisualCard extends React.Component<{}, State> {
    private static updateCallback;
    constructor(props: any);
    componentWillMount(): void;
    componentWillUnmount(): void;
    static update(newState: State): void;
    onClickFailureBox(id: string): void;
    renderSquareBoxes(squareCount: number, arrayBgrColor: number[]): any[];
    renderFailureBox(id: string, title: string, squareCount: number, arrayBgrColor: number[], renderBoxBefore?: boolean): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
