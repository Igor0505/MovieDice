import React, { Component } from 'react'
import M from 'materialize-css'
import * as Utils from '../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FavoriteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: props.moviedata.favorite
        };

        this.onAddToList = this.onAddToList.bind(this)
    }

    onAddToList(is_add) {
        const session_id = Utils.getFromStorage("session_id")

        if (session_id !== null) {
            const { id } = this.props.moviedata

            const request = Utils.addToFavoriteOrWatchlist(session_id, 'favorite', id, is_add)
            request.then(result => {
                // console.log(result)

                if (result.success) {
                    this.setState(() => {
                        return {
                            favorite: is_add,
                        }
                    })

                    let message = is_add ? "Успешно добавлен в избранное!" : "Успешно удален из избранного!"
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
        const { favorite } = this.state
        const session_id = Utils.getFromStorage("session_id")

        return (
            <div style={{ marginBottom: "5px" }}>
                {(session_id !== null) &&
                    <div>
                        <button className={"btn " + (favorite ? "red" : "green")} onClick={() => onAddToList(!favorite)} style={{ fontSize: "0.7rem" }}>
                            <FontAwesomeIcon icon={favorite ? "minus-circle" : "plus-circle"} />&nbsp;
                            Избранное
                        </button>
                    </div>
                }
            </div>
        );
    }

}

export default FavoriteButton
