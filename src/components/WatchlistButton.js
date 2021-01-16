import React, { Component } from 'react'
import M from 'materialize-css'
import * as Utils from '../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class WatchlistButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchlist: props.moviedata.watchlist
        };

        this.onAddToList = this.onAddToList.bind(this)
    }

    onAddToList(is_add) {
        const session_id = Utils.getFromStorage("session_id")

        if (session_id !== null) {
            const { id } = this.props.moviedata

            const request = Utils.addToFavoriteOrWatchlist(session_id, 'watchlist', id, is_add)
            request.then(result => {
                // console.log(result)

                if (result.success) {
                    this.setState(() => {
                        return {
                            watchlist: is_add,
                        }
                    })

                    let message = is_add ? "Успешно добавлен в список для просмотра!" : "Успешно удален из списка для просмотра!"
                    M.toast({ html: message, classes: 'rounded green' })
                }
                else {
                    M.toast({ html: "Ошибка!", classes: 'rounded red' })
                }
            })
        }

    }

    render() {
        const { onAddToList } = this
        const { watchlist } = this.state
        const session_id = Utils.getFromStorage("session_id")

        return (
            <div style={{ marginBottom: "5px" }}>
                {(session_id !== null) &&
                    <div>
                        <button className={"btn " + (watchlist ? "red" : "green")} onClick={() => onAddToList(!watchlist)} style={{ fontSize: "0.7rem" }}>
                            <FontAwesomeIcon icon={watchlist ? "minus-circle" : "plus-circle"} />&nbsp;
                            Отслеживание
                        </button>
                    </div>
                }
            </div>
        );
    }

}

export default WatchlistButton
