import React,{Component} from 'react';
import {Card, Icon, Button} from 'semantic-ui-react'
class MyMovieItem extends Component {
    // MovieItem에 pros를 전달 하지 않을때 들어가는 것
    static defaultProps = {
        id : null,
        onDelete : null,
        onUpdate : null,
        imageUrl : '',
        name : '',
        openedAt : '',
        description : '',
        likeCnt : '',
    }

    onDelete = () => {
        if(this.props.onDelete && this.props.id){
            this.props.onDelete(this.props.id);
        }
    }

    onUpdate = () => {
        if(this.props.onUpdate && this.props.id){
            this.props.onUpdate(this.props.id);
        }
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
                        height:400, 
                        backgroundImage:`url(${imageUrl})`,
                        backgroundPositionL:'center',
                        backgroundSize:'cover ',
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
                        <Button onClick={this.onUpdate}>수정하기</Button>
                        <Button onClick={this.onDelete}>삭제하기</Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default MyMovieItem