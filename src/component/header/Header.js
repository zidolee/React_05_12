import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import {logout} from '../../store/logoutReducer'
import { connect } from 'react-redux';

class Header extends Component {

    onLogout = () => {
        this.props.logout();
    }
    render() {
        const {user} = this.props;

        if(user) {
            return (
                <Menu>
                <Menu.Item header>
                    게시판
                </Menu.Item>
                <Menu.Item>
                    <Link to="/">홈</Link>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button onClick={this.onLogout}>로그아웃</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            )

        } else {
            return (
                <Menu>
                <Menu.Item header>
                    게시판
                </Menu.Item>
                <Menu.Item>
                    <Link to="/">홈</Link>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Link to="/login">로그인</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/signup">
                            회원가입
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
                )
        }
       
    }
}

const maptStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps =  (dispatch) => {
    return {
        logout : () => dispatch(logout())
    }
}
export default connect(maptStateToProps, mapDispatchToProps)(Header);