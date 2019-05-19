import React, {Component} from 'react';
import MovieForm from '../../component/movie/MovieForm'
import { Grid } from 'semantic-ui-react';
class AddMoviePage extends Component {
    render() {
        return (
            <Grid centered>
                <Grid.Column mobile={15} tablet={12} computer={10}>
                    <MovieForm/>
                </Grid.Column>
            </Grid>
        )
    }
}
export default AddMoviePage