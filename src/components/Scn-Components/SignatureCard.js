import React from 'react'

const SignatureCard = ({image}) => {
  return (
    <>
        <img className="img-fluid avatar cover-image rounded" crossOrigin="anonymous" src={image} alt=" signature" style={{height:`100px`, width:`200px`, }}/>
    </>
  )
}

export default SignatureCard;