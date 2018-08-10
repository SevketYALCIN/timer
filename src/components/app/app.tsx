import * as React from "react";
import Timer from "../timer/timer";
import "./app.scss";

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      minute: 5,
      second: 0
    };
  }

  render() {
    return (
      <div className="app">
        <Timer
          minute={this.state.minute}
          second={this.state.second}
          schedule={this.state.schedule}
        />
      </div>
    );
  }
}

interface AppProps {
  title: string;
}

interface AppState {
  minute: number;
  second: number;
  schedule?: ScheduleItem[];
}

export interface ScheduleItem {
  minute: number;
  second: number;
}

export default App;
