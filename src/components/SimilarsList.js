import React, { Component } from 'react';

const SimilarsList = ({ similars = [] }) =>
    (similars.length > 0) &&
    <div>Похожие:
        <ul className="collection">
            {similars.map((similar, id) =>
                <li key={id} className="collection-item">
                    <img height="100" src={similar.poster_path === null ? "/img/default.jpg" : "http://image.tmdb.org/t/p/w500/" + similar.poster_path} />
                    <br />
                    <a target="_blank" href={'https://www.themoviedb.org/movie/' + similar.id + '?language=ru-RU'}>{similar.title}</a>
                </li>
            )}
        </ul>
    </div>

export default SimilarsList