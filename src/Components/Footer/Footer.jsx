import React from 'react'
import AmazonPayLogo from "../images/Amazon-Pay-logo.svg"
import PayPalLogo from "../images/PayPal-Logo.png"
import mastercard_logo from "../images/mastercard_logo.svg__3.png"
import appStore from "../images/app store.png"
import googlePlay from "../images/google play.png"
export default function Footer() {
  return (
   <>
   <div className='py-5 bg-main-light mt-4'>
   <div className="container">
    <h2>Get the freshCart app</h2>
    <p className=' text-muted'>We will send you a link, open it on your phone to download the app</p>
    <div className='row'>
  <div className="col-md-9">
  <div className="mb-3">
    <input type="email" className="form-control" placeholder='Email...' aria-describedby="emailHelp"/>
  </div>
  </div>
  <div className="col-md-3">
  <button type="submit" className="btn bg-main text-light  fw-bolder  w-100">Share App Link</button>
  </div>
</div>
<hr />
      <div className='d-flex justify-content-between align-items-center flex-wrap'>
        <ul className=' list-unstyled d-flex'>
          <li>Payment Partners</li>
          <li><img src={AmazonPayLogo} alt={AmazonPayLogo} className='master' /></li>
          <li><img src={mastercard_logo} alt={mastercard_logo} className='master'/></li>
          <li><img src={PayPalLogo} alt={PayPalLogo} className='master'/></li>
         
        </ul>
        <ul className=' list-unstyled d-flex  align-items-center'>
          <li>Get deliveries with FreshCart</li>
          <li><img src={googlePlay} alt={googlePlay} className='store'/></li>
          <li><img src={appStore} alt={appStore} className='store'/></li>
        </ul>
      </div>
      <hr />
   </div>
   </div>
   </>
  )
}
