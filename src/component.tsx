import * as React from "react";

interface State {
  textLabel: string;
  textValue: string;
  size: number;
  background?: string;
  borderWidth?: number;
}

export const initialState: State = {
  textLabel: "",
  textValue: "",
  size: 200,
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

  renderSquareBoxes(squareCount: number, arrayBgrColor: string[]) {
    const squareBoxes = [];

    for (let i = 1; i <= squareCount; i++) {
      const backgroundColor = i === 8 ? "#2BA84E" : arrayBgrColor[i - 1];
      if (i !== 4 && i !== 6) {
        squareBoxes.push(
          <div key={i} className="square-box" style={{ backgroundColor }}>
            <p style={{ textAlign: "center" }}>{i}</p>
          </div>
        );
      }
    }

    return squareBoxes;
  }

  renderFailureBox(
    title: string,
    squareCount: number,
    arrayBgrColor: string[]
  ) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div className="chart-divider"></div>
        <div className="rectangle-box">
          <p className="content">{title}</p>
        </div>
        {this.renderSquareBoxes(squareCount, arrayBgrColor)}
      </div>
    );
  }

  render() {
    const { textLabel, textValue, size, background, borderWidth } = this.state;
    const style: React.CSSProperties = {
      width: size,
      height: size,
      background,
      borderWidth,
    };

    return (
      <div className="chart-wrapper">
        <div>
          {[
            {
              title: "P-way failure",
              squareCount: 7,
              bgrColors: ["red", "red", "red", "red", "red", "red", "#2BA84E"],
            },
            {
              title: "Structural / Geotech failure",
              squareCount: 7,
              bgrColors: [
                "red",
                "#2BA84E",
                "red",
                "red",
                "red",
                "red",
                "#2BA84E",
              ],
            },
            {
              title: "Electric / plant failure",
              squareCount: 7,
              bgrColors: [
                "red",
                "red",
                "#2BA84E",
                "red",
                "red",
                "red",
                "#2BA84E",
              ],
            },
            {
              title: "Diver error",
              squareCount: 3,
              bgrColors: ["red", "red", "red", "red", "red", "red", "#2BA84E"],
            },
            {
              title: "Signalling fault",
              squareCount: 7,
              bgrColors: [
                "#EDEDEF",
                "#EDEDEF",
                "#EDEDEF",
                "red",
                "red",
                "red",
                "#2BA84E",
              ],
            },
            {
              title: "Rolling stock / mecgenical faiure",
              squareCount: 7,
              bgrColors: [
                "#EDEDEF",
                "#EDEDEF",
                "#EDEDEF",
                "red",
                "red",
                "red",
                "#2BA84E",
              ],
            },
            {
              title: "Line obstructions / incursions",
              squareCount: 7,
              bgrColors: [
                "#EDEDEF",
                "#EDEDEF",
                "#EDEDEF",
                "red",
                "red",
                "red",
                "#2BA84E",
              ],
            },
          ].map(({ title, squareCount, bgrColors }, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                borderRight: [0, 6].includes(index) ? "" : "2px solid black",
              }}
            >
              {[0, 6].includes(index) && (
                <div
                  className={`${
                    index === 0 ? "vertical-line-top" : "vertical-line-bottom "
                  }`}
                ></div>
              )}
              {this.renderFailureBox(title, squareCount, bgrColors)}
            </div>
          ))}
        </div>
        <div>
          <div className="circle-card" style={style}>
            <div className="vector-x"></div>
            <div className="vector-y"></div>
            <p className="content">
              Major Train <br /> Accident
              {/* {textLabel}
              <br />
              <em>{textValue}</em> */}
              <div className="square-box-of-circle-card">
                Raillway Transport <br /> Operations
              </div>
            </p>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div className="chart-divider"></div>
            <div className="square-box" style={{ backgroundColor: "#2BA84E" }}>
              <div className="vertical-line-top-1" style={{}}></div>
              <p style={{ textAlign: "center" }}>6</p>
            </div>
            <div className="rectangle-box">
              <p className="content">Prolonged service disruption</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderLeft: "2px solid black",
              position: "relative",
            }}
          >
            <div className="chart-divider"></div>

            <div className="square-box" style={{ backgroundColor: "#2BA84E" }}>
              <p style={{ textAlign: "center" }}>6</p>
            </div>
            <div className="rectangle-box">
              <p className="content">Passenger injuries or fetalities</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderLeft: "2px solid black",
              position: "relative",
            }}
          >
            <div className="chart-divider"></div>

            <div className="square-box" style={{ backgroundColor: "#2BA84E" }}>
              <p style={{ textAlign: "center" }}>6</p>
            </div>
            <div className="rectangle-box">
              <p className="content">Financial damage</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderLeft: "2px solid black",
              position: "relative",
            }}
          >
            <div className="chart-divider"></div>

            <div className="square-box" style={{ backgroundColor: "#2BA84E" }}>
              <p style={{ textAlign: "center" }}>6</p>
            </div>
            <div className="rectangle-box">
              <p className="content">Financial damage</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div className="chart-divider"></div>
            <div className="square-box" style={{ backgroundColor: "#2BA84E" }}>
              <p style={{ textAlign: "center" }}>6</p>
            </div>
            <div className="rectangle-box">
              <div className="vertical-line-bottom-1" style={{}}></div>
              <p className="content">
                Legal or regulatory action (individuals or Corporation)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
