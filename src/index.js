import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
    
	state = { lat: null, errorMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
		    position => this.setState({ lat: position.coords.latitude}),
		    err => this.setState({ errMessage: err.message })
			// Since we are updating State here, it will cause the App component to rerender
	    );
	}
	
	//custom_method
	renderContent() {
		if (this.state.errMessage && !this.state.lat){
			return <div>Error: {this.state.errMessage}</div>;
		}
		
		if (!this.state.errMessage && this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />;
		}
		
		return <Spinner message="Please allow location request" />;
	}
	// This method is required to be defined inside Class Component
	render()  {
	    return <div>{this.renderContent()}</div>;
		
	}
}

ReactDOM.render(<App />, document.querySelector("#root"))