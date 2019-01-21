import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class LoginSignUpContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: false,
            signUp: false
        };

        this.buttonSwitched = this.buttonSwitched.bind(this);
    }

    buttonSwitched(word) {
        let login, signUp;

        if (word === 'Sign Up') {
            signUp = true;
            login = false;
        } else {
            signUp = false;
            login = true;
        }
        this.setState({
            login: login,
            signUp: signUp
        });
    }

    render() {
        const {classes} = this.props;
        const login = this.state.login, signUp = this.state.signUp;

        return (
            <div>
                <div onClick={this.buttonSwitched.bind(null, "Login")}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Login Tab
                    </Button>
                </div>

                <div onClick={this.buttonSwitched.bind(null, "Sign Up")}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Sign Up Tab
                    </Button>
                </div>

                { login  ? <Login/> : null }
                { signUp ? <SignUp/> : null }
            </div>
        );
    }
}


LoginSignUpContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginSignUpContainer);