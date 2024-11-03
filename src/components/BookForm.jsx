import { useState } from "react";
import axios from "axios";

const BookForm = ({ setBooks }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    review: "",
  });
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]); // Guardar el archivo de imagen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("review", formData.review);
    if (coverImage) {
      data.append("coverImage", coverImage); // Adjunta la imagen
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/books",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBooks((prevBooks) => [...prevBooks, response.data]);
      setFormData({
        title: "",
        author: "",
        description: "",
        review: "",
      });
      setCoverImage(null);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="coverImage"
        accept="image/*"
        onChange={handleImageChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <textarea
        name="review"
        placeholder="Review"
        value={formData.review}
        onChange={handleChange}
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
