import React from "react"; // Importa React para el componente funcional
import BookCard from "./BookCard"; // Importa el componente BookCard para representar cada libro individualmente
import PropTypes from "prop-types"; // Importa PropTypes para validar las propiedades del componente
import "../styles/App.css"; // Importa el archivo de estilos CSS para aplicar al componente

// Componente funcional BookCarousel que muestra una lista de libros en un carrusel
const BookCarousel = ({ books, setBooks }) => (
  <div className="carousel">
    {" "}
    {/* Contenedor principal del carrusel */}
    {books.map(
      (
        book // Itera sobre la lista de libros proporcionada
      ) => (
        <BookCard key={book._id} book={book} setBooks={setBooks} /> // Renderiza un BookCard para cada libro
      )
    )}
  </div>
);

// Definición de PropTypes para validar las propiedades del componente BookCarousel
BookCarousel.propTypes = {
  books: PropTypes.arrayOf(
    // Define books como un array de objetos
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Cada libro debe tener un _id de tipo string
      coverImage: PropTypes.string, // coverImage es opcional y de tipo string
      title: PropTypes.string.isRequired, // title es obligatorio y de tipo string
      author: PropTypes.string.isRequired, // author es obligatorio y de tipo string
      status: PropTypes.string.isRequired, // status es obligatorio y de tipo string
    })
  ).isRequired,
  setBooks: PropTypes.func.isRequired, // Define setBooks como una función obligatoria
};

export default BookCarousel; // Exporta el componente BookCarousel como el predeterminado
