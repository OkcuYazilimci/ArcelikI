import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10'>
      <h1 className='head_text text-left'>
        <span className='purple_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-center max-w-md'>
        {type} and share amazing AI Art with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        // onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Prompt for your AI Art
          </span>

          <textarea
            // value={post.prompt}
            // onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Your AI Art{" "}
            <span className='font-normal'>
              (#Astronout, #Realistic, #NFT, etc.)
            </span>
          </span>
          <input
            value=""
            // onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-red-400 text-sm hover:text-red-800'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-black'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;