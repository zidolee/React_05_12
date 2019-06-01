import React, {Component} from 'react';
import UpdateMovie from '../../component/movie/UpdateMovie'
import { Grid } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'

class UpdateMoviePage extends Component {
    componentDidMount() {
        console.log(this.props.match.params.movieId);
    }
    render() {
        const movieId = this.props.match.params.movieId;
        return (
            <Grid centered>
                    <Grid.Column mobile={15} tablet={12} computer={10}>
                        <UpdateMovie movieId = {movieId}/>
                    </Grid.Column>
             </Grid>
        )
    }
}

export default  withRouter(UpdateMoviePage);