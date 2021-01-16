import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Preferences from "./Preferences"

const PreferencesButton = ({ visible = false, onShowPref = f => f }) =>
    visible ?
        <Preferences onShowPref={onShowPref} /> :
        <div className="fixed-action-btn">
            <a className="btn-floating waves-effect waves-light btn-large yellow darken-4" onClick={() => onShowPref(true)}>
                <FontAwesomeIcon icon="cog" size="lg" />
            </a>
        </div>

export default PreferencesButton