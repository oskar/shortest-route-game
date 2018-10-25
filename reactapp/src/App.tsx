import * as React from "react";
import { Grid } from "./Grid";
import { simple, Level } from "./maps";

type AppState = {
  level: Level;
};

export class App extends React.Component {
  state: AppState = {
    // grid: Array(30).fill(0).map(x => Array(20).fill(0))
    level: simple
  };

  handleClick = ({ x, y }: { x: number; y: number }) => {
    console.log(`Clicked at: (${x}, ${y})`);

    const grid = this.state.level.grid;
    grid[y][x] = grid[y][x] ? 0 : 1;

    this.setState({
      grid
    });
  };

  public render() {
    return <Grid level={this.state.level} onClick={this.handleClick} />;
  }
}
