import { Navbar, Footer } from "./components";
import { Characters, Films, Home } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { SearchContext } from "./components/Search/SearchContext";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <Router>
        <div className="mb-[100px]">
          <Navbar />
        </div>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/characters" element={<Characters />} />
        </Routes>
        <div className="mt-[90px]">
          <Footer />
        </div>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;