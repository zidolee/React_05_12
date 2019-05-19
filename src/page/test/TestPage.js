import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import MovieItem from '../../component/movie/MovieItem'

class Testpage extends Component {
    render() {
        return <Grid>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem imageUrl = {"https://file.mk.co.kr/meet/neds/2019/04/image_readtop_2019_256311_15560825753723317.jpg"}
                            name ="어벤져스"
                            openedAt = "2019.05.20"
                            description="타노스의 최후"
                            licke={10}              
                />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem imageUrl = {"https://file.mk.co.kr/meet/neds/2019/04/image_readtop_2019_256311_15560825753723317.jpg"}
                            name ="어벤져스"
                            openedAt = "2019.05.20"
                            description="타노스의 최후"
                            licke={10}              
                />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem imageUrl = {"http://www.televi.net/korea/movie/poster/big/forg/matrix.jpg"}
                            name ="어벤져스"
                            openedAt = "2019.05.20"
                            description="타노스의 최후"
                            licke={10}              
                />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem imageUrl = {"http://www.televi.net/korea/movie/poster/big/forg/matrix.jpg"}
                            name ="어벤져스"
                            openedAt = "2019.05.20"
                            description="타노스의 최후"
                            licke={10}              
                />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem imageUrl = {"http://www.televi.net/korea/movie/poster/big/forg/matrix.jpg"}
                            name ="어벤져스"
                            openedAt = "2019.05.20"
                            description="타노스의 최후"
                            licke={10}              
                />
            </Grid.Column>
        </Grid>
    }
}

export default Testpage