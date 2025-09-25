import { render, screen, fireEvent, cleanup} from "@testing-library/react";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import DisplayQuestion from "./DisplayQuestion.tsx";

describe("DisplayDefinition", () => {

    const mockWord = {
        id: "Test",
        name: "Test",
        definition: "procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use",
        bin: 0,
        wrong_guesses: 0,
        next_review_time: "",
        remaining_time: "2h"
    };

    let handleFlip: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        handleFlip = vi.fn();

    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    it("renders the component correctly", () => {
        render(
            <DisplayQuestion
                word={mockWord}
                handleFlip={handleFlip}
            />
        );

        expect(screen.getByText(mockWord.name)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Reveal Answer/i })).toBeInTheDocument();
    });

    it("handles clicking Reveal Answer and flips the card", async () => {

        render(
            <DisplayQuestion
                word={mockWord}
                handleFlip={handleFlip}
            />
        );

        const yesButton = screen.getByRole("button", { name: /Reveal Answer/i }) as HTMLButtonElement;
        fireEvent.click(yesButton);

        expect(handleFlip).toHaveBeenCalledTimes(1);
    });

});
