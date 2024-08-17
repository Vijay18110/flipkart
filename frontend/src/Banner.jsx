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
        <div id="demo" class="carousel slide" data-bs-ride="carousel">

            {/* <!-- Indicators/dots --> */}
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="4"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="5"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="6"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>

            {/* <!-- The slideshow/carousel --> */}
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src={img1} alt="Los Angeles" class="d-block w-100" />
                </div>
                <div class="carousel-item">
                    <img src={img3} alt="Chicago" class="d-block w-100" />
                </div>
                <div class="carousel-item">
                    <img src={img2} alt="New York" class="d-block w-100" />
                </div> <div class="carousel-item">
                    <img src={img4} alt="New York" class="d-block w-100" />
                </div> <div class="carousel-item">
                    <img src={img5} alt="New York" class="d-block w-100" />
                </div> <div class="carousel-item">
                    <img src={img6} alt="New York" class="d-block w-100" />
                </div> <div class="carousel-item">
                    <img src={img7} alt="New York" class="d-block w-100" />
                </div>
            </div>

            {/* <!-- Left and right controls/icons --> */}
            <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>

    )
}

export default Banner