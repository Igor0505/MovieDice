import React, { Component } from 'react';

const MovieTitle = ({ moviedata = null }) =>
    <a target="_blank" className="black-text text-lighten-3" style={{ fontSize: "1rem" }} href={'https://www.themoviedb.org/movie/' + moviedata.id + '?language=ru-RU'}>{moviedata.title}</a>

export default MovieTitle