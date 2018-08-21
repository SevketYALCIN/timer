import * as React from "react";
import "./pane.scss";
import { ScheduleItem } from "../app/app";
import * as Cross from "../../assets/cross.svg";

export default class Pane extends React.Component<PaneProps, PaneState> {
  constructor(props: PaneProps) {
    super(props);
    this.state = {
      schedule: this.props.schedule,
      inputValues: [],
      playSound: true
    };
  }

  onSave = () => {
    // TODO: check if values are correctly formatted
    const schedule: ScheduleItem[] = this.state.inputValues.map(item => {
      const splits = item.split(":");
      const el: ScheduleItem = {
        minute: parseInt(splits[0]),
        second: parseInt(splits[1])
      };
      return el;
    });
    this.props.onChange(schedule);
  };

  createInputs() {
    return this.state.inputValues.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          value={el || ""}
          onChange={event => this.handleChange(i, event)}
          placeholder='12:45'
        />
        <input
          type="button"
          value="x"
          onClick={() => this.removeClick(i)}
        />
      </div>
    ));
  }

  handleChange = (i: number, event: any) => {
    let values = [...this.state.inputValues];
    values[i] = event.target.value;
    this.setState({ inputValues: values });
  };

  addClick = () => {
    this.setState(prevState => ({
      inputValues: [...prevState.inputValues, ""]
    }));
  };

  removeClick(i: number) {
    let values = [...this.state.inputValues];
    values.splice(i, 1);
    this.setState({ inputValues: values });
  }

  toggleSound = (input: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      playSound: input.currentTarget.checked
    });
    this.props.toggleSound(input.currentTarget.checked);
  };

  render() {
    let ref = this;
    return (
      <div className={this.props.active ? "pane active" : "pane"}>
        <img id="close" src={Cross} onClick={this.props.close} />
        <h2>Play Sound</h2>
        <input
          type="checkbox"
          checked={this.state.playSound}
          onChange={this.toggleSound}
        />
        <h2>Schedule</h2>
        <button onClick={this.addClick}>Add a timeslot</button>
        {this.createInputs()}
        <button onClick={this.onSave}>Save and Apply</button>
      </div>
    );
  }
}

interface PaneProps {
  schedule?: ScheduleItem[];
  onChange: (newSchedule: ScheduleItem[]) => void;
  active: boolean;
  close: () => void;
  toggleSound: (bool: boolean) => void;
}

interface PaneState {
  schedule?: ScheduleItem[];
  inputValues: string[];
  playSound: boolean;
}
