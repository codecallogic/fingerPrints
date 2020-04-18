import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PianoKeyboard from '../../components/TuneRoom/TuneRoom'

const HomePage = (props) => {
    console.log(props.socket)
    return (
        <div>
        <Navbar 
            user={props.user} 
            handleLogout={props.handleLogout}
        />
        <PianoKeyboard
            user={props.user}
            history={props.history}
        />
        </div>
    )
}

export default HomePage