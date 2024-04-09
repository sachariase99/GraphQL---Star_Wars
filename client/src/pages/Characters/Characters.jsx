import { IoClose, IoArrowForward, IoArrowBack } from "react-icons/io5";

import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { allPeople } from "../../queries/All";
import { useState, useContext } from "react";
import Modal from "react-modal";
import { SearchContext } from "../../components/Search/SearchContext";

Modal.setAppElement("#root");

const SEARCH_FILMS = gql`
  query SearchFilms($term: String!) {
    allFilms(filter: { title_contains: $term }) {
      films {
        id
        title
        // other fields...
      }
    }
  }
`;

const Characters = () => {
  const baseUrl = "https://swapi-graphql.netlify.app/.netlify/functions/index";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPeople, setCurrentPeople] = useState(null);
  const { searchTerm } = useContext(SearchContext);
  const [currentPeopleIndex, setCurrentPeopleIndex] = useState(null);

  const openModal = (index) => {
    setCurrentPeopleIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goToNextPeople = () => {
    setCurrentPeopleIndex(
      (prevIndex) => (prevIndex + 1) % allpeople.allPeople.people.length
    );
  };

  const goToPreviousPeople = () => {
    setCurrentPeopleIndex(
      (prevIndex) =>
        (prevIndex - 1 + allpeople.allPeople.people.length) %
        allpeople.allPeople.people.length
    );
  };

  const {
    data: allpeople,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allPeople"],
    queryFn: async () => request(baseUrl, allPeople),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredPeople = allpeople.allPeople.people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 my-4 mx-4">
        {filteredPeople.map((person, index) => (
          <div
            key={person.id}
            className="w-[300px] border-2 border-gray-500 hover:bg-[#e7e7e7] m-auto p-4 rounded-xl"
          >
            <h2 className="text-xl font-bold">{person.name}</h2>
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
        contentLabel="People Details"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
        className="relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[500px] w-[400px] bg-white rounded-xl p-4"
      >
        {currentPeopleIndex !== null && (
          <>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-3xl"
            >
              <IoClose />
            </button>
            <button
              onClick={goToPreviousPeople}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl"
            >
              <IoArrowBack />
            </button>
            <button
              onClick={goToNextPeople}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl"
            >
              <IoArrowForward />
            </button>
            <div className="flex flex-col justify-center h-full max-w-[300px] m-auto capitalize">
              <h2 className="font-bold text-2xl absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                {allpeople.allPeople.people[currentPeopleIndex].name}
              </h2>
              <p>
              <span className="font-bold">Gender:</span> {allpeople.allPeople.people[currentPeopleIndex].gender}
              </p>
              <p>
              <span className="font-bold">Height:</span> {allpeople.allPeople.people[currentPeopleIndex].height} cm
              </p>
              <p>
              <span className="font-bold">Skin Color:</span> {allpeople.allPeople.people[currentPeopleIndex].skinColor}
              </p>
              <p>
              <span className="font-bold">Hair Color:</span> {allpeople.allPeople.people[currentPeopleIndex].hairColor}
              </p>
              <p>
              <span className="font-bold">Eye Color:</span> {allpeople.allPeople.people[currentPeopleIndex].eyeColor}
              </p>
              <p>
              <span className="font-bold">Movies:</span> {allpeople.allPeople.people[currentPeopleIndex].filmConnection.films.map(film => film.title).join(", ")}
              </p>
              <p>
              <span className="font-bold">Home World:</span> {allpeople.allPeople.people[currentPeopleIndex].homeworld.name}
              </p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Characters;
