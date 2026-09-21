import { renderWithTheme } from "@/utils/__tests__/helpers";
import { screen } from "@testing-library/react";
import { describe, expect, it, } from "vitest";
import { NotificationSnackbar } from ".";

describe("<ToastNotification />", () => {
  it("Should be render", () => {
    renderWithTheme(
      <NotificationSnackbar message="mensagem de sucesso!" type="success" />,
    );

    expect(screen.getAllByText("mensagem de sucesso!")[0]);
  });
});
