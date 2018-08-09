import * as React from "react";
import Timer from "../timer/timer";
import "./app.scss";

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      minute: 5,
			second: 0,
			schedule: [{minute: 5, second: 0}, {minute:2, second:0}]
    };
  }

  onNext = () => {
    if (this.state.schedule && this.state.schedule.length > 0) {
			var array = [...this.state.schedule]; 
			const newTime = array.pop()
			this.setState({
				minute: newTime.minute,
				second: newTime.second,
				schedule: array
			})
    }
  };

  render() {
    return (
      <div className="app">
        <Timer
          minute={this.state.minute}
          second={this.state.second}
          onNext={this.onNext}
          showNext={
            this.state.schedule && this.state.schedule.length > 0
              ? true
              : false
          }
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

interface ScheduleItem {
  minute: number;
  second: number;
}

export default App;
