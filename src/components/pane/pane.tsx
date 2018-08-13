import * as React from "react";
import "./pane.scss";
import { ScheduleItem } from "../app/app";
import * as Cross from "../../assets/cross.svg";

export default class Pane extends React.Component<PaneProps, PaneState> {
  constructor(props: PaneProps) {
    super(props)
    this.state = {
      schedule: this.props.schedule
    }
  }

  onSave = () => {
    this.props.onChange([{
      minute: 0,
      second: 30
    },{
      minute: 3,
      second: 30
    },{
      minute: 5,
      second: 30
    }])
  }

  render() {
    return (
      <div className={this.props.active ? "pane active" : "pane"}>
        <img id="close" src={Cross} onClick={this.props.close} />
        <button onClick={this.onSave}>Save</button>
      </div>
    );
  }
}

interface PaneProps {
  schedule?: ScheduleItem[];
  onChange: (newSchedule:ScheduleItem[]) => void;
  active: boolean;
  close: () => void;
}

interface PaneState {
  schedule?: ScheduleItem[];
}