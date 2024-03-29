export declare enum CategoryEnum {
    P_WAY = "P-way failure",
    STRUCTURAL = "Structural / Geotech failure",
    ELECTRIC = "Electric / plant failure",
    DRIVER_ERROR = "Diver error",
    SIGNALLING_FAULT = "Signalling fault",
    ROLLING_STOCK = "Rolling stock / mechanical failure",
    LINE_OBSTRUCTION = "Line obstructions / incursions",
    PROLONGED = "Prolonged service disruption",
    PASSENGER = "Passenger injuries or fetalities",
    FINANCIAL = "Financial damage",
    REPUTATIONAL = "Financial damage",
    LEGAL_OR_REGULATORY = "Legal or regulatory action (individuals or Corporation)"
}
export declare enum ColorType {
    ControlIsNotPerforming = "red",
    ControllIsDemonstrably = "#2BA84E",
    Inconsistency = "#7D53DE",
    Insufficient = " #A9A9A9"
}
export declare enum ColorTypeEnum {
    ControlIsNotPerforming = 1,
    ControllIsDemonstrably = 2,
    Inconsistency = 3,
    Insufficient = 4
}
export declare const getColorType: Map<ColorTypeEnum, ColorType>;
export declare const monthsList: {
    label: string;
    key: string;
}[];
