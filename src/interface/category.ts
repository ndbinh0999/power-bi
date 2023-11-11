export interface CategoryData {
    displayName: string;
    value: (number | string)[];
}

export interface CategoryAfterProcess {
    Id: string;
    Category: string;
    Gate: number[];
    Datatime: string;
}