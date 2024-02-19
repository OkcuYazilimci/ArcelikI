'use client';

import { useRouter } from 'next/router';

const SearchPage = () => {
  const router = useRouter();
  const searchTerm = router.query.searchTerm;

  // Your code to fetch and display search results based on searchTerm

  return (
    <div>
      <h1>Search Results for {searchTerm}</h1>
      {/* Render your search results here */}
    </div>
  );
};

export default SearchPage;
