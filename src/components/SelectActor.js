import React, { Component } from 'react';

import * as Utils from '../utils';

class SelectActor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: Utils.getFromStorage("actor_id"),
            actors: []
        };

        this.selectRef = React.createRef();

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let data = Utils.getData("person/popular")
        data.then(result => {
            // console.log(result)

            let actors = []
            result.results.map(({ id, name, profile_path }) => {
                actors.push({ id, name, profile_path })
            })
            // console.log(actors)

            this.setState({
                value: this.state.value,
                actors
            });

            let options = {}
            const selectActor = this.selectRef.current;
            M.FormSelect.init(selectActor, options);
        })

    }

    handleChange(event) {
        const { value } = event.target
        Utils.setToStorage("actor_id", value)

        this.setState({
            value,
            actors: this.state.actors
        })
    }

    render() {
        const { actors, value } = this.state
        const sel_actor = Utils.getFromStorage("sel_actor") === "true" ? true : false

        if (sel_actor)
            return (
                <div className="card white lighten-5" >
                    <div className="card-content">
                        <span className="card-title">Выбранный актер</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <select className="icons" value={(value === null) ? '' : value} onChange={this.handleChange} ref={this.selectRef}>
                                    {actors.map((actor, id) =>
                                        <option
                                            value={actor.id}
                                            key={id}
                                            data-icon={
                                                (actor.profile_path === null) ? "/img/default.jpg" : "http://image.tmdb.org/t/p/w342/" + actor.profile_path
                                            }
                                            className="left">{actor.name}</option>
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

export default SelectActor