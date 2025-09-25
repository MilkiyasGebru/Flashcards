import express from "express";
import {
    add_word,
    delete_word, edit_word,
    fetch_word_to_review,
    get_all_words,
    review_word
} from "../controllers/WordController.js";
import {requireAuth} from "../middleware/RequireAuth.js";

const word_router  = express.Router();

word_router.post("/add", requireAuth, add_word);
word_router.get("/fetch", requireAuth, get_all_words)
word_router.post("/review/:word_id", requireAuth, review_word);
word_router.get("/play", requireAuth, fetch_word_to_review);
word_router.delete("/delete/:word_id", requireAuth, delete_word);
word_router.patch("/edit", requireAuth, edit_word);
export default word_router;