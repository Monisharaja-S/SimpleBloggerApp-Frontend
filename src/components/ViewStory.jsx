import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons
import { toast } from "react-toastify";

export default function ViewStory() {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStory() {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("User is not authenticated");
          // Show a login notification with auto close
          toast.error("Login to view Story", {
            position: "top-right",
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: true,
          });
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `https://capstone-backend-8lpx.onrender.com/api/story/${storyId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setStory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching the story:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
  }, [storyId]);

  const handleDeleteStory = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("User is not authenticated");
        // Show a login notification with auto close
        toast.error("Login to delete Story", {
          position: "top-right",
          autoClose: 3000, // Close after 3 seconds
          hideProgressBar: true,
        });
        return;
      }

      const response = await axios.delete(
        `https://capstone-backend-8lpx.onrender.com/api/story/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Show a success notification with auto close
        toast.success("Story deleted successfully", {
          position: "top-right",
          autoClose: 3000, // Close after 3 seconds
          hideProgressBar: true,
        });

        // Redirect to the home page
        navigate("/home", { state: { message: "Story deleted successfully" } });
      } else if (response.status === 404) {
        console.error("Story not found on the server");
      } else {
        console.error("An unexpected error occurred during deletion");
        // Show an error notification with auto close
        toast.error("Error deleting the story", {
          position: "top-right",
          autoClose: 3000, // Close after 3 seconds
          hideProgressBar: true,
        });
        navigate("/home");
      }
    } catch (error) {
      console.error("Error deleting the story:", error);
      navigate("/home");
    }
  };

  return (
    <Container fluid className="full-screen-container">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : story ? (
        <Card className="view-story-card">
          {story.image && (
            <Card.Img variant="top" src={story.image} alt={story.title} />
          )}
          <Card.Body>
            <div className="d-flex justify-content-end align-items-center mb-3">
              <Link
                to={`/editStory/${storyId}`}
                className="btn btn-primary me-3"
              >
                <FiEdit /> Edit
              </Link>
              <Button
                variant="danger"
                onClick={() => {
                  // Show a confirmation prompt using a custom toast component

                  handleDeleteStory();
                }}
              >
                <FiTrash2 /> Delete
              </Button>
            </div>
            <h3 className="card-title">{story.title}</h3>
            <h6 className="card-subtitle mb-2 text-muted">{story.summary}</h6>
            <div>
              {story.content.split("\n\n").map((paragraph, index) => (
                <p key={index} style={{ textAlign: "justify" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center">Kindly login to view Story</p>
      )}
    </Container>
  );
}