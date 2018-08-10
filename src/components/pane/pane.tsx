import * as React from "react";
import "./pane.scss";
import { ScheduleItem } from "../app/app";

export default class Pane extends React.Component<PaneProps> {
  constructor(props: PaneProps) {
    super(props)
    this.state = {
      schedule: this.props.schedule
    }
  }

  render() {
    return (
      <div className={this.props.active ? "pane active" : "pane"}>
      </div>
    );
  }
}

interface PaneProps {
  schedule?: ScheduleItem[];
  onChange: (newSchedule:ScheduleItem[]) => void;
  active: boolean;
}