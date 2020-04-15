import React, { Component } from 'react';
import HomePage from '../HomePage/HomePage'
import LoginPage from '../LoginPage/LoginPage'
import SignUpPage from '../SignUpPage/SignUpPage'
import PianoCom from '../../components/Piano/Piano'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import userService from '../../utils/userService'

class App extends Component {
  constructor() {
    super()
    this.state = {
       user: userService.getUser()
    }
  }

  handleLogout = () => {
    userService.logout()
    this.setState({user: null})
  }
  
  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()})
  }
  
  render () {
    return (
      <div className="App">
      <Switch>
        <Route exact path={"/"} render={() => 
          <HomePage 
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
         }/>
        <Route exact path={"/login"} render={({history}) => 
          <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }
        />
        <Route exact path={"/piano"} render={({history}) => 
          <PianoCom
            history={history}
          />
        }
        />
        <Route exact path={"/signup"} render={({history}) => 
          <SignUpPage 
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }
        />
      </Switch>
      </div>
    )
  }
}

export default App;
