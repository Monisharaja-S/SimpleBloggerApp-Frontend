import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Story from "./Story";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Loading from "./Loading";  // Import the Loading component

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;

  useEffect(() => {
    // Fetch blog posts from your backend API
    axios
      .get("https://capstone-backend-8lpx.onrender.com/api/story/getAllStories")
      .then((response) => {
        console.log("Data", response.data.data);
        setPosts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred while fetching blog posts:", error);
        setLoading(false);
      });
  }, []);

  // Filter stories based on the search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredPosts.length / storiesPerPage);

  // Get the stories for the current page
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredPosts.slice(indexOfFirstStory, indexOfLastStory);

  return (
    <Container>
      <h1>All Stories</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <Loading />  // Use the Loading component here
      ) : (
        <div>
          {Array.isArray(currentStories) && currentStories.length > 0 ? (
            currentStories.map((post) => <Story key={post._id} {...post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default BlogHome;
