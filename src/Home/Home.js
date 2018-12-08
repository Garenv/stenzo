import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Next from "./Next";

class Home extends Component {
    constructor(props) {
        super(props);
        this.goNext = this.goNext.bind(this);
    }

    render() {
        return (
            <div>
                <form action="http://localhost/demo_react/api/demo.php" method={"POST"} encType="multipart/form-data">

                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input className="form-control" type="text" name="username"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" name="password"/>
                    </div>

                    <Router>
                        <Link to={Next}>
                            <button className="btn btn-primary" onSubmit={(e) => this.goNext(e)} value="Login" name={"submit"}>Submit</button>
                        </Link>
                    </Router>

                </form>
            </div>
        );
    }
}

export default Home;
