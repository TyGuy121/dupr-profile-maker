import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import DuprProfile from "@/components/DuprProfile";
import EditableField from "@/components/EditableField";
import PhotoUploader from "@/components/PhotoUploader";
import ProgressRing from "@/components/ProgressRing";
import { resizeImage } from "@/lib/resizeImage";

vi.mock("@/lib/resizeImage", () => ({
  resizeImage: vi.fn(),
}));

const resizeImageMock = vi.mocked(resizeImage);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
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

  it("switches between doubles and singles values without changing Clubs", async () => {
    const user = userEvent.setup();
    render(<DuprProfile />);
    const doublesButton = screen.getByRole("button", { name: /doubles/i });
    const singlesButton = screen.getByRole("button", { name: /singles/i });
    const segmentedControl = doublesButton.parentElement;

    expect(screen.getByText("3.032")).toBeInTheDocument();
    expect(screen.queryByRole("tablist", { name: /profile sections/i })).not.toBeInTheDocument();
    expect(segmentedControl).not.toBeNull();
    expect(within(segmentedControl as HTMLElement).getByText("Clubs")).toBeInTheDocument();
    expect(within(segmentedControl as HTMLElement).queryByRole("button", { name: /clubs/i })).not.toBeInTheDocument();

    await user.click(singlesButton);
    expect(screen.getByText("2.684")).toBeInTheDocument();
    expect(within(segmentedControl as HTMLElement).getByText("Clubs")).toBeInTheDocument();
    expect(screen.getByText("2.684")).toBeInTheDocument();
  });

  it("renders Clubs as inert text inside the visible tab strip and shows a follower pill", () => {
    render(<DuprProfile />);

    expect(
      screen.queryByRole("button", { name: /share profile/i })
    ).not.toBeInTheDocument();

    const doubles = screen.getByRole("button", { name: /doubles/i });
    const singles = screen.getByRole("button", { name: /singles/i });
    const segmentedControl = doubles.parentElement as HTMLElement;
    const clubs = within(segmentedControl).getByText("Clubs");

    expect(doubles.parentElement).toBe(singles.parentElement);
    expect(clubs.parentElement).toBe(doubles.parentElement);
    expect(screen.queryByRole("tablist", { name: /profile sections/i })).not.toBeInTheDocument();
    expect(doubles).not.toHaveAttribute("role", "tab");
    expect(singles).not.toHaveAttribute("role", "tab");
    expect(within(segmentedControl).queryByRole("button", { name: /clubs/i })).not.toBeInTheDocument();
    const followerPill = screen.getByText("Followers").parentElement;
    expect(followerPill).not.toBeNull();
    expect(followerPill).toHaveTextContent(/^7/);
  });

  it("activates reliability editing from the rating hero overlay", async () => {
    const user = userEvent.setup();
    render(<DuprProfile />);

    await user.click(screen.getByRole("button", { name: /edit profile/i }));
    const reliabilityTrigger = screen.getByText("90");

    expect(reliabilityTrigger.closest(".pointer-events-none")).toBeNull();

    await user.click(reliabilityTrigger);

    expect(screen.getByLabelText("Rating reliability")).toBeInTheDocument();
  });
});

describe("editing primitives", () => {
  it("adds an accessible label, stable minimum width, and keyboard activation for editable numeric fields", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <EditableField
        value="90"
        onChange={onChange}
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

    let input = screen.getByLabelText("Doubles reliability");
    expect(input).toHaveStyle({ minWidth: "4ch", width: "4ch" });
    expect(input).toHaveClass("text-center");

    await user.clear(input);
    await user.type(input, "91");
    await user.tab();

    expect(onChange).toHaveBeenCalledWith("91");

    rerender(
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
    expect(screen.getByText("90")).toHaveFocus();

    await user.keyboard(" ");

    input = screen.getByLabelText("Doubles reliability");
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

  it("swallows resize failures and clears the file input so the same file can be retried", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    resizeImageMock.mockRejectedValue(new Error("resize failed"));

    render(<PhotoUploader photo="" isEditing onChange={onChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["avatar"], "avatar.png", { type: "image/png" });

    await user.upload(input, file);

    expect(onChange).not.toHaveBeenCalled();
    expect(input.value).toBe("");

    await user.upload(input, file);

    expect(resizeImageMock).toHaveBeenCalledTimes(2);
    expect(input.value).toBe("");

    consoleError.mockRestore();
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
