import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login/Login';
// import Upload from './containers/Upload/Upload';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Login/>
                {/*<Upload/>*/}
            </div>
        );
    }
}

export default App;
