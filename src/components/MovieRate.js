import React, { Component } from 'react';

const MovieRate = ({ moviedata = null, vote_average_color = '#FFFFFF' }) =>
    <div style={{ fontSize: "1rem", position: "absolute", top: "5px", right: "10px" }}>
        {/* {moviedata.block_title} */}
        {/* <div className="lenta">
        </div> */}
        <div style={{ position: "absolute", top: "0px", right: "0px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="32.000000pt" height="64.000000pt" viewBox="0 0 798.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1280.000000) scale(0.1000,-0.1000)" fill={vote_average_color} stroke="#ffffff">
                    <path d="M3114 12546 l-249 -255 -345 60 c-190 32 -348 59 -352 59 -5 0 -80 -143 -167 -319 l-160 -318 -48 -7 c-232 -32 -646 -96 -651 -100 -3 -4 -29 -161 -57 -351 -28 -189 -53 -346 -55 -348 -3 -3 -146 -75 -317 -161 -258 -129 -313 -160 -313 -177 0 -11 25 -169 56 -352 l55 -332 -255 -250 -255 -250 164 -316 165 -315 -165 -315 -165 -314 254 -253 253 -253 -58 -342 c-33 -188 -59 -345 -59 -349 0 -5 144 -80 320 -168 235 -118 320 -165 320 -178 1 -48 98 -674 106 -681 5 -5 164 -31 353 -60 189 -28 345 -52 347 -54 1 -1 72 -145 157 -319 86 -175 157 -318 159 -318 2 0 41 7 87 15 47 8 87 13 89 10 2 -2 -187 -1114 -421 -2472 -233 -1357 -423 -2469 -423 -2470 1 -2 240 283 531 632 290 350 531 637 534 640 4 2 134 -344 290 -768 156 -425 287 -775 290 -779 4 -4 198 1104 431 2462 234 1359 427 2470 430 2470 3 0 196 -1111 430 -2470 233 -1358 427 -2466 431 -2462 3 4 134 354 290 779 156 424 286 770 290 768 3 -3 244 -290 534 -640 291 -349 530 -634 531 -632 0 1 -187 1095 -417 2432 -230 1337 -421 2448 -425 2469 l-6 39 43 -7 c24 -4 63 -10 86 -13 l42 -6 156 314 c87 173 159 316 161 318 4 5 547 86 646 97 66 8 56 -14 88 199 69 466 79 520 91 524 6 2 150 72 319 156 l306 153 -59 351 -59 351 255 253 256 252 -165 314 -165 313 167 317 166 316 -255 250 -256 250 60 345 c32 190 59 348 59 352 0 5 -144 80 -320 168 -176 88 -320 166 -320 173 0 10 -30 217 -84 585 -8 51 -17 96 -20 99 -3 3 -153 28 -333 54 -181 27 -337 51 -348 54 -16 3 -59 82 -175 319 -125 254 -159 315 -175 316 -11 0 -170 -25 -354 -56 l-334 -57 -251 256 -251 256 -314 -164 -314 -165 -310 162 c-171 90 -314 164 -318 166 -4 2 -118 -112 -255 -252z" />
                </g>
            </svg>
        </div>

        {/* <span
            className=" new badge black-text z-depth-1"
            data-badge-caption=""
            style={{ fontSize: "1.2rem", height: "1.8rem", paddingTop: "3px", backgroundColor: vote_average_color }}>
            {!moviedata.vote_average ? "N/A" : moviedata.vote_average}
        </span> */}

        <div style={{ position: "absolute", top: "17px", right: "6px", minWidth: "2rem", textAlign: 'center' }}>
            <span
                style={{ fontSize: "1.2rem", height: "1.8rem", paddingTop: "3px" }}>
                {!moviedata.vote_average ? "N/A" : moviedata.vote_average}
            </span>
        </div >
    </div >

export default MovieRate