import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Carousel from '../../components/Carousel/carousel'

const HomePage = (props) => {
    return (
        <div>
        <Navbar 
            user={props.user} 
            handleLogout={props.handleLogout}
        />
        <Carousel />
        </div>
    )
}

export default HomePage