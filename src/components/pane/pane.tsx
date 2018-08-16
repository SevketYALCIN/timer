import * as React from "react";
import "./pane.scss";
import { ScheduleItem } from "../app/app";
import * as Cross from "../../assets/cross.svg";

export default class Pane extends React.Component<PaneProps, PaneState> {
  inputs: any[]
  constructor(props: PaneProps) {
    super(props)
    this.state = {
      schedule: this.props.schedule,
      nodes: []
    }
    this.inputs = [];
  }

  onSave = () => {
    this.inputs.map((input) => console.log(input.value));
    // this.props.onChange([{
    //   minute: 0,
    //   second: 30
    // },{
    //   minute: 3,
    //   second: 30
    // },{
    //   minute: 5,
    //   second: 30
    // }])
  }

  addLine = (node:any) => {
    this.setState({
      nodes: [...this.state.nodes, node]
    })
  }

  addRef = (node:any) => {
    this.inputs = [...this.inputs, node]
  }

  render() {
    let ref = this;
    return (
      <div className={this.props.active ? "pane active" : "pane"}>
        <img id="close" src={Cross} onClick={this.props.close} />
        <h2>Schedule</h2>
        {this.state.nodes.map((item) => {
          return <input type="text" ref={ref.addRef} />
        })}
        <button onClick={this.addLine} >+</button>
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
  nodes: any[]
}