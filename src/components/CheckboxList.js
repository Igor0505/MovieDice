import React, { Component } from 'react';

import * as Utils from '../utils';

import Checkbox from "./Checkbox"

const CheckboxList = ({ onChangePref = f => f }) =>
    <div className="card white lighten-5" >
        <div className="card-content">
            <span className="card-title">Что отображать</span>
            {Utils.movieUrls.map((movieUrl, id) =>
                <Checkbox name={movieUrl.name} title={movieUrl.title} key={id} onChangePref={onChangePref} />
            )}
        </div>
    </div>

export default CheckboxList