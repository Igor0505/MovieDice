import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./App.css";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCog, faTimes, faSignInAlt, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCog, faTimes, faSignInAlt, faPlusCircle, faMinusCircle)


ReactDOM.render(<App />, document.getElementById("root"));
