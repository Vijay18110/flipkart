import React from 'react'
import img1 from './assets/img1.webp';
import img2 from './assets/img2.webp';
import img3 from './assets/img3.webp';
import img4 from './assets/img4.webp';
import img5 from './assets/img5.webp';
import img6 from './assets/img6.webp';
import img7 from './assets/img7.webp';
const Banner = () => {
    return (
        // <!-- Carousel -->
        <div id="demo" className="carousel slide" data-bs-ride="carousel">

            {/* <!-- Indicators/dots --> */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="4"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="5"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="6"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>

            {/* <!-- The slideshow/carousel --> */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={img1} alt="Los Angeles" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src={img3} alt="Chicago" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src={img2} alt="New York" className="d-block w-100" />
                </div> <div className="carousel-item">
                    <img src={img4} alt="New York" className="d-block w-100" />
                </div> <div className="carousel-item">
                    <img src={img5} alt="New York" className="d-block w-100" />
                </div> <div className="carousel-item">
                    <img src={img6} alt="New York" className="d-block w-100" />
                </div> <div className="carousel-item">
                    <img src={img7} alt="New York" className="d-block w-100" />
                </div>
            </div>

            {/* <!-- Left and right controls/icons --> */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>

    )
}

export default Banner