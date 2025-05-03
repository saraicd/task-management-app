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
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <Sidebar onSelect={setSelectedLabel} />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LandingPage currentPage={currentLink} />
      </div>
    </div>
  );
}

export default App;
