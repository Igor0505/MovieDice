import React, { Component } from 'react';

const MovieBlockTitle = ({ block_title = '', vote_average_color = '#rgb(27, 27, 27)' }) =>
    <div className="vertical" style={{ backgroundColor: vote_average_color }}>
        {block_title}
    </div>

export default MovieBlockTitle