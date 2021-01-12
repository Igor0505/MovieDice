import React from 'react';

import Preferences from "./Preferences"

const PreferencesButton = ({ visible = false, onShowPref = f => f }) =>
    visible ?
        <Preferences onShowPref={onShowPref} /> :
        <div className="row">
            <div className="col s12">
                <button className="btn waves-effect waves-light btn-small yellow darken-4" onClick={() => onShowPref(true)}>Настройки</button>
            </div>
        </div>


export default PreferencesButton