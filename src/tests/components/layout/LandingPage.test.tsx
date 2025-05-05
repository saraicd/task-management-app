import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { AnimatePresence } from "framer-motion";
import LandingPage from "../../../components/layout/LandingPage";
import { LinkItem } from "../../../data/Navigation";
import { Home } from "lucide-react";

vi.mock("framer-motion", () => ({
  ...vi.importActual("framer-motion"),
  AnimatePresence: vi.fn(({ children }) => <div>{children}</div>),
  motion: {
    div: vi.fn(({ children }) => <div>{children}</div>),
  },
}));

describe("LandingPage Component", () => {
  const mockCurrentPage: LinkItem = {
    label: "Home",
    component: <div>Home Component</div>,
    icon: Home,
    disabeld: false,
  };

  it("renders the current page component", () => {
    render(<LandingPage currentPage={mockCurrentPage} />);
    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });

  it("passes the correct key to motion.div", () => {
    render(<LandingPage currentPage={mockCurrentPage} />);
    expect(AnimatePresence).toHaveBeenCalled();
    expect(mockCurrentPage.label).toBe("Home");
  });
});
