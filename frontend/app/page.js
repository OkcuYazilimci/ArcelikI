import Feed from './components/Feed'
import Testcomp from './components/Testcomp'

export default function Home() {


  return (
      <>
        <section className='main_text w-full flex-center flex-col mt-10'>
          <h1 className='head_text text-center'>
            Welcome to Arch!
            <br className='max-md:hidden' />
            <span className='purple_gradient text-center'>Create and Share</span>
            <br className='max-md:hidden' />
            <span className='purple_gradient text-center'>AI Arts!</span>
          </h1>
        </section>

        {/* <Testcomp /> */}
        <Feed />
      </>
  );
}
