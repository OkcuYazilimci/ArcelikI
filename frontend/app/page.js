import LandingPageCarousel from './components/Carousel';
import Feed from './components/Feed'

export default function Home() {
  
  return (
      <>
        <section className='main_text w-full flex-center flex-row mt-10'>
          <h1 className='head_text text-left'>
            Welcome to Arch!
            <br className='max-md:hidden' />
            <span className='purple_gradient text-center'>Create and Share</span>
            <br className='max-md:hidden' />
            <span className='purple_gradient text-center'>AI Arts!</span>
          </h1>
          {/* <LandingPageCarousel /> */}
        </section> 

        {/* <Testcomp /> */}
        <Feed />
      </>
  );
}
