import LandingPageCarousel from './components/Carousel';
import Feed from './components/Feed'
import TypingComponent from './components/HeadText';

export default function Home() {
  
  return (
      <>
        <div className='flex flex-row flex-center'>
          <TypingComponent />
          <LandingPageCarousel />
        </div>
        {/* <Testcomp /> */}
        <Feed />
      </>
  );
}
