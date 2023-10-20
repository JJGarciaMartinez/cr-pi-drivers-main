import React, { useState } from "react";
import Card from "./card.jsx";
import { useSelector } from "react-redux";
import {
  CaretLeft,
  CaretRight,
  CaretDoubleLeft,
  CaretDoubleRight,
} from "@phosphor-icons/react";
import "./cardsStyles.css";

export default function Cards() {
  const drivers = useSelector((state) => state.drivers);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  // Obtener los índices de inicio y fin para la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = drivers.slice(indexOfFirstCard, indexOfLastCard);

  // Cambiar de página
  const nextPage = () => {
    if (currentPage < Math.ceil(drivers.length / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Desplazar al inicio de la página
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Desplazar al inicio de la página
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo(0, 0); // Desplazar al inicio de la página
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(drivers.length / cardsPerPage));
    window.scrollTo(0, 0); // Desplazar al inicio de la página
  };

  return (
    <div className="cards-container">
      {currentCards.map((driver, index) => (
        <Card
          key={index}
          id={driver.id}
          image={driver.image}
          name={driver.name}
          lastname={driver.lastname}
          teams={driver.teams}
          birthdate={driver.birthdate}
          description={driver.description}
          code={driver.code}
        />
      ))}

      {/* Lógica de paginación */}
      <div className="pagination">
        {/* Botones de paginación */}
        {currentPage > 1 && (
          <>
            <button onClick={goToFirstPage} disabled={currentPage === 1}>
              <CaretDoubleLeft size={15} weight="bold" />
            </button>
            <button onClick={prevPage} disabled={currentPage === 1}>
              <CaretLeft size={15} weight="bold" />
            </button>
          </>
        )}

        <span>
          {currentPage} / {Math.ceil(drivers.length / cardsPerPage)}
        </span>

        {currentPage < Math.ceil(drivers.length / cardsPerPage) && (
          <>
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(drivers.length / cardsPerPage)
              }
            >
              <CaretRight size={15} weight="bold" />
            </button>
            <button
              onClick={goToLastPage}
              disabled={
                currentPage === Math.ceil(drivers.length / cardsPerPage)
              }
            >
              <CaretDoubleRight size={15} weight="bold" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
