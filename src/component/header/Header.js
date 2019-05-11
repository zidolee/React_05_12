import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Header extends Component {

    render() {
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

export default Header;