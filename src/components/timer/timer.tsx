import * as React from 'react';
import './timer.scss';
import * as Alert from './alert.mp3';
import * as Arrow from './arrow.png';

export default class Timer extends React.Component<null, TimerState> {
  private audioInput: React.RefObject<HTMLAudioElement>;
  interval: any;

  constructor() {
    super(null);
    this.state = {
      minute: 5,
      second: 0,
      running: false
    };
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
      minute: 5,
      second: 0
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
      const newSecond = this.state.second + 1;
      this.setState({
        second: newSecond
      });
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
          break;
        default:
          const newSecond = this.state.second - 1;
          this.setState({
            second: newSecond
          });
      }
    }
  };

  render() {
    return (
      <div className="timer">
        <div className="clock">
          <div className="minute">
            <div className="arrows">
              <img src={Arrow} onClick={this.incrementMin} className="rotate" />
            </div>
            <div>{('0' + this.state.minute).slice(-2)}</div>
            <div className="arrows">
              <img src={Arrow} onClick={this.decrementMin} />
            </div>
          </div>
          :
          <div className="second">
            <div className="arrows">
              <img src={Arrow} onClick={this.incrementSec} className="rotate" />
            </div>
            <span>{('0' + this.state.second).slice(-2)}</span>
            <div className="arrows">
              <img src={Arrow} onClick={this.decrementSec} />
            </div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={this.startTimer}> Play </button>
          <button onClick={this.stopTimer}> Stop </button>
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
}
