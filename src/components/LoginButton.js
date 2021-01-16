import React, { Component } from 'react'
import * as Utils from '../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            req_token: Utils.getFromStorage("req_token"),
            session_id: Utils.getFromStorage("session_id"),
            buttonTitle: null,
            username: null
        };

        this.state.buttonTitle = (this.state.req_token !== null) ? 'Подтвердить' : 'Войти'
        console.log(this.state)
        this.onLogin = this.onLogin.bind(this)
    }

    componentDidMount() {
        const { session_id } = this.state

        if (session_id !== null) {
            const requestAccount = Utils.getAccount(session_id)
            requestAccount.then(result => {

                this.setState(() => {
                    return {
                        ...this.state,
                        username: result.username,
                    }
                })
            })
        }
    }

    onLogin() {
        const { req_token, session_id } = this.state
        console.log('onLogin req_token', req_token)

        if (session_id !== null) {
            const requestAccount = Utils.getAccount(session_id)
            requestAccount.then(result => {

                this.setState(() => {
                    return {
                        ...this.state,
                        username: result.username,
                    }
                })
            })
        }
        else if (req_token === null) {
            const requestToken = Utils.createRequestToken()
            requestToken.then(result => {
                Utils.setToStorage('expires_at', result.expires_at)
                Utils.setToStorage('req_token', result.request_token)
                this.setState(() => {
                    return {
                        req_token: result.request_token,
                        session_id: null,
                        buttonTitle: 'Подтвердить',
                        username: null
                    }
                });

                window.open("https://www.themoviedb.org/authenticate/" + result.request_token, '_blank');
            })
        }
        else {
            const createSession = Utils.createSession(req_token)
            createSession.then(result => {
                console.log('result', result)
                Utils.deleteFromStorage('expires_at')
                Utils.deleteFromStorage('req_token')
                if (result.success) {
                    Utils.setToStorage('session_id', result.session_id)
                }

                this.setState(() => {
                    return {
                        req_token: null,
                        session_id: result.success ? result.session_id : null,
                        buttonTitle: result.success ? 'Все' : result.status_message,
                        username: null
                    }
                });

            })
        }
    }

    render() {
        const { onLogin } = this
        const { buttonTitle, username } = this.state

        return (

            <div className="card white lighten-5" >
                <div className="card-content">
                    <span className="left-align">

                        {username ?
                            <div>Вы вошли как: <h5>{username}</h5></div>
                            :
                            <button className="btn blue" onClick={() => onLogin()}>
                                {/* <FontAwesomeIcon icon="sign-in-alt" /> */}
                                {this.state.buttonTitle}
                            </button>
                        }
                    </span>
                </div>
            </div>
        );
    }

}

export default LoginButton
