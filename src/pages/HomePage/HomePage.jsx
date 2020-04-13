import React from 'react';
import Navbar from '../../components/Navbar/Navbar'

const HomePage = (props) => {
    return (
        <Navbar 
            user={props.user} 
            handleLogout={props.handleLogout}
        />
    )
}

export default HomePage