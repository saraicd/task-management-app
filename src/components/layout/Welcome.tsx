import { motion } from "framer-motion";
import { Heading } from "../common/Heading";

export default function Welcome() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Heading>Welcome to Task Manager</Heading>
      </motion.div>
    </div>
  );
}
