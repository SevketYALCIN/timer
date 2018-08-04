import * as React from 'react'

export default class Timer extends React.Component<null, TimerState> {
  constructor() {
    super(null)
    this.state = {
      minute: 0,
      second: 20,
      min: "00",
      sec: "20"
    }
  }

  startTimer = () => {
    let diff = this.state.second + (this.state.minute * 60)
    let interval = setInterval(() => {
      diff--

      // Format display
      const min = (diff / 60).toFixed(0)
      const sec = diff % 60

      this.setState({
        min: ("0" + min).slice(-2),
        sec: ("0" + sec).slice(-2)
      })

      if (diff <= 0) {
        clearInterval(interval)
        // Make sound
      }
    }, 1000)
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
          <button onClick={this.startTimer}> Play </button>
        </div>
      </div>
    )
  }
}

type TimerState = {
  minute: number
  second: number
  min: string
  sec: string
}