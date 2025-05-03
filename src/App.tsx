import { motion } from "framer-motion";
import { Heading } from "./components/common/Heading";
import Sidebar from "./components/layout/Sidebar";
import "./App.css";

function App() {
  return (
    <>
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mt-10"
      >
        <Heading>Task Manager App</Heading>
      </motion.div>
    </>
  );
}

export default App;
