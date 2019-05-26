import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Grid, Form, Message, Header, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {addMovieValidationFailed, addMovie, initAddMovieState} from '../../store/addMovieReducer'
import MovieForm from './MovieForm'
class AddMovie extends Component {
   
    componentDidMount() {
        this.props.initAddMovieState();
    }
    onAddMovie = () => {                                        //MovieForm
        const {name, director, openedAt, description, image} = this.refs.form.getValue();
        if(!name) {
            this.props.addMovieValidationFailed(new Error('영화 제목을 입력하세요.'))
            return;
        }
        if(!director) {
            this.props.addMovieValidationFailed(new Error('영화 감독을 입력하세요.'))
            return;
        }
        if(!openedAt) {
            this.props.addMovieValidationFailed(new Error('영화 개봉일을 입력하세요.'))
            return;
        }
        if(!description) {
            this.props.addMovieValidationFailed(new Error('영화 설명 입력하세요.'))
            return; 
        }
        const file = image ? image.file : null;
        this.props.addMovie(name, director, openedAt, description, file);
    }

    render() {
        const { error, isLoading, isSuccess } =this.props
        if(isSuccess) {
            return(
                <Grid>
                   <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Header>영화 등록 완료</Header>
                            <Link to="/">영화 목록으로</Link>
                        </Grid.Column>
                   </Grid.Row>
                </Grid>
            )
        }
        return (
            <div>
                <MovieForm ref="form"/>
                <Grid>
                   <Grid.Row centered>
                       <Grid.Column mobile={16} tablet={8} computer={8}>
                            {   
                                error ? <Message content={error.message} /> : null
                            }
                       </Grid.Column>
                   </Grid.Row>
                   <Grid.Row centered>
                       <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Form.Button loading={isLoading} fluid onClick={this.onAddMovie}>영화 등록</Form.Button>
                       </Grid.Column>
                   </Grid.Row>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        error : state.addMovie.error,
        isLoading : state.addMovie.isLoading,
        isSuccess : state.addMovie.isSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMovie : (name, director, openedAt, description, file) => dispatch(addMovie(name, director, openedAt, description, file)),
        addMovieValidationFailed: (error) => dispatch(addMovieValidationFailed(error)),
        initAddMovieState: () => dispatch(initAddMovieState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddMovie)