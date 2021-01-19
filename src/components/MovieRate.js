import React, { Component } from 'react';

const MovieRate = ({ moviedata = null, vote_average_color = '#FFFFFF' }) =>
    <div style={{ fontSize: "1rem", position: "absolute", top: "3px", right: "10px" }}>
        {/* {moviedata.block_title} */}
        {/* <div className="lenta">
        </div> */}
        <div style={{ position: "absolute", top: "2px", right: "0px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="54.000000pt" height="46.000000pt" viewBox="0 0 965.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1280.000000) scale(0.1500,-0.1000)" fill="#0a0a0add" stroke="none">
                    <path d="M2270 6499 c0 -5022 2 -5980 14 -5977 7 2 33 19 57 40 24 20 69 57 99 82 83 69 334 274 405 331 35 28 90 73 123 100 33 28 202 167 377 310 174 143 360 296 414 340 54 44 187 153 297 243 109 90 224 183 254 208 164 137 213 176 223 180 16 6 98 -56 433 -324 677 -541 838 -669 890 -707 30 -22 178 -139 330 -260 152 -121 382 -304 511 -407 129 -104 239 -188 244 -188 5 0 9 2529 9 5995 0 3297 0 5998 0 6003 0 4 -1053 8 -2340 10 l-2340 2 0 -5981z" />

                </g>
            </svg>
        </div>

        {/* <span
            className=" new badge black-text z-depth-1"
            data-badge-caption=""
            style={{ fontSize: "1.2rem", height: "1.8rem", paddingTop: "3px", backgroundColor: vote_average_color }}>
            {!moviedata.vote_average ? "N/A" : moviedata.vote_average}
        </span> */}

        <div style={{ position: "absolute", top: "17px", right: "12px", minWidth: "2rem", textAlign: 'center', color: '#fff' }}>
            <span
                style={{ fontSize: "1.2rem", height: "1.8rem", paddingTop: "3px" }}>
                {!moviedata.vote_average ? "N/A" : moviedata.vote_average}
            </span>
        </div >
    </div >

export default MovieRate