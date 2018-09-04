import * as React from 'react';
import './timer.scss';
import * as Arrow from '../../assets/arrow.svg';
import * as Play from '../../assets/play.svg';
import * as Stop from '../../assets/stop.svg';
import * as Pause from '../../assets/pause.svg';
import * as Skip from '../../assets/skip.svg';
import * as Replay from '../../assets/replay.svg';
import { ScheduleItem } from '../app/app';

export default class Timer extends React.Component<TimerProps, TimerState> {
  interval: any;

  constructor(props: TimerProps) {
    super(props);
    if (props.schedule && props.schedule.length > 0) {
      var array = [...this.props.schedule];
      const newTime = array.shift();
      this.setState({
        minute: newTime.minute,
        second: newTime.second,
        schedule: array
      });
    } else {
      this.state = {
        minute: this.props.minute,
        second: this.props.second,
        running: false
      };
    }
  }

  startTimer = () => {
    if (this.state.minute < 1 && this.state.second < 1) {
      return false;
    }

    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ running: false });
    } else {
      let diff = this.state.second + this.state.minute * 60;
      this.setState({ running: true });
      this.interval = setInterval(() => {
        diff--;

        // Format display
        const min = Math.floor(diff / 60);
        const sec = diff % 60;

        this.setState({
          minute: min,
          second: sec
        });

        if (diff <= 0) {
          clearInterval(this.interval);
          this.setState({ running: false });
          this.props.onTimeUp();
        }
      }, 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.interval);
    this.setState({
      running: false,
      minute: this.props.minute,
      second: this.props.second
    });
  };

  incrementMin = () => {
    if (!this.state.running) {
      const newMinute = this.state.minute + 1;
      this.setState({
        minute: newMinute
      });
    }
  };

  decrementMin = () => {
    if (!this.state.running) {
      switch (this.state.minute) {
        case 1:
          this.setState({
            minute: 0
          });
          break;
        case 0:
          break;
        default:
          const newMinute = this.state.minute - 1;
          this.setState({
            minute: newMinute
          });
      }
    }
  };

  incrementSec = () => {
    if (!this.state.running) {
      if (this.state.second >= 59) {
        this.setState({
          second: 0,
          minute: this.state.minute + 1
        });
      } else {
        const newSecond = this.state.second + 1;
        this.setState({
          second: newSecond
        });
      }
    }
  };

  decrementSec = () => {
    if (!this.state.running) {
      switch (this.state.second) {
        case 1:
          this.setState({
            second: 0
          });
          break;
        case 0:
          if (this.state.minute > 0) {
            this.setState({
              minute: this.state.minute - 1,
              second: 59
            });
          }
          break;
        default:
          const newSecond = this.state.second - 1;
          this.setState({
            second: newSecond
          });
      }
    }
  };

  onNext = () => {
    if (this.state.schedule && this.state.schedule.length > 0) {
      clearInterval(this.interval);
      var array = [...this.state.schedule];
      const newTime = array.shift();
      this.setState({
        minute: newTime.minute,
        second: newTime.second,
        schedule: array,
        running: false
      });
    }
  };

  componentDidUpdate(prevProps: TimerProps) {
    if (prevProps.schedule != this.props.schedule) {
      clearInterval(this.interval);
      var array = [...this.props.schedule];
      const newTime = array.shift();
      this.setState({
        minute: newTime.minute,
        second: newTime.second,
        schedule: array,
        running: false
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  resetScheduleMode = () => {
    this.setState({schedule: null}, () => this.stopTimer())
  }

  render() {
    return (
      <div className="timer">
        <div className="clock">
          <div className="minute">
            {(!this.state.running && !this.state.schedule) && (
              <div className="arrows">
                <img src={Arrow} onClick={this.incrementMin} />
              </div>
            )}
            <div className="numbers">{('0' + this.state.minute).slice(-2)}</div>
            {(!this.state.running && !this.state.schedule) && (
              <div className="arrows">
                <img
                  src={Arrow}
                  onClick={this.decrementMin}
                  className="rotate"
                />
              </div>
            )}
          </div>
          <div className="separator">
            <span>:</span>
          </div>
          <div className="second">
            {(!this.state.running && !this.state.schedule) && (
              <div className="arrows">
                <img src={Arrow} onClick={this.incrementSec} />
              </div>
            )}
            <div className="numbers">{('0' + this.state.second).slice(-2)}</div>
            {(!this.state.running && !this.state.schedule) && (
              <div className="arrows">
                <img
                  src={Arrow}
                  onClick={this.decrementSec}
                  className="rotate"
                />
              </div>
            )}
          </div>
        </div>
        <div className="buttons">
          <img
            onClick={this.startTimer}
            src={this.state.running ? Pause : Play}
          />
          {!this.state.schedule && <img onClick={this.stopTimer} src={Stop} />}
          {this.state.schedule && 
            this.state.schedule.length > 0 && (
              <img onClick={this.onNext} src={Skip} />
            )}
          {this.state.schedule && (
            <img src={Replay} onClick={this.resetScheduleMode} />
          )}
        </div>
      </div>
    );
  }
}

interface TimerState {
  minute: number;
  second: number;
  running: boolean;
  schedule?: ScheduleItem[];
}

interface TimerProps {
  minute: number;
  second: number;
  schedule?: ScheduleItem[];
  onTimeUp: () => void;
}
