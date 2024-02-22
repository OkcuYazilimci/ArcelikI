const BackgroundSVG = () => (
  <img
    src="https://www.acmhacettepe.com/static/media/HeroBackground.e1c8f0b91a6e83b6ab5f99cf8569d63a.svg"
    alt="Background SVG" 
    className="absolute w-3/4 h-3/4 opacity-8"
  />
);

const LandingPage = () => {

  return (
    <div className='flex flex-center flex-col mt-64 mb-48'>
    <h1 className='xl:text-9xl lg:text-6xl md:text-4xl sm:text-6xl font-bold text-white'>WELCOME TO</h1>
    <h1 className='xl:text-9xl lg:text-6xl md:text-4xl sm:text-6xl font-bold text-white'>ARCH</h1>
    <BackgroundSVG />
    </div>
  )
}

export default LandingPage