import React, { Component } from 'react';

import * as Utils from '../utils';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: Utils.getFromStorage(this.props.name) === 'true' ? true : false
        };
        this.setProperty = this.setProperty.bind(this)
    }

    setProperty(e) {
        const { target } = e;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        this.setState({ checked: value });

        Utils.setToStorage(name, value)
        console.log(name, value)

        const onChangePref = this.props.onChangePref ? this.props.onChangePref : f => f
        onChangePref(name, value)
    }

    render() {
        const onShowPref = this.props.onShowPref ? this.props.onShowPref : f => f
        const { name, title } = this.props
        const { setProperty } = this
        const { checked } = this.state

        return (
            <p>
                <label>
                    <input type="checkbox" name={name} checked={checked} onChange={setProperty} />
                    <span>{title}</span>
                </label>
            </p>
        );
    }

}

export default Checkbox