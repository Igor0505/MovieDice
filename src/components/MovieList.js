import React, { Component } from 'react';

import * as Utils from '../utils';

import Movie from "./Movie"

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Загрузка"
        };
    }

    addLoadedData(data, movieCount, id, title) {
        data.push({ movieid: id, block_title: title })

        if (data.length == movieCount) {
            this.setState(() => {
                return {
                    data,
                    loaded: true,
                    placeholder: "Загружено"
                }
            });
        }
    }

    getRandomItem(data, movieCount, block, pagesCount, resultsCount, addition) {
        const randomPage = Math.floor(1 + Math.random() * pagesCount)
        const pageAmount = (randomPage !== pagesCount) ? 20 : resultsCount % 20

        const randomMovieData = Utils.getData(block.url, randomPage, addition)

        randomMovieData.then(result => {
            const randomItem = Math.floor(Math.random() * pageAmount)
            const movieData = result.results[randomItem]

            if (movieData.vote_average && movieData.poster_path !== null) {
                this.addLoadedData(data, movieCount, movieData.id, block.title)
            }
            else {
                this.getRandomItem(data, movieCount, block, pagesCount, resultsCount, addition)
            }

        })

    }

    getTodayItem(data, movieCount, block, pagesCount) {
        let today = Utils.getFromStorage("today");
        let init_page = 1;
        if (today !== undefined) {
            init_page = +today + 1;
        }

        let finded = false
        let pageCounter = 0
        const todayDate = new Date();
        const day = todayDate.getDate();
        const month = todayDate.getMonth();

        for (let i = init_page; i <= pagesCount && !finded && pageCounter < pagesCount; i++) {
            if (i === pagesCount) i = 1;
            pageCounter = pageCounter + 1
            // console.log('pageCounter', pagesCount, pageCounter, init_page, i)

            const pageData = Utils.getData("movie/top_rated", i);
            pageData.then(result => {
                const results = result.results

                for (let j = 0; j < results.length && !finded; j++) {
                    var d = new Date(results[j].release_date);
                    if (d.getDate() === day && d.getMonth() === month) {
                        finded = true
                        Utils.setToStorage("today", i);
                        const movieData = results[j];
                        this.addLoadedData(data, movieCount, movieData.id, block.title)
                    }
                }

            })

        }
    }

    componentDidMount() {
        let movieUrls = []
        Utils.movieUrls.map(movieUrl => {
            const visible = (Utils.getFromStorage(movieUrl.name) === 'true') ? true : false
            if (visible) {
                movieUrls.push(movieUrl)
            }
        })

        if (movieUrls.length === 0) { // Хотябы один пункт должен быть выбран
            const firstUrl = Utils.movieUrls[0]
            Utils.setToStorage(firstUrl.name, 'true')
            movieUrls.push(firstUrl)
        }

        const movieCount = movieUrls.length
        let data = this.state.data

        movieUrls.map((block, id) => {

            let addition = ''
            if (block.title === "Выбранный жанр") {
                const genre_id = Utils.getFromStorage("genre_id");
                if (genre_id !== null) {
                    addition = "vote_average.gte=7&with_genres=" + genre_id;
                }
            }
            else if (block.title === "Выбранный актер") {
                const actor_id = Utils.getFromStorage("actor_id");
                if (actor_id != null) {
                    addition = "vote_average.gte=7&with_cast=" + actor_id;
                }
            }

            const movieData = Utils.getData(block.url, 1, addition)
            movieData.then(result => {
                const pagesCount = result.total_pages > 1000 ? 1000 : result.total_pages

                if (block.title === "Релиз сегодня") {
                    // Релиз сегодня
                    this.getTodayItem(data, movieCount, block, pagesCount)
                }
                else {
                    const resultsCount = result.total_results
                    this.getRandomItem(data, movieCount, block, pagesCount, resultsCount, addition)
                }

            })
        })
    }

    render() {
        const { loaded } = this.state

        if (!loaded) {
            return (
                <div className="row">
                    <div className="col s12">
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
            )
        }

        return (
            <div>
                <div className="row" >
                    {this.state.data.map((moviedata, id) =>
                        <div key={id} className="col s12 m3">
                            <Movie moviedata={moviedata} id={id} />
                        </div>
                    )}
                </div>
            </div>

        );
    }

}


export default MovieList