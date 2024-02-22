import React from 'react'

const Loading = () => {
  return (
    <div>
                <section className='w-full max-w-full flex items-center justify-center flex-col mt-10 animate-pulse'>
                    <div className='rounded-md h-16 w-1/4 bg-gray-200'></div>
                    <div className='h-8 w-2/6 rounded-md bg-gray-200 mt-5'></div>
                    <div className='h-80 w-2/6 rounded-md bg-gray-200 mt-10 mb-10 '>
                        <div className='h-6 w-2/12 rounded-md bg-gray-400 mt-5 ml-5'>
                        </div>
                        <div className='h-10 w-11/12 ml-5 rounded-md bg-gray-400 mt-5'>
                        </div>
                        <div className='h-6 w-2/12 rounded-md bg-gray-400 mt-8 ml-5'>
                        </div>
                        <div className='h-10 w-11/12 ml-5 rounded-md bg-gray-400 mt-5'>
                        </div>
                        <div className="flex flex-row flex-end mr-10">
                            <div className='h-8 w-2/12 rounded-full bg-gray-400 mt-8 ml-5 mr-4'>
                            </div>
                            <div className='h-8 w-2/12 rounded-full bg-gray-400 mt-8'>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
  )
}

export default Loading