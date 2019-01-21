import React, { Component } from 'react';

class Stack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picture: [],
            selectedPicture: 0
        };

        this.toggleNext = this.toggleNext.bind(this);
        this.togglePrevious = this.togglePrevious.bind(this);
    }

    toggleNext() {
        console.log("clicked toggleNext()");
        if(this.state.selectedPicture === this.state.picture.length - 1) {
            console.log("This is this.state.selectedPicture ==> " + this.state.selectedPicture);
            return;
        }

        this.setState(prevState => ({
            selectedPicture: prevState.selectedIndex + 1
        }));
    }

    togglePrevious() {
        console.log("clicked togglePrevious()");
        if(this.state.selectedPicture === 0) {
            return;
        }

        this.setState(prevState => ({
            selectedPicture: prevState.selectedPicture - 1
        }));
    }

    render() {
        return(
            <div>
                <img src={this.props.imagesOnStack} alt=""/>
                <button onClick={this.toggleNext}>Next</button>
                <button onClick={this.togglePrevious}>Prev</button>
            </div>
        );
    }
}

export default Stack;