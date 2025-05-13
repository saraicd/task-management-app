import Sidebar from "./components/layout/Sidebar";
import "./App.css";
import { useState } from "react";
import LandingPage from "./components/layout/LandingPage";
import { linkList } from "./data/Navigation";
import { Toaster } from "sonner";

function App() {
  const [selectedLabel, setSelectedLabel] = useState("Home");

  const currentLink =
    linkList.find((link) => link.label === selectedLabel) || linkList[0];

  return (
    <main className="flex w-full min-h-screen sm:px-[80px] px-2  overflow-y-auto">
      <Sidebar onSelect={setSelectedLabel} />
      <Toaster />
      <section
        className="flex-grow flex items-center justify-center sm:mt-2 mt-6"
        aria-label="Main Content"
      >
        <LandingPage currentPage={currentLink} />
      </section>
    </main>
  );
}

export default App;
