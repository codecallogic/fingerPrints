import React, { Component } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import Navbar from '../../components/Navbar/Navbar'

class SignUpPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             message: ''
        }
    }

    updateMessage = (msg) => {
        this.setState({message: msg})
    }
    
    render (){
        return (
        <div>
            <Navbar />
            <SignUpForm 
                {...this.props}
                updateMessage={this.updateMessage}
            />
        </div>
        )
    }
}

export default SignUpPage