import React, { Component } from 'react';

import * as Utils from '../utils';
import CheckboxList from "./CheckboxList"
import SelectGenre from "./SelectGenre"
import SelectActor from "./SelectActor"

class Preferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectGenreVisible: Utils.getFromStorage("sel_genre") === 'true' ? true : false,
            selectActorVisible: Utils.getFromStorage("sel_actor") === 'true' ? true : false
        };
        this.onChangePref = this.onChangePref.bind(this)
    }

    onChangePref(name, value) {
        if (name == "sel_genre") {
            this.setState({
                ...this.state,
                selectGenreVisible: value
            });
        }
        else if (name == "sel_actor") {
            this.setState({
                ...this.state,
                selectActorVisible: value
            });
        }
    }

    render() {
        const onShowPref = this.props.onShowPref ? this.props.onShowPref : f => f
        const { selectGenreVisible, selectActorVisible } = this.state
        const { onChangePref } = this

        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel">
                            <span className="center-align">
                                Настройки приложения
                    </span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 m6" >
                        <CheckboxList onChangePref={onChangePref} />
                    </div>

                    <div className="col s12 m6" >
                        {selectGenreVisible && <SelectGenre />}
                        {selectActorVisible && <SelectActor />}
                    </div>
                </div>


                <div className="row">
                    <div className="col s12">
                        <button className="btn" onClick={() => onShowPref(false)}>Закрыть</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Preferences