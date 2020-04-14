import React, { Component } from 'react';
import userService from '../../utils/userService'
import './SignUpForm.css'

class SignUpForm extends Component{
    state = {
        name        : '',
        email       : '',
        password    : '',
        passConfirm : ''
    }

    handleChange = (e) => {
        this.props.updateMessage('')
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await userService.signup(this.state)
            this.props.handleSignupOrLogin()
            this.props.history.push('/')
        } catch(err) {
            this.props.updateMessage(err.message)
        }
    }
    
    render () {
        return (
        <div className="container">

            <div className="text-center p-5 mt-5" id="panel">
                <h1 className="display-4 mt-3 mb-3">Sign Up</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="group">
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Name</label>
                    </div>
                    <div className="group">
                        <input type="email" value={this.state.email} onChange={this.handleChange} name="email" required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Email</label>
                    </div>

                    <div className="group">
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Password</label>
                    </div>                   

                    <div className="group">
                        <input type="password" value={this.state.passConfirm} onChange={this.handleChange} name="passConfirm" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Confirm Password</label>
                    </div>

                    <div className="group">
                        <center> <button type="submit" className="btn btn-outline-light">Create Account<span className="glyphicon glyphicon-send"></span></button></center>
                    </div>
                
                </form>
                

            </div>
        </div>
        )
    }
}

export default SignUpForm