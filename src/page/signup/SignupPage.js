import React, { Component } from 'react'
import SignupForm from '../../component/signup/SignupForm'

import { Grid } from 'semantic-ui-react'

class SignupPage extends Component {


    render() {
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column mobile={15} tablet={8} computer={6}>
                        <SignupForm />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default SignupPage