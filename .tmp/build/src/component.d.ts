import * as React from "react";
interface State {
    textLabel: string;
    textValue: string;
    size: number;
    background?: string;
    borderWidth?: number;
}
export declare const initialState: State;
export declare class ReactCircleCard extends React.Component<{}, State> {
    private static updateCallback;
    constructor(props: any);
    componentWillMount(): void;
    componentWillUnmount(): void;
    static update(newState: State): void;
    renderSquareBoxes(squareCount: number, arrayBgrColor: string[]): any[];
    renderFailureBox(title: string, squareCount: number, arrayBgrColor: string[]): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
