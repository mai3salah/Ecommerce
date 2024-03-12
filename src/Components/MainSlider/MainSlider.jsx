import React from 'react'
import Slider from "react-slick";
import img1 from "../images/banner20.jpg"
import img2 from "../images/IMG-20220913-WA0039-1024x465.jpg"
import img3 from "../images/pexels-pixabay-356056.jpg"
import img4 from "../images/pexels-pixabay-51383.jpg"
export default function MainSlider() {
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    arrows:false
  };
  return (
    <>
    <div className="row overflow-hidden w-100 mx-auto mt-5">
      <div className="col-8 p-0">
      <Slider {...settings}>
    <div>
        <img src={img1} alt={img1}className='w-100 img-h' />
      </div>
      <div>
      <img src={img2} alt={img2} className='w-100 img-h'/>
      </div>
    </Slider>
      </div>
      <div className="col-4 p-0">
      <img src={img3} alt={img3} className='w-100 h-150' />
      <img src={img4} alt={img4} className='w-100 h-150' />
      </div>
    </div>
    </>
  )
}
