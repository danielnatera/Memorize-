import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("App", () => {
  test("renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText(/MEMORIZE!/i)).toBeInTheDocument();
  });
});
