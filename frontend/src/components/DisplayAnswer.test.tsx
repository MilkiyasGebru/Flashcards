import { render, screen, fireEvent, waitFor, cleanup} from "@testing-library/react";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import DisplayAnswer from "./DisplayAnswer";
import { useAuthContext } from "../hooks/useAuthContext";

// Mock useAuthContext
vi.mock("../hooks/useAuthContext");

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("DisplayAnswer", () => {

    const mockToken = "mock-token-123";
    const mockWord = {
        id: "Test",
        name: "Test",
        definition: "procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use",
        bin: 0,
        wrong_guesses: 0,
        next_review_time: "",
        remaining_time: "2h"
    };
    const mockAuthContext = { state: { token: mockToken } };

    let setRefreshTrigger: ReturnType<typeof vi.fn>;
    let handleFlip: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.mocked(useAuthContext).mockReturnValue({...mockAuthContext, dispatch: vi.fn()});

        mockFetch.mockReset();
        setRefreshTrigger = vi.fn();
        handleFlip = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    it("renders the definition correctly", () => {
        render(
            <DisplayAnswer
                word={mockWord}
                setRefreshTrigger={setRefreshTrigger}
                handleFlip={handleFlip}
            />
        );

        expect(screen.getByText(/definition:/i)).toBeInTheDocument();
        expect(screen.getByText(mockWord.definition)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument();
    });

    it("handles clicking Yes and sends review_status true", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'Success' }),
        } as Response);

        render(
            <DisplayAnswer
                word={mockWord}
                setRefreshTrigger={setRefreshTrigger}
                handleFlip={handleFlip}
            />
        );

        const yesButton = screen.getByRole("button", { name: /yes/i }) as HTMLButtonElement;
        fireEvent.click(yesButton);


        await waitFor(() => {
            // All assertions for async side effects should be here
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/api/word/review/${mockWord.id}`),
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${mockToken}`,
                    },
                    body: JSON.stringify({ review_status: true }),
                })
            );
            expect(setRefreshTrigger).toHaveBeenCalledTimes(1);
            expect(handleFlip).toHaveBeenCalledTimes(1);
        });
    });




    it("handles clicking No and sends review_status false", async () => {
        mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

        render(
            <DisplayAnswer
                word={mockWord}
                setRefreshTrigger={setRefreshTrigger}
                handleFlip={handleFlip}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /no/i }));

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/api/word/review/${mockWord.id}`),
                expect.objectContaining({
                    body: JSON.stringify({ review_status: false }),
                })
            );
            expect(setRefreshTrigger).toHaveBeenCalledTimes(1);
            expect(handleFlip).toHaveBeenCalledTimes(1);
        });
    });

    //  Check it

    it("still increments refresh and flips card when API fails", async () => {
        mockFetch.mockResolvedValueOnce({ ok: false, json: () => Promise.resolve({}) });

        render(
            <DisplayAnswer
                word={mockWord}
                setRefreshTrigger={setRefreshTrigger}
                handleFlip={handleFlip}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /yes/i }));

        await waitFor(() => {
            expect(setRefreshTrigger).toHaveBeenCalled();
            expect(handleFlip).toHaveBeenCalled();
        });
    });
});
