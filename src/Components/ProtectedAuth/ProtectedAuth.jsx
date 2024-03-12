import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedAuth(props) {
  if(localStorage.getItem("token")){
    return <Navigate to={"/"}/>
  }else{
     return props.children
   }
}
