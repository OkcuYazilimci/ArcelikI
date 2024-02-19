import Feed from './components/Feed'
import { TypewriterEffectSmoothDemo } from './components/HeroPage';
import { WavyBackgroundDemo } from './components/WavyBackground';

export default function Home() {
  
  return (
      <>
        <div className='flex flex-col flex-center'>
          <TypewriterEffectSmoothDemo />
          {/* <WavyBackgroundDemo /> */}
        </div>
        <Feed />
      </>
  );
}
