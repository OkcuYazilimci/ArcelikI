const Search = ({ blogs }) => {
  return (
    <>
      <h1>Results for your search:</h1>
      {blogs.map((blogItem, index) => (
        <Postcard
          key={index}
          blog={blogItem}
        />
      ))}
    </>
  )
}

export default Search