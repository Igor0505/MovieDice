import React, { Component } from 'react';

import * as Utils from '../utils';
import MovieDetail from './MovieDetail';
import GenresList from './GenresList'

/*
adult: false
backdrop_path: "/nlCHUWjY9XWbuEUQauCBgnY8ymF.jpg"
belongs_to_collection: {id: 8945, name: "Безумный Макс (Коллекция)", poster_path: "/dhp7PoxYtf72LXFqOFRsWLmD0br.jpg",…}
budget: 150000000
genres: [{id: 28, name: "боевик"}, {id: 12, name: "приключения"}, {id: 878, name: "фантастика"}]
homepage: "https://www.warnerbros.com/movies/mad-max-fury-road"
id: 76341
imdb_id: "tt1392190"
original_language: "en"
original_title: "Mad Max: Fury Road"
overview: "Вскоре после отмщения за смерть жены и сына, Макс Рокатански покинул ряды «Основного силового патруля» и уехал в глушь, где скитается в одиночестве, пока мир медленно падает в последствии нефтяного кризиса и глобальной войны. Не имея ничего, кроме своей машины «Перехватчик», Максу предстоит научиться, как выжить в пост-апокалиптической пустоши и сражаться с жестокими, безжалостными воинами, которые населяют её."
popularity: 53.181
poster_path: "/3tdXXuXIWU26LffOntbYFfX1SNN.jpg"
production_companies: [{id: 2537, logo_path: null, name: "Kennedy Miller Productions", origin_country: "AU"},…]
production_countries: [{iso_3166_1: "AU", name: "Australia"}, {iso_3166_1: "US", name: "United States of America"},…]
release_date: "2015-05-13"
revenue: 378858340
runtime: 120
spoken_languages: [{english_name: "English", iso_639_1: "en", name: "English"}]
status: "Released"
tagline: "Какой чудесный день"
title: "Безумный Макс: Дорога ярости"
video: false
vote_average: 7.5
vote_count: 17359
*/


class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviedata: null,
            loaded: false,
            placeholder: "Загрузка"
        };
    }

    componentDidMount() {
        const append = "append_to_response=similar,credits,keywords";
        const category = "movie/";
        const { moviedata } = this.props

        // console.log(this.props)

        if (moviedata) {
            const data = Utils.getData(category + moviedata.movieid, 1, append)
            data.then(result => {
                // console.log('result', result)

                this.setState(() => {
                    const moviedata = {
                        ...result,
                        block_title: this.props.moviedata.block_title
                    }

                    return {
                        moviedata,
                        loaded: true,
                        placeholder: "Загружено"
                    }
                });

            })
        }
    }

    fine_budget(budget) {
        if (budget !== 0) {
            let result = "";
            let t = 1;
            let temp_bud = budget.toString().split("");
            for (let index = temp_bud.length - 1; index >= 0; index--) {
                result += temp_bud[index];
                if (t % 3 === 0)
                    result += " ";
                t++;
            }
            return result.split("").reverse().join("");
        }

        return budget
    }

    render() {
        const { moviedata } = this.state
        const { id } = this.props
        console.log("moviedata", moviedata, id)

        if (this.state.loaded && moviedata) {
            const poster_path = moviedata.poster_path === null ? "/img/default.jpg" : "http://image.tmdb.org/t/p/w342/" + moviedata.poster_path
            const vote_average = moviedata.vote_average === null ? 0 : +moviedata.vote_average
            let vote_average_color = "green"
            if (vote_average < 5.0) vote_average_color = "red"
            else if (vote_average < 7.0) vote_average_color = "yellow"
            const releaseDate = new Date(moviedata.release_date)
            // <div className="card hoverable blue-grey darken-2"> white-text

            return (
                <div>
                    <div className="card hoverable blue-grey lighten-5">

                        <div className="card-content ">
                            <span className="card-title">{moviedata.block_title}
                                <span className={vote_average_color + " new badge black-text"} data-badge-caption="">{!moviedata.vote_average ? "N/A" : moviedata.vote_average}</span>
                            </span>

                            <div className="row">
                                <div className="col s12 m3">
                                    <img src={poster_path} style={{ maxWidth: "100%", height: "auto", border: "1px solid #cecece", borderRadius: "5px" }} />
                                </div>
                                <div className="col s12 m9">
                                    <GenresList genres={moviedata.genres} />
                                    <div style={{ textAlign: 'justify!important' }}>{moviedata.overview}</div>
                                    <p>Дата релиза: <b>{releaseDate.toLocaleDateString("ru")} г.</b></p>
                                    {(moviedata.runtime !== 0) && <p>Продолжительность: <b>{moviedata.runtime} мин.</b></p>}
                                    {(moviedata.budget !== 0) && <p>Бюджет: <b>{this.fine_budget(moviedata.budget)} $</b></p>}
                                    {(moviedata.tagline !== '') && <p>Ключевая фраза: <b>{moviedata.tagline}</b></p>}

                                </div>
                            </div>
                            <h5 className="red-text text-lighten-3">{moviedata.title}</h5>

                        </div>
                        <div className="card-action">
                            <button data-target={"modal" + id} className="btn modal-trigger">Детали</button>
                        </div>

                    </div >
                    <MovieDetail moviedata={moviedata} id={id} />
                </div>
            );
        }

        return (
            <div className="card blue-grey lighten-5">
                <div className="card-content">
                    <h5>{this.state.placeholder}</h5>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default Movie