import * as React from "react";
import "./timer.scss";
import * as Alert from "../../assets/alert.mp3";
import * as Arrow from "../../assets/arrow.svg";
import * as Play from "../../assets/play.svg";
import * as Stop from "../../assets/stop.svg";
import * as Pause from "../../assets/pause.svg";
import * as Skip from "../../assets/skip.svg";
import { ScheduleItem } from "../app/app";

export default class Timer extends React.Component<TimerProps, TimerState> {
  private audioInput: React.RefObject<HTMLAudioElement>;
  interval: any;

  constructor(props: TimerProps) {
    super(props);
    if (props.schedule && props.schedule.length > 0){

    }
    else{
      this.state = {
        minute: this.props.minute,
        second: this.props.second,
        running: false
      };
    }
    this.audioInput = React.createRef();
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
          // Make sound
          this.audioInput.current.play();
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
			const newTime = array.pop()
			this.setState({
				minute: newTime.minute,
				second: newTime.second,
				schedule: array
			})
    }
  };

  componentDidUpdate(prevProps: TimerProps) {
    if(prevProps.schedule != this.props.schedule){
      clearInterval(this.interval);
			var array = [...this.props.schedule]; 
			const newTime = array.pop()
			this.setState({
				minute: newTime.minute,
				second: newTime.second,
				schedule: array
			})
    }
  }

  render() {
    return (
      <div className="timer">
        <div className="clock">
          <div className="minute">
            <div className="arrows">
              <img src={Arrow} onClick={this.incrementMin} />
            </div>
            <div className="numbers">{("0" + this.state.minute).slice(-2)}</div>
            <div className="arrows">
              <img src={Arrow} onClick={this.decrementMin} className="rotate" />
            </div>
          </div>
          <div className="separator">
            <span>:</span>
          </div>
          <div className="second">
            <div className="arrows">
              <img src={Arrow} onClick={this.incrementSec} />
            </div>
            <div className="numbers">{("0" + this.state.second).slice(-2)}</div>
            <div className="arrows">
              <img src={Arrow} onClick={this.decrementSec} className="rotate" />
            </div>
          </div>
        </div>
        <div className="buttons">
          <img
            onClick={this.startTimer}
            src={this.state.running ? Pause : Play}
          />
          {!this.state.schedule && <img onClick={this.stopTimer} src={Stop} />}
          {(this.state.schedule && this.state.schedule.length > 0) && (
            <img onClick={this.onNext} src={Skip} />
          )}
          <audio
            ref={this.audioInput}
            id="audio"
            src={Alert}
            autoPlay={false}
          />
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
}
