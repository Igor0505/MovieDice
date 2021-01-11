import React, { Component } from 'react';

import * as Utils from '../utils';

class SelectGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: Utils.getFromStorage("genre_id"),
            genre: []
        };

        this.selectRef = React.createRef();

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let data = Utils.getData("genre/movie/list")
        data.then(result => {
            // console.log(result.genres)

            this.setState({
                value: this.state.value,
                genre: result.genres
            });

            let options = {}
            const selectActor = this.selectRef.current;
            M.FormSelect.init(selectActor, options);
        })

    }

    handleChange(event) {
        const { value } = event.target
        Utils.setToStorage("genre_id", value)

        this.setState({
            value,
            genre: this.state.genre
        })
    }

    render() {
        const { genre, value } = this.state
        const sel_genre = Utils.getFromStorage("sel_genre") === "true" ? true : false

        if (sel_genre)
            return (
                <div className="card white lighten-5" >
                    <div className="card-content">
                        <span className="card-title">Выбранный жанр</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <select value={(value === null) ? '' : value} onChange={this.handleChange} ref={this.selectRef}>
                                    {genre.map((actor, id) =>
                                        <option value={actor.id} key={id}>{actor.name}</option>
                                    )}
                                </select>
                                <label></label>
                            </div>
                        </div>
                    </div>
                </div>

            );

        return (<div></div>)
    }

}

export default SelectGenre