import React, { Component } from 'react';
import M from 'materialize-css'

class MovieImage extends Component {
    constructor(props) {
        super(props);
        // this.imageRef = React.createRef();
    }

    // componentDidMount() {
    // const options = {}
    // const image = this.imageRef.current;
    // M.Tooltip.init(image, options);
    // }

    render() {
        const { moviedata, id } = this.props
        const poster_path = moviedata.poster_path === null ? "/img/default.jpg" : "http://image.tmdb.org/t/p/w342/" + moviedata.poster_path

        return (
            <img
                data-position="bottom"
                // data-tooltip={moviedata.block_title + ':<br/>"' + moviedata.title + '"'}
                // ref={this.imageRef}
                src={poster_path}
                data-target={"modal" + id}
                className="modal-trigger movieimage"
            />
        );
    }

}

export default MovieImage