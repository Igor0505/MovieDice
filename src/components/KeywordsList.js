import React, { Component } from 'react';

const KeywordsList = ({ keywords = [] }) =>
    (keywords.length > 0) &&
    <div>Ключевые слова:
        {keywords.map((keyword, id) =>
        <div key={id} style={{ marginBottom: '5px' }}>
            <a target="_blank" href={'https://www.themoviedb.org/discover/movie?with_keywords[]=' + keyword.id}>
                <span className="green lighten-3 white-text" style={
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
                }>{keyword.name}</span>
            </a>
        </div>
    )}
    </div >

export default KeywordsList