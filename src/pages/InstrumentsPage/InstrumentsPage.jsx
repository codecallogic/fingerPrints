import React from 'react';
import { Redirect } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import Instruments from '../../components/Instruments/Instruments'

const InstrumentsPage = (props) => {
    return (
        <div>
        <Navbar 
            user={props.user} 
            handleLogout={props.handleLogout}
        />
        {props.user ? 
        <Instruments 
            user={props.user} 
            handleLogout={props.handleLogout}
        />
        :
        <Redirect to='/login' />
        }
        </div>
    )
}

export default InstrumentsPage