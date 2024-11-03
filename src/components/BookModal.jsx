import PropTypes from "prop-types";

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <img
          src={
            book.coverImage
              ? `http://localhost:3000/${book.coverImage}`
              : "default-cover.jpg"
          }
          alt={`${book.title} cover`}
          className="modal-cover-image"
        />
        <h2>{book.title}</h2>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Status:</strong> {book.status}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
        <p>
          <strong>Review:</strong> {book.review}
        </p>
        {book.images && book.images.length > 0 && (
          <div className="modal-images">
            <h4>Associated Images</h4>
            <div className="images-container">
              {book.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Book associated ${index + 1}`}
                  className="associated-image"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Definir PropTypes para el componente BookModal
BookModal.propTypes = {
  book: PropTypes.shape({
    coverImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string,
    review: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookModal;
