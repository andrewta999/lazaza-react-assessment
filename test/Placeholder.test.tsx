import { screen, render } from "@testing-library/react";
import Placeholder from "../src/components/Placeholder";

const setup = () => {
  return render(<Placeholder questions={[]} onStartGame={() => {}} />);
};

describe("Placeholder", () => {
  it("Renders Three Cards", () => {
    setup();
    const placeholders = screen.getAllByText(/Placeholder/);

    expect(placeholders.length).toEqual(3);
  });
});
