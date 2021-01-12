import React, { Component } from 'react';

const GenresList = ({ genres = [] }) =>
    <div>
        {genres.map((genre, id) =>
            <a key={id} target="_blank" href={'https://www.themoviedb.org/genre/' + genre.id + '/movie'} style={{ marginBottom: '5px' }}>
                <span className="blue lighten-3 white-text" style={
                    {
                        minWidth: '3rem',
                        padding: '3px',
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
        )}
    </div >

export default GenresList