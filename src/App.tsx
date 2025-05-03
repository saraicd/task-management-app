import Sidebar from "./components/layout/Sidebar";
import "./App.css";
import { useState } from "react";
import LandingPage from "./components/layout/LandingPage";
import { linkList } from "./data/Navigation";

function App() {
  const [selectedLabel, setSelectedLabel] = useState("Home");

  const currentLink =
    linkList.find((link) => link.label === selectedLabel) || linkList[0];

  return (
    <div className="flex w-full h-screen">
      <Sidebar onSelect={setSelectedLabel} />
      <div className="flex-grow flex items-center justify-center">
        <LandingPage currentPage={currentLink} />
      </div>
    </div>
  );
}

export default App;
