import React, { Component } from 'react';

class Stack extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h1>Reach Deck (Stack page)</h1>
                <img src={this.props.imagesOnStack} alt=""/>
            </div>
        );
    }
}

export default Stack;