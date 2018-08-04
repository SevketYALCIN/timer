import * as React from "react";
import Timer from '../timer/timer'
import './app.scss';

class App extends React.Component<AppProps> {
	render() {
		return (
			<div className="app">
				<Timer />
			</div>
		);
	}
}

interface AppProps{
	title: string
}

export default App;