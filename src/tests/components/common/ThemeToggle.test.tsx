import { render, screen, fireEvent } from "@testing-library/react";
import { DarkModeToggle } from "../../../components/common/ThemeToggle";
import { ThemeProvider } from "../../../context/ThemeContext";
import { describe, it, expect } from "vitest";

describe("DarkModeToggle", () => {
  const renderWithThemeProvider = () =>
    render(
      <ThemeProvider>
        <DarkModeToggle />
      </ThemeProvider>
    );

  it("renders the toggle component", () => {
    renderWithThemeProvider();
    const toggle = screen.getByLabelText("Toggle dark mode");
    expect(toggle).toBeInTheDocument();
  });

  it("toggle is initially unchecked when theme is light", () => {
    renderWithThemeProvider();
    const toggle = screen.getByLabelText(
      "Toggle dark mode"
    ) as HTMLInputElement;
    expect(toggle.checked).toBe(false);
  });

  it("toggle switches to checked when clicked", () => {
    renderWithThemeProvider();
    const toggle = screen.getByLabelText(
      "Toggle dark mode"
    ) as HTMLInputElement;
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);
  });

  it("renders Sun and Moon icons", () => {
    renderWithThemeProvider();
    const sunIcon = screen.getByTestId("sun");
    const moonIcon = screen.getByTestId("moon");
    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
  });
});
