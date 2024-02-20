'use client';

// frontend/app/search/search.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchPage = () => {
  const router = useRouter();
  const searchTerm = router.query.searchTerm || '';

  const [blogData, setBlogData] = useState([]);

  // Fetch data based on the search term and handle the results
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api-blog/search?search=${searchTerm}`);

      const data =  await response.json();
      setBlogData(data.blogResults)
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [searchTerm]);

  return (
    <div>
      <h1>Search Results for: {searchTerm}</h1>
      {/* Render your search results here */}
    </div>
  );
};

export default SearchPage;
