import { IoClose, IoArrowForward, IoArrowBack } from "react-icons/io5";

import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { allFilms } from "../../queries/All";
import { useState, useContext } from "react";
import Modal from "react-modal";
import { SearchContext } from "../../components/Search/SearchContext";

Modal.setAppElement("#root");



const Films = () => {
  const baseUrl = "https://swapi-graphql.netlify.app/.netlify/functions/index";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentFilm, setCurrentFilm] = useState(null);
  const { searchTerm } = useContext(SearchContext);
  const [currentFilmIndex, setCurrentFilmIndex] = useState(null);

  const openModal = (index) => {
    setCurrentFilmIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goToNextFilm = () => {
    setCurrentFilmIndex(
      (prevIndex) => (prevIndex + 1) % allfilms.allFilms.films.length
    );
  };

  const goToPreviousFilm = () => {
    setCurrentFilmIndex(
      (prevIndex) =>
        (prevIndex - 1 + allfilms.allFilms.films.length) %
        allfilms.allFilms.films.length
    );
  };

  const {
    data: allfilms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allFilms"],
    queryFn: async () => request(baseUrl, allFilms),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredFilms = allfilms.allFilms.films.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 my-4 mx-4">
        {filteredFilms.map((film, index) => (
          <div
            key={film.id}
            className="w-[300px] border-2 border-gray-500 hover:bg-[#e7e7e7] m-auto p-4 rounded-xl"
          >
            <h2 className="text-xl font-bold">{film.title}</h2>
            <button
              className="float-right text-lg font-bold flex items-center"
              onClick={() => openModal(index)}
            >
              More info <IoArrowForward />
            </button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Film Details"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
        className="relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[500px] w-[400px] bg-white rounded-xl p-4"
      >
        {currentFilmIndex !== null && (
          <>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-3xl"
            >
              <IoClose />
            </button>
            <button
              onClick={goToPreviousFilm}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl"
            >
              <IoArrowBack />
            </button>
            <button
              onClick={goToNextFilm}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl"
            >
              <IoArrowForward />
            </button>
            <div className="flex flex-col justify-center h-full max-w-[300px] m-auto">
              <h2 className="font-bold text-2xl absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                {allfilms.allFilms.films[currentFilmIndex].title}
              </h2>
              <p>
                <span className="font-bold">Director:</span>{" "}
                {allfilms.allFilms.films[currentFilmIndex].director}
              </p>
              <p>
                <span className="font-bold">Producers:</span>{" "}
                {allfilms.allFilms.films[currentFilmIndex].producers.join(", ")}
              </p>
              <p>
                <span className="font-bold">Release Date:</span>{" "}
                {allfilms.allFilms.films[currentFilmIndex].releaseDate}
              </p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Films;
