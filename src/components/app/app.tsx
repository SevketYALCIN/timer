import * as React from "react";
import './app.scss';

class App extends React.Component<AppProps> {
	render() {
		return (
			<div className="app">
				<h1>Timer</h1>
			</div>
		);
	}
}

interface AppProps{
	title: string
}

export default App;