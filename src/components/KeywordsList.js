import React, { Component } from 'react';

const KeywordsList = ({ keywords = [] }) =>
    (keywords.length > 0) &&
    <div>Ключевые слова:
        {keywords.map((keyword, id) =>
        <a key={id} target="_blank" href={'https://www.themoviedb.org/keyword/' + keyword.id + '/movie'} style={{ marginBottom: '5px' }}>
            <span className="green lighten-3 white-text" style={
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
            }>{keyword.name}</span>
        </a>
    )}
    </div>

export default KeywordsList