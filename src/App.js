import React, {Component} from 'react';
import './App.css';
import LoginSignUpContainer from './containers/LoginSignUpContainer/LoginSignUpContainer';

class App extends Component {

    render() {
        return (
            <div className="App">
                <LoginSignUpContainer/>
            </div>
        );
    }
}

export default App;
