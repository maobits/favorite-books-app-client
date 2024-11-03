import { useState } from "react"; // Importa useState para manejar el estado local del componente
import PropTypes from "prop-types"; // Importa PropTypes para validar los tipos de propiedades
import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import { FaBookReader, FaArchive, FaClock } from "react-icons/fa"; // Importa iconos de react-icons para mejorar la interfaz visual
import BookModal from "./BookModal"; // Importa el componente BookModal para mostrar detalles del libro en un modal

// Componente principal BookCard que representa una tarjeta de libro con detalles y acciones
const BookCard = ({ book, setBooks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la visibilidad del modal

  // Función para actualizar el estado del libro en el servidor y en la lista de libros
  const updateStatus = async (newStatus) => {
    try {
      // Envia una solicitud PATCH para actualizar el estado del libro en la base de datos
      const response = await axios.patch(
        `http://localhost:3000/api/books/${book._id}/status`, // Endpoint con el ID del libro
        { status: newStatus } // Payload de la solicitud con el nuevo estado
      );
      // Actualiza el estado de la lista de libros en el componente padre
      setBooks(
        (prevBooks) =>
          prevBooks.map((b) => (b._id === book._id ? response.data : b)) // Reemplaza el libro actualizado en la lista
      );
    } catch (error) {
      console.error("Error updating book status:", error); // Muestra un error si la actualización falla
    }
  };

  // Función para definir el color del estado según el valor actual
  const getStatusColor = (status) => {
    switch (status) {
      case "leído":
        return "green"; // Devuelve verde para "leído"
      case "pendiente por leer":
        return "yellow"; // Devuelve amarillo para "pendiente por leer"
      case "archivado":
        return "red"; // Devuelve rojo para "archivado"
      default:
        return "gray"; // Devuelve gris para cualquier otro valor de estado
    }
  };

  return (
    <>
      {/* Contenedor de la tarjeta del libro */}
      <div className="book-card" onClick={() => setIsModalOpen(true)}>
        {" "}
        {/* Abre el modal al hacer clic */}
        <div className="book-image">
          {" "}
          {/* Contenedor de la imagen de portada del libro */}
          <img
            src={
              book.coverImage
                ? `http://localhost:3000/${book.coverImage}` // URL de la imagen de portada si está disponible
                : "default-cover.jpg" // Imagen predeterminada si no hay portada
            }
            alt={`${book.title} cover`} // Texto alternativo para accesibilidad
          />
        </div>
        <div className="book-details">
          {" "}
          {/* Contenedor de los detalles del libro */}
          <h3>{book.title}</h3> {/* Muestra el título del libro */}
          <p>
            {book.author}{" "}
            <span
              className="status-indicator"
              style={{ color: getStatusColor(book.status) }} // Aplica el color correspondiente al estado
            >
              ({book.status}) {/* Muestra el estado del libro */}
            </span>
          </p>
          <div className="actions">
            {" "}
            {/* Contenedor de los botones de acción */}
            {/* Botón para marcar como leído */}
            <button
              className="read-btn"
              onClick={(e) => {
                e.stopPropagation(); // Evita que el evento clic abra el modal
                updateStatus("leído"); // Cambia el estado del libro a "leído"
              }}
            >
              <FaBookReader /> Mark as Read {/* Icono y texto del botón */}
            </button>
            {/* Botón para marcar como pendiente por leer */}
            <button
              className="pending-btn"
              onClick={(e) => {
                e.stopPropagation(); // Evita abrir el modal al hacer clic
                updateStatus("pendiente por leer"); // Cambia el estado a "pendiente por leer"
              }}
            >
              <FaClock /> Mark as Pending {/* Icono y texto del botón */}
            </button>
            {/* Botón para archivar el libro */}
            <button
              className="archive-btn"
              onClick={(e) => {
                e.stopPropagation(); // Evita abrir el modal al hacer clic
                updateStatus("archivado"); // Cambia el estado a "archivado"
              }}
            >
              <FaArchive /> Archive {/* Icono y texto del botón */}
            </button>
          </div>
        </div>
      </div>
      {/* Modal para mostrar detalles del libro si isModalOpen es true */}
      {isModalOpen && (
        <BookModal book={book} onClose={() => setIsModalOpen(false)} /> // Pasa el libro y la función para cerrar el modal
      )}
    </>
  );
};

// Definición de los tipos de propiedades para el componente BookCard usando PropTypes
BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired, // ID del libro, es un string obligatorio
    coverImage: PropTypes.string, // URL de la imagen de portada, opcional
    title: PropTypes.string.isRequired, // Título del libro, es un string obligatorio
    author: PropTypes.string.isRequired, // Autor del libro, es un string obligatorio
    status: PropTypes.string.isRequired, // Estado del libro, es un string obligatorio
  }).isRequired,
  setBooks: PropTypes.func.isRequired, // Función para actualizar la lista de libros, es obligatoria
};

export default BookCard; // Exporta el componente BookCard
