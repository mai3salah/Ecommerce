import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from "react-slick";
export default function SliderHome() {

  function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let {data} = useQuery("categoriesImagesSlider", getCategories)
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    speed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className=" my-5 slider-box container text-main fw-bold mx-auto">
      <div className='text-center'>
        <Slider {...settings}>
          {data?.data?.data.map((data)=><div key={data._id}>
          <img src={data.image} alt={data.image} className='w-100 slider-Height'/>
          <span>{data.name}</span>
          </div>)}
        </Slider>
      </div>
      </div>
    </>
  )
}
