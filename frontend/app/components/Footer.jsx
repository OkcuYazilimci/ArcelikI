import React from 'react'

const Footer = () => {
  return (
    <section>
      <div className='flex items-center justify-center mb-5 mt-10'>
        <hr className='w-3/4'/>
      </div>
      <div className='flex items-center justify-center mb-5 text-gray-400'>
        Powered by <img src='https://www.arcelikglobal.com/Content/images/navbar/logo-en.png' height={50} width={50} className='ml-2'/>
      </div>
    </section>
  )
}

export default Footer