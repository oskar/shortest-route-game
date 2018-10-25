import * as React from "react";
import { Stage, Layer, Rect, Circle, RegularPolygon, Line } from "react-konva";
import { Level, Coordinate } from "./maps";
import * as PF from "pathfinding";

type GridProps = {
  level: Level;
  moves?: ReadonlyArray<Coordinate>;
  onClick: (coordinate: Coordinate) => void;
};

export class Grid extends React.Component<GridProps> {
  render() {
    const { grid, start, end } = this.props.level;
    const ySize = window.innerHeight / grid.length;
    const xSize = window.innerWidth / grid[0].length;
    const size = Math.min(xSize, ySize);

    const pfGrid = new PF.Grid(grid) as any;
    pfGrid.setWeightAt(9, 21, 2);
    pfGrid.setWeightAt(10, 21, 2);

    const finder = new PF.AStarFinder({
      diagonalMovement: PF.DiagonalMovement.IfAtMostOneObstacle
    });
    const path = finder.findPath(start.x, start.y, end.x, end.y, pfGrid);

    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        offset={{ x: size / 2, y: size / 2 }}
      >
        <Layer>
          {grid.map((row, y) =>
            row.map((blocked, x) => (
              <Rect
                key={`${x}${y}`}
                x={x * size}
                y={y * size}
                offset={{ x: size / 2, y: size / 2 }}
                width={size}
                height={size}
                fill={blocked ? "black" : "white"}
                stroke={"gray"}
                strokeWidth={1}
                onClick={() => this.props.onClick({ x, y })}
                onTap={() => this.props.onClick({ x, y })}
              />
            ))
          )}
        </Layer>

        <Layer>
          <Line
            points={([] as number[]).concat(...path).map(n => n * size)}
            stroke={"blue"}
            strokeWidth={10}
            tension={0}
            lineJoin={"round"}
            listening={false}
          />

          {/* {path.map(([x, y]) => {
            return (
              <Rect
                key={`${x}${y}`}
                x={x * size}
                y={y * size}
                width={size}
                height={size}
                fill={"green"}
              />
            );
          })} */}
        </Layer>
        <Layer>
          <Circle
            radius={size}
            width={size}
            height={size}
            x={end.x * size}
            y={end.y * size}
            fill={"red"}
          />
          <RegularPolygon
            sides={3}
            radius={size / 2}
            x={start.x * size}
            y={start.y * size}
            fill={"red"}
          />
        </Layer>
      </Stage>
    );
  }
}
