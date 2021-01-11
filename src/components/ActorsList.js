import React, { Component } from 'react';

import * as Utils from '../utils';

const ActorsList = ({ casts = [] }) =>
    <p>
        {casts.map((cast, id) =>
            <a key={id} target="_blank" href={'https://www.themoviedb.org/person/' + cast.id + "?language=ru-RU"}>{cast.name}, </a>
        )}
    </p>

export default ActorsList