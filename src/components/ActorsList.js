import React, { Component } from 'react';

const ActorsList = ({ casts = [] }) =>
    <p>
        {casts.map((cast, id) =>
            <a key={id} target="_blank"
                href={'https://www.themoviedb.org/person/' + cast.id + "?language=ru-RU"}
                className="waves-effect waves-light btn-small"
                style={{ height: "1.5rem", padding: "0 5px", margin: "3px", lineHeight: "24px" }}
            >{cast.name}</a>
        )}
    </p>

export default ActorsList