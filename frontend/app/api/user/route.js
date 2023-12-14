export const GET = async () => {
  try {
    const response = await fetch('http://localhost:3000/api-blog/getAll');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data from API:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, error };
  }
};