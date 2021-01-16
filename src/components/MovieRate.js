import React, { Component } from 'react';

const MovieRate = ({ moviedata = null, vote_average_color = '#FFFFFF' }) =>
    <span className="card-title" style={{ fontSize: "1rem", position: "absolute", top: "15px", left: "5px" }}>
        {/* {moviedata.block_title} */}
        <span
            className=" new badge black-text z-depth-1"
            data-badge-caption=""
            style={{ fontSize: "1.2rem", height: "1.8rem", paddingTop: "3px", backgroundColor: vote_average_color }}>
            {!moviedata.vote_average ? "N/A" : moviedata.vote_average}
        </span>
    </span>

export default MovieRate