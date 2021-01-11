import React, { Component } from 'react';
import M from 'materialize-css'

import ActorsList from './ActorsList'
import GenresList from './GenresList'
import KeywordsList from './KeywordsList'
import SimilarsList from './SimilarsList'

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        let options = {}

        const modal = this.modalRef.current;
        // console.log(modal)
        M.Modal.init(modal, options);
    }

    render() {
        const { moviedata, id } = this.props
        const poster_path = moviedata.poster_path === null ? "/img/default.jpg" : "http://image.tmdb.org/t/p/w342/" + moviedata.poster_path
        const releaseDate = new Date(moviedata.release_date)

        return (
            <div id={"modal" + id} className="modal" ref={this.modalRef}>
                <div className="modal-content">
                    <h4>{moviedata.title}</h4>

                    <div className="row">
                        <div className="col s12 m3">
                            <img src={poster_path} style={{ maxWidth: "100%", height: "auto", border: "1px solid #cecece", borderRadius: "5px" }} />
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

                            <ActorsList casts={moviedata.credits.cast} />
                            <KeywordsList keywords={moviedata.keywords.keywords} />

                        </div>
                        <div className="col s12 m3">
                            <SimilarsList similars={moviedata.similar.results.slice(0, 5)} />
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Хорошо</a>
                </div>
            </div>
        );
    }

}

export default MovieDetail