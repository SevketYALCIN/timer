import * as React from "react";
import Timer from "../timer/timer";
import "./app.scss";

class App extends React.Component<null, AppState> {
  constructor() {
    super(null)
    this.state = {
      schedule: null
    }
  }

  render() {
    return (
      <div className="app">
        <Timer
          minute={5}
          second={0}
          schedule={this.state.schedule}
        />
      </div>
    );
  }
}

interface AppState {
  schedule?: ScheduleItem[];
}

export interface ScheduleItem {
  minute: number;
  second: number;
}

export default App;
