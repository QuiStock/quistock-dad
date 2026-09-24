import { renderWithTheme } from "@/utils/__tests__/helpers";
import { screen } from "@testing-library/react";
import { TextInputComponent } from ".";

describe("<TextInputComponent />", () => {
  it("should be rendered", () => {
    renderWithTheme(<TextInputComponent label="Teste" />);

    expect(screen.getAllByText("Teste")[0]).toBeInTheDocument();
  });
});
