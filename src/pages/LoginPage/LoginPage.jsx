import React, { Component } from 'react';
import userService from '../../utils/userService'
import Navbar from '../../components/Navbar/Navbar'
import './LoginPage.css'

class LoginForm extends Component{
    state = {
        email       : '',
        password    : ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await userService.login(this.state)
            this.props.handleSignupOrLogin()
            this.props.history.push('/')
        } catch(err) {
            alert(err)
        }
    }
    
    render () {
        return (
        <div>
        <Navbar />
        <div className="container">

            <div className="text-center p-5 mt-5" id="panel">
                <h1 className="display-4 mt-3 mb-3">Login</h1>
                <form onSubmit={this.handleSubmit}>

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
                        <center> <button type="submit" className="btn btn-outline-light">Log In<span className="glyphicon glyphicon-send"></span></button></center>
                    </div>
                
                </form>
                

            </div>
        </div>
        </div>
        )
    }
}

export default LoginForm