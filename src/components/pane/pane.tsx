import * as React from 'react';
import './pane.scss';
import { ScheduleItem } from '../app/app';
import * as Cross from '../../assets/cross.svg';
import { Checkbox, Button, Input } from 'semantic-ui-react';

export default class Pane extends React.Component<PaneProps, PaneState> {
  matchRegex: RegExp = /\d{1,2}:\d{2}/

  constructor(props: PaneProps) {
    super(props);
    this.state = {
      schedule: this.props.schedule,
      inputValues: [],
      playSound: true
    };
  }

  onSave = () => {
    if (this.state.inputValues.every(item => item !== '')) {
      if (
        this.state.inputValues.filter(
          item => item.length < 1 || !item.match(this.matchRegex)
        ).length > 0
      ) {
        
        return false;
      }
      const schedule: ScheduleItem[] = this.state.inputValues.map(item => {
        const splits = item.split(':');
        const el: ScheduleItem = {
          minute: parseInt(splits[0]),
          second: parseInt(splits[1])
        };
        return el;
      });
      this.props.onChange(schedule);
    } else {
      alert('Please fill all the timeslots');
      return false;
    }
  };

  createInputs() {
    return this.state.inputValues.map((el, i) => (
      <div className="timeslot-container" key={i}>
        <Input
          action={{ icon: 'delete', onClick: () => this.removeClick(i) }}
          value={el || ''}
          onChange={event => this.handleChange(i, event)}
          placeholder="12:45"
          size="tiny"
          error={this.state.inputValues[i] != '' && !this.state.inputValues[i].match(this.matchRegex)}
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
      inputValues: [...prevState.inputValues, '']
    }));
  };

  removeClick(i: number) {
    let values = [...this.state.inputValues];
    values.splice(i, 1);
    this.setState({ inputValues: values });
  }

  toggleSound = (input: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      playSound: !this.state.playSound
    }, () => {
      this.props.toggleSound(this.state.playSound);
    });
  };

  render() {
    let ref = this;
    return (
      <div className={this.props.active ? 'pane active' : 'pane'}>
        <img id="close" src={Cross} onClick={this.props.close} />
        <h2>Play Sound</h2>
        <Checkbox
          toggle
          checked={this.state.playSound}
          onChange={this.toggleSound}
        />
        <h2>Schedule</h2>
        <div className="schedule-container">
          <Button secondary onClick={this.addClick}>
            Add a timeslot
          </Button>
          <div className="timeslots">{this.createInputs()}</div>
          <Button
            primary
            onClick={this.onSave}
            disabled={this.state.inputValues.length < 1 || this.state.inputValues.filter(
              item => item.length < 1 || !item.match(this.matchRegex)
            ).length > 0}
          >
            Save and Apply
          </Button>
        </div>
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
