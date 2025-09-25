export default interface WordDTO {
    remaining_time: string | null;
    name: string;
    id: string;
    definition: string;
    bin: number;
    wrong_guesses: number;
    next_review_time: string;
}