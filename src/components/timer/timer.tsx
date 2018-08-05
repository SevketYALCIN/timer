import * as React from 'react'
import './timer.scss'
import * as Alert from '../../alert.mp3'

export default class Timer extends React.Component<null, TimerState> {
  private audioInput: React.RefObject<HTMLAudioElement>;
  constructor() {
    super(null)
    this.state = {
      minute: 0,
      second: 2,
      min: "00",
      sec: "02"
    }
    this.audioInput = React.createRef()
  }

  startTimer = () => {
    let diff = this.state.second + (this.state.minute * 60)
    let interval = setInterval(() => {
      diff--

      // Format display
      const min = Math.floor(diff / 60)
      const sec = diff % 60

      this.setState({
        min: ("0" + min).slice(-2),
        sec: ("0" + sec).slice(-2)
      })

      if (diff <= 0) {
        clearInterval(interval)
        // Make sound
        this.audioInput.current.play()
      }
    }, 1000)
  }

  incrementMin = () => {
    const newMinute = this.state.minute + 1
    this.setState({
      minute: newMinute,
      min:("0" + newMinute).slice(-2),
    })
  }

  decrementMin = () => {
    switch(this.state.minute){
      case 1:
        this.setState({
          minute: 0,
          min: "00",
        })
        break;
      case 0:
        break;
      default:
        const newMinute = this.state.minute - 1
        this.setState({
          minute: newMinute,
          min: ("0" + newMinute).slice(-2)
        })
    }
  }

  incrementSec = () => {
    const newSecond = this.state.second + 1
    this.setState({
      second: newSecond,
      sec:("0" + newSecond).slice(-2),
    })
  }

  decrementSec = () => {
    switch(this.state.second){
      case 1:
        this.setState({
          second: 0,
          sec: "00",
        })
        break;
      case 0:
        break;
      default:
        const newSecond = this.state.second - 1
        this.setState({
          second: newSecond,
          sec: ("0" + newSecond).slice(-2)
        })
    }
  }

  render() {
    return(
      <div className="timer">
        <div className="clock">
          <span>{this.state.min}</span>
          :
          <span>{this.state.sec}</span>
        </div>
        <div className="buttons">
          <button onClick={this.incrementMin}> MinPlus </button>
          <button onClick={this.decrementMin} > MinMinus </button>
          <button onClick={this.incrementSec}> SecPlus </button>
          <button onClick={this.decrementSec} > SecMinus </button>
          <button onClick={this.startTimer}> Play </button>
          <audio ref={this.audioInput} id="audio" src={Alert} autoPlay={false} ></audio>
        </div>
      </div>
    )
  }
}

interface TimerState {
  minute: number
  second: number
  min: string
  sec: string
}