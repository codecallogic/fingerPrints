import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Instruments from '../../components/Instruments/Instruments'

const InstrumentsPage = (props) => {
    return (
        <div>
        <Navbar 
            user={props.user} 
            handleLogout={props.handleLogout}
        />
        <Instruments 
            user={props.user} 
            handleLogout={props.handleLogout}
        />
        </div>
    )
}

export default InstrumentsPage