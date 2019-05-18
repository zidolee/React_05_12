import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import {signup, signupValidationFailed} from '../../store/signupReducer'

class SignupForm extends Component {
    state = {
        email: '',
        password: '',
        password2: '',
        terms: false,
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onCheckboxHandleChange = (e) => {
        this.setState({
            terms: !this.state.terms
        })
    }

    onSignup = (e) => {
        /**
         * 이메일 입력했는지?
         * 비밀번호 입력했는지?
         * 비밀번호가 비밀번호 확인이랑 같은지?
         * 서비스 이용약관은 눌렀는지?
         */
        const {
            email,
            password,
            password2,
            terms
        } = this.state;

        if (!email) {
            // this.setState({
            //     message: '이메일을 입력하세요'
            // })
            this.props.signupValidationFailed(new Error("이메일을 입력허세요"))
            return;
        }

        if (!password) {
            this.props.signupValidationFailed(new Error("비밀번호를 입력허세요"))
            return;
        }

        if (password !== password2) {
            this.props.signupValidationFailed(new Error("비밀번호가 일치하지 않습니다"))
            return;
        }

        if (!terms) {
            this.props.signupValidationFailed(new Error("서비스 이용약관에 동의하세요"))
            return;
        }

        //서버로 회원가입 해야지!!
        this.props.signup(email, password);
    }

    render() {
        
        const { email, password, password2, terms } = this.state;
        const { isLoading, error} = this.props;
        return (
            <Form>
                <Form.Field>
                    <label>이메일</label>
                    <input name="email" placeholder='이메일' value={email} onChange={this.onHandleChange} />
                </Form.Field>
                <Form.Field>
                    <label>비밀번호</label>
                    <input name="password" type="password" placeholder='비밀번호' value={password} onChange={this.onHandleChange} />
                </Form.Field>
                <Form.Field>
                    <label>비밀번호 확인</label>
                    <input name="password2" type="password" placeholder='비밀번호 확인' value={password2} onChange={this.onHandleChange} />
                </Form.Field>
                <Form.Field>
                    <Checkbox name="terms" label='서비스 이용약관' checked={terms} onChange={this.onCheckboxHandleChange} />
                </Form.Field>
                <Button type='submit' loading={isLoading} onClick={this.onSignup}>회원가입</Button>

                {
                    error ? <Message content={error.message} /> : null
                }

            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading : state.signup.isLoading,
        error: state.signup.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (email, password) => dispatch(signup(email, password)),
        signupValidationFailed : (error) => dispatch(signupValidationFailed(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);