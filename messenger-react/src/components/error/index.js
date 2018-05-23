import React from 'react';
import { render } from 'react-dom'

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {

        return (
            <h2>
                {this.props.error}
            </h2>
        );
    }
}

export default Error;