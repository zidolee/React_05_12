import React,{Component} from 'react';
import {Card, Icon} from 'semantic-ui-react'
class MovieItem extends Component {
    // MovieItem에 pros를 전달 하지 않을때 들어가는 것
    static defaultProps = {
        imageUrl : '',
        name : '',
        openedAt : '',
        description : '',
        likeCnt : '',
    }
    render() {
        const {
            imageUrl,
            name,
            openedAt,
            description,
            likeCnt,
        } = this.props;
        // 'url(' + imageUrl+')'
        // `url(${imageUrl})
        return (
            <div>
                <Card fluid>
                    <div style={{
                        height:300, 
                        backgroundImage:`url(${imageUrl})`,
                        backgroundPositionL:'center',
                        backgroundSize:'cover',
                        backgroundRepeat:'no-repeat'
                     }}/>
                    {/* <Image style={{height:250, overflow:"hidden"}} src={imageUrl} wrapped ui={false} /> */}
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{openedAt}</span>
                        </Card.Meta>
                        <Card.Description>
                            {description}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <a>
                            <Icon name='like' />
                            {likeCnt}
                        </a>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default MovieItem