import React, { Component } from 'react';
import Upload from "./Upload/Upload";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            redirect: false
        };
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('json', JSON.stringify(this.state));

        fetch("http://localhost/stenzo/demo_react/api/demo.php", {
            method: "POST",
            body: formData
        }).then((response) => {
            this.setState({redirect: true});
            console.log(response);
        });
    }

    render() {
        const go = this.state.redirect;

        if(go) return <Upload/>;

        return (
            <form method="post">
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        className="form-control"
                        value={this.state.name}
                        type="text"
                        name="username"
                        onChange={e => this.setState({name: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={e => this.setState({password: e.target.value})}
                    />
                </div>

                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={e => this.submitForm(e)}
                    value="Login"
                    name={"submit"}>Submit
                </button>

            </form>
        );
    }
}

export default Login;
