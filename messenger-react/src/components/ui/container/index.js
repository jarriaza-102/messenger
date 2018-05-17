import React from 'react';
import { render } from 'react-dom';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.getClassName = this.getClassName.bind(this);
    }

    getClassName() {
        return "container " + this.props.class;
    }

    render() {
        return (
            <div className={this.getClassName()}>
                {this.props.children}
            </div>
        );
    }
}

export default Container;