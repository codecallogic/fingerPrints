import React, { Component } from 'react';
import "./carousel.css"

class Carousel extends Component {
    render () {
        return (
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                </ol>
                
                <div className="carousel-inner" role="listbox">
                <div className="carousel-item active one" >
                    <div className="carousel-caption d-none d-md-block">
                    <h2 className="display-4">Music In Real Time</h2>
                    <p className="lead">Make Music In Rooms</p>
                    </div>
                </div>

                <div className="carousel-item two" >
                    <div className="carousel-caption d-none d-md-block">
                    <h2 className="display-4">Join The Party</h2>
                    <p className="lead">Make Music The World Instantly</p>
                    </div>
                </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                    </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}
export default Carousel