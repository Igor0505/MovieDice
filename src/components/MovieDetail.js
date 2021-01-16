import React, { Component } from 'react';
import M from 'materialize-css'

import ActorsList from './ActorsList'
import GenresList from './GenresList'
import KeywordsList from './KeywordsList'
import SimilarsList from './SimilarsList'
import MovieTitle from './MovieTitle'
import Imdb from './Imdb'
import WatchlistButton from './WatchlistButton';
import FavoriteButton from './FavoriteButton';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        const options = { startingTop: '4%', endingTop: '10%' }

        const modal = this.modalRef.current;
        // console.log(modal)
        M.Modal.init(modal, options);
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
        const { moviedata, id } = this.props
        const poster_path = moviedata.poster_path === null ? "/img/default.jpg" : "http://image.tmdb.org/t/p/w342/" + moviedata.poster_path
        const releaseDate = new Date(moviedata.release_date)

        return (
            <div id={"modal" + id} className="modal" ref={this.modalRef}>
                <div className="modal-content">
                    <h5>{moviedata.block_title}</h5>
                    {/* <h4>{moviedata.title}</h4> */}
                    <MovieTitle moviedata={moviedata} />

                    <div className="row">
                        <div className="col s12 m3 center-align">
                            <img src={poster_path} style={{ maxWidth: "100%", height: "auto", border: "1px solid #cecece", borderRadius: "5px" }} />
                            <Imdb moviedata={moviedata} />
                            <FavoriteButton moviedata={moviedata} />
                            <WatchlistButton moviedata={moviedata} />
                        </div>

                        <div className="col s12 m6">
                            <GenresList genres={moviedata.genres} />
                            <p>Оригинальное название: <b>{moviedata.original_title}</b></p>
                            <p>{moviedata.overview}</p>
                            <p>Дата релиза: <b>{releaseDate.toLocaleDateString("ru")} г.</b></p>
                            {
                                (moviedata.belongs_to_collection !== null) &&
                                <p>Коллекция: <b>
                                    <a target="_blank" href={'https://www.themoviedb.org/collection/' + moviedata.belongs_to_collection.id}>
                                        {moviedata.belongs_to_collection.name}</a></b>
                                </p>
                            }
                            {(moviedata.runtime !== 0) && <p>Продолжительность: <b>{moviedata.runtime} мин.</b></p>}
                            {(moviedata.budget !== 0) && <p>Бюджет: <b>{this.fine_budget(moviedata.budget)} $</b></p>}
                            {(moviedata.tagline !== '') && <p>Ключевая фраза: <b>{moviedata.tagline}</b></p>}

                            <ActorsList casts={moviedata.credits.cast} />
                            <KeywordsList keywords={moviedata.keywords.keywords} />

                        </div>
                        <div className="col s12 m3">
                            <SimilarsList similars={moviedata.similar.results.slice(0, 5)} />
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    {/* <a href="#!" className="modal-close waves-effect waves-green btn-flat">Хорошо</a> */}
                </div>
            </div>
        );
    }

}

export default MovieDetail