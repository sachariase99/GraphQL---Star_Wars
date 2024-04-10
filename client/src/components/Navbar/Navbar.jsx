import { NavLink, useLocation } from "react-router-dom";
import { SearchContext } from "../Search/SearchContext";
import { useContext } from "react";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  &:hover {
    color: black;
  }
`;

const NavBar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const location = useLocation();

  return (
    <div className="bg-[#333] py-4 fixed top-0 left-0 right-0">
      <ul className="flex gap-4 uppercase font-bold text-2xl justify-center items-center bg-white w-[500px] h-[50px] m-auto rounded-full text-[#666]">
        <li>
          <StyledNavLink to="/">Home</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/films">Movies</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/characters">Characters</StyledNavLink>
        </li>
      </ul>
      {location.pathname !== "/" && (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="bg-[#c3c3c3] text-[#666666d2] placeholder-[#6666669d] p-4 text-2xl rounded-full w-[200px] h-[30px] absolute top-1/2 -translate-y-1/2 right-4 outline-none"
        />
      )}
    </div>
  );
};

export default NavBar;
