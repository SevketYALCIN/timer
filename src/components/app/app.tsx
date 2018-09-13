import * as React from 'react';
import Timer from '../timer/timer';
import Pane from '../pane/pane';
import './app.scss';
import * as Menu from '../../assets/menu.svg';
import * as Alert from '../../assets/bell.mp3';

class App extends React.Component<null, AppState> {
  audioInput: React.RefObject<HTMLAudioElement>;

  constructor() {
    super(null);
    this.state = {
      schedule: null,
      showPane: false,
      playSound: true
    };
    this.audioInput = React.createRef();
  }

  updateSchedule = (newSchedule: ScheduleItem[]) => {
    this.setState({
      schedule: newSchedule,
      showPane: false
    });
  };

  showMenu = () => {
    this.setState({
      showPane: true
    });
  };

  hideMenu = () => {
    this.setState({
      showPane: false
    });
  };

  toggleSoundCheck = (bool: boolean) => {
    this.setState({
      playSound: bool
    });
  };

  playSound = () => {
    if (this.state.playSound) {
      this.audioInput.current.play();
    }
  };

  render() {
    return (
      <div className="app">
        {this.state.showPane && (
          <div id="blurBackground" onClick={this.hideMenu} />
        )}
        <img id="menuImg" src={Menu} onClick={this.showMenu} />
        <Timer
          minute={5}
          second={0}
          schedule={this.state.schedule}
          onTimeUp={this.playSound}
        />
        <Pane
          close={() => this.setState({ showPane: false })}
          active={this.state.showPane}
          onChange={this.updateSchedule}
          schedule={this.state.schedule}
          toggleSound={this.toggleSoundCheck}
        />
        <audio ref={this.audioInput} id="audio" src={Alert} autoPlay={false} />
      </div>
    );
  }
}

interface AppState {
  schedule?: ScheduleItem[];
  showPane: boolean;
  playSound: boolean;
}

export interface ScheduleItem {
  minute: number;
  second: number;
}

export default App;
