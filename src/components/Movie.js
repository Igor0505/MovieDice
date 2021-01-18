import React, { Component } from 'react';

import * as Utils from '../utils';
import MovieDetail from './MovieDetail';
import MovieRate from './MovieRate'
import MovieImage from './MovieImage'
import MovieBlockTitle from './MovieBlockTitle'

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviedata: null,
            loaded: false,
            placeholder: "Загрузка"
        };
    }

    loadFavoriteWatchlist(id) {
        const session_id = Utils.getFromStorage("session_id")
        if (session_id !== null) {
            const data = Utils.getData("movie/" + id + "/account_states", 1, "&session_id=" + session_id);
            data.then(result => {
                let state = this.state
                state.moviedata.favorite = result.favorite
                state.moviedata.watchlist = result.watchlist
                // console.log('favorite', result.favorite, 'watchlist', result.watchlist)
                this.setState(() => {
                    return state
                })
            })
        }
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
                        block_title: this.props.moviedata.block_title,
                        favorite: null,
                        watchlist: null
                    }

                    return {
                        moviedata,
                        loaded: true,
                        placeholder: "Загружено"
                    }
                });

                this.loadFavoriteWatchlist(result.id)

            })
        }
    }


    render() {
        const { moviedata } = this.state
        const { id } = this.props
        console.log("moviedata", moviedata, id)

        if (this.state.loaded && moviedata) {
            const vote_average = moviedata.vote_average === null ? 0 : +moviedata.vote_average
            let vote_average_color = 'rgb(39 221 39 / 74%)' // "green"
            if (vote_average < 5.0) vote_average_color = 'rgb(234 7 7 / 67%)' // "red"
            else if (vote_average < 7.0) vote_average_color = 'rgb(242 223 6 / 64%)' // "yellow"

            return (
                <div >
                    <div className="movieimage" data-title={moviedata.title}>
                        <MovieBlockTitle block_title={moviedata.block_title} />
                        <MovieRate moviedata={moviedata} vote_average_color={vote_average_color} />
                        <MovieImage moviedata={moviedata} id={id} />
                    </div>
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