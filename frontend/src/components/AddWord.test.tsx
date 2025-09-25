import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, vi, describe, it, expect } from 'vitest';
import AddWord from './AddWord';
import toast from 'react-hot-toast';
import { useAuthContext } from '../hooks/useAuthContext';

// Mock modules
vi.mock('react-hot-toast');
vi.mock('../hooks/useAuthContext');
vi.mock('lucide-react', () => ({
    Plus: () => <svg data-testid="plus-icon" />,
}));

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('AddWord', () => {
    const mockToken = 'mock-token-123';
    const mockAuthContext = { state: { token: mockToken } };

    beforeEach(() => {
        // Ensure the hook returns our mock token for each test
        vi.mocked(useAuthContext).mockReturnValue({...mockAuthContext,dispatch: vi.fn()});
        mockFetch.mockReset(); // clear previous fetch calls/implementations
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the component with all elements', () => {

        render(<AddWord />);
        expect(screen.getByText(/create new word/i)).toBeInTheDocument();
        expect(screen.getByText(/word:/i)).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText(/enter word.../i)[0]).toBeInTheDocument();
        expect(screen.getByText(/definition:/i)).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText(/enter definition of the word/i)[0]).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: /add/i })[0]).toBeInTheDocument();
    });

    it('updates word and definition state on input change', () => {
        render(<AddWord />);

        const wordInput = screen.getAllByPlaceholderText(/enter word.../i)[0] as HTMLInputElement;
        const definitionTextarea = screen.getAllByPlaceholderText(/enter definition of the word/i)[0] as HTMLTextAreaElement;

        fireEvent.change(wordInput, { target: { value: 'Test' } });
        expect(wordInput.value).toBe('Test');

        fireEvent.change(definitionTextarea, { target: { value: 'procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use' } });
        expect(definitionTextarea.value).toBe('procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use');
    });

    it('calls handleAddWordFunction when "Add" button is clicked', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        render(<AddWord />);

        fireEvent.change(screen.getAllByPlaceholderText(/enter word.../i)[0], { target: { value: 'Test' } });
        fireEvent.change(screen.getAllByPlaceholderText(/enter definition of the word/i)[0], { target: { value: 'procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use' } });

        fireEvent.click(screen.getAllByRole('button', { name: /add/i })[0]);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/word/add'),
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${mockToken}`,
                    },
                    body: JSON.stringify({ name: 'Test', definition: 'procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use' }),
                })
            );
        });
    });

    it('shows success toast on successful API call', async () => {
        mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

        render(<AddWord />);
        fireEvent.change(screen.getAllByPlaceholderText(/enter word.../i)[0], { target: { value: 'Test' } });
        fireEvent.change(screen.getAllByPlaceholderText(/enter definition of the word/i)[0], { target: { value: 'procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use' } });

        fireEvent.click(screen.getAllByRole('button', { name: /add/i })[0]);

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith('Word Successfully Added');
        });
    });

    it('shows error toast on failed API call', async () => {
        mockFetch.mockResolvedValueOnce({ ok: false, json: () => Promise.resolve({}) });

        render(<AddWord />);
        fireEvent.change(screen.getAllByPlaceholderText(/enter word.../i)[0], { target: { value: 'Test' } });
        fireEvent.change(screen.getAllByPlaceholderText(/enter definition of the word/i)[0], { target: { value: 'procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use' } });

        fireEvent.click(screen.getAllByRole('button', { name: /add/i })[0]);

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith('Word was not added successfully');
        });
    });
});
