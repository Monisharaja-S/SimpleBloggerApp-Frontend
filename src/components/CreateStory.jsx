import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  async function createNewStory(ev) {
    ev.preventDefault();

    // Get the authentication token from localStorage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // Handle the case where the user is not authenticated
      // You can redirect to the login page or show an error message
      console.error("User is not authenticated");
      return;
    }

    const storyData = {
      title,
      summary,
      content,
      image,
    };

    try {
      const response = await axios.post(
        "https://capstone-backend-8lpx.onrender.com/api/story/addstory",
        storyData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        // Show success toast
        toast.success("Story added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });

        // Redirect to the home page
        navigate("/home");
      }
    } catch (error) {
      console.error("Error creating the story:", error);

      // Show error toast
      toast.error("Error creating the story", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }

  return (
    <Container className="mt-5 create-story-container">
      <h2>Create a New Story</h2>
      <Form onSubmit={createNewStory}>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Summary:</Form.Label>
          <Form.Control
            type="text"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={(ev) => setContent(ev.target.value)}
            required
            style={{ height: "200px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL (Optional):</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(ev) => setImage(ev.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Create Story
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
}