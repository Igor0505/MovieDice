import React, { Component } from 'react';

import * as Utils from '../utils';

const GenresList = ({ genres = [] }) =>
    <div>
        {genres.map((genre, id) =>
            <div key={id} style={{ marginBottom: '5px' }}>
                <a target="_blank" href={'https://www.themoviedb.org/discover/movie?with_genres[]=' + genre.id}>
                    <span className="blue lighten-3 white-text" style={
                        {
                            minWidth: '3rem',
                            padding: '6px',
                            marginLeft: '5px',
                            marginBottom: '5px',
                            textAlign: 'center',
                            fontSize: '0.8rem',
                            fontWeight: '300',
                            height: '1rem',
                            boxSizing: 'border-box',
                            borderRadius: '2px'
                        }
                    }>{genre.name}</span>
                </a>
            </div >
        )}
    </div >

export default GenresList