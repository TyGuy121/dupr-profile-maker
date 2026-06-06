import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import DuprProfile from "@/components/DuprProfile";
import EditableField from "@/components/EditableField";
import PhotoUploader from "@/components/PhotoUploader";
import ProgressRing from "@/components/ProgressRing";

afterEach(() => {
  cleanup();
});

describe("DuprProfile editing flow", () => {
  it("reveals the name input only after edit mode is enabled and the value is activated", async () => {
    const user = userEvent.setup();
    render(<DuprProfile />);

    expect(screen.queryByDisplayValue("Ty Root")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /edit profile/i }));
    await user.click(screen.getByText("Ty Root"));

    expect(screen.getByDisplayValue("Ty Root")).toBeInTheDocument();
  });
});

describe("editing primitives", () => {
  it("adds an accessible label, stable minimum width, and keyboard activation for editable numeric fields", async () => {
    const user = userEvent.setup();
    render(
      <EditableField
        value="90"
        onChange={vi.fn()}
        isEditing
        ariaLabel="Doubles reliability"
        minWidthCh={4}
        alignClassName="text-center"
      />
    );

    await user.tab();

    const trigger = screen.getByText("90");
    expect(trigger).toHaveFocus();

    await user.keyboard("{Enter}");

    const input = screen.getByLabelText("Doubles reliability");
    expect(input).toHaveStyle({ minWidth: "4ch", width: "4ch" });
    expect(input).toHaveClass("text-center");
  });

  it("only shows the clickable photo edit overlay while edit mode is enabled", () => {
    const { container, rerender } = render(
      <PhotoUploader
        photo="https://example.com/profile.png"
        isEditing={false}
        onChange={vi.fn()}
        className="h-16 w-16"
      />
    );

    expect(container.firstElementChild).toHaveClass("h-16", "w-16");
    expect(
      screen.queryByRole("button", { name: /change profile photo/i })
    ).not.toBeInTheDocument();

    rerender(
      <PhotoUploader
        photo="https://example.com/profile.png"
        isEditing
        onChange={vi.fn()}
        className="h-16 w-16"
      />
    );

    expect(
      screen.getByRole("button", { name: /change profile photo/i })
    ).toBeInTheDocument();
  });

  it("renders optional overlay content inside the progress ring", () => {
    const { container } = render(
      <ProgressRing value={90} size={96} color="#ffffff" bgColor="#123456">
        <span>90</span>
      </ProgressRing>
    );

    expect(screen.getByText("90")).toBeInTheDocument();

    const circles = container.querySelectorAll("circle");
    expect(circles[0]).toHaveAttribute("stroke", "#123456");
    expect(circles[1]).toHaveAttribute("stroke", "#ffffff");
  });
});
