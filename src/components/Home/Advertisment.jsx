import React from 'react'

const Advertisment = () => {
  return (
    <div className="flex bg-black justify-center items-center w-full">
      <div className='my-4 md:my-12 lg:my-16'>
      <img 
        src="/ad/ad.png"
        alt="Advertisement"
        className="w-[1200px] h-[300px] object-contain"
      />
      </div>
    </div>
  )
}

export default Advertisment
