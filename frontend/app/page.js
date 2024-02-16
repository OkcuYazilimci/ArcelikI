import LandingPageCarousel from './components/Carousel';
import Feed from './components/Feed'
import { TypewriterEffectSmoothDemo } from './components/HeroPage';

export default function Home() {
  
  return (
      <>
        <div className='flex flex-col flex-center'>
          {/* <TypingComponent />
          <LandingPageCarousel /> */}
          <TypewriterEffectSmoothDemo />
        </div>
        {/* <Testcomp /> */}
        <Feed />
      </>
  );
}
