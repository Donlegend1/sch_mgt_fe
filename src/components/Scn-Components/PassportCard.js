import React from 'react'

const PassportCard = ({image}) => {
  return (
    <>
        <img className="img-fluid avatar cover-image" crossOrigin="anonymous" src={image} alt=" " style={{height:`200px`, width:`200px`}}/>
    </>
  )
}

export default PassportCard