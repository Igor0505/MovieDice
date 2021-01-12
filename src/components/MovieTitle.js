import React, { Component } from 'react';

const MovieTitle = ({ moviedata = null }) =>
    <a target="_blank" className="black-text text-lighten-3" style={{ fontSize: "1rem" }} href={'https://www.imdb.com/title/' + moviedata.imdb_id}>{moviedata.title}</a>

export default MovieTitle