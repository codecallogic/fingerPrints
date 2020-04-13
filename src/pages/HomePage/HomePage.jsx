import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HomePage extends Component {
    render (){
        return (
        <Link to="/signup">Sign Up</Link>
        )
    }
}

export default HomePage