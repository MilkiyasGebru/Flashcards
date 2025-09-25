import {WordModel} from "../models/Word.js";
import {UserModel} from "../models/User.js";
import {Op} from "sequelize";
import logger from "../utils/Logger.js";

const times = [5, 25, 2*60, 10*60, 60*60, 5*60*60, 24*3600, 5*24*3600, 25*24*3600, 4*30*24*3600]


export const add_word = async (req, res) => {

    try {
        const user_id = req.user_id;
        const {name, definition} = req.body;
        if (!name || !definition || !user_id) {
            logger.error('Attempt to add word with missing data', { user_id, name, definition });
            return res.status(400).json({error: 'Please enter a valid word name or definition'});
        }
        const user = await UserModel.findByPk(user_id)

        if (!user) {
            logger.error('Attempt to add word for non-existent user', { user_id });
            return res.status(404).json({error: "User does not exist"});
        }

        const word = await WordModel.create({name, definition, user_id});
        logger.info('New word added successfully', { word_id: word.id, user_id });
        return res.status(201).json({word: word});

    } catch (error){

        logger.error('Failed to add word', { message: error.message, stack: error.stack, body: req.body, user_id: req.user_id });
        return res.status(500).json({error: error});
    }

}

export const review_word = async (req, res) => {
    try {
        const {word_id} = req.params;
        const user_id = req.user_id;
        const { review_status} = req.body;
        if (!word_id || review_status === null) {
            logger.error('Review word attempt with missing ID or status', { word_id, user_id });
            return res.status(400).json({error: "Word Id and Review Status are needed"});
        }

        const word = await WordModel.findByPk(word_id)
        if (!word) {
            logger.error('Review attempt on non-existent word', { word_id, user_id });
            return res.status(400).json({error: "Word does not exist with that Id"});
        }
        if (! (word.user_id === user_id)) {
            logger.error('Unauthorized review attempt', { word_id, user_id, word_owner_id: word.user_id });
            return res.status(400).json({error: "Word with that user does not exist"});
        }

        const current_time = new Date();
        const next_review_time = new Date(current_time);
        if (Boolean(review_status) === true){
            word.bin += 1;
        }
        else {
            word.bin = 1;
            word.wrong_guesses += 1
        }

        if (word.bin < 11){
            next_review_time.setSeconds(next_review_time.getSeconds() + times[word.bin - 1])
        }

        word.next_review_time = next_review_time;
        const updated_word = await word.save();
        logger.info('Word reviewed successfully', { word_id, user_id, new_bin: updated_word.bin, status: review_status });
        return res.status(200).json({word: updated_word});

    } catch (error) {
        logger.error('Failed to review word', { message: error.message, stack: error.stack, word_id: req.params.word_id, user_id: req.user_id });
        return res.status(500).json({error: error});
    }
}

export const get_all_words = async(req, res) => {
    try {
        const user_id = req.user_id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const {rows, count} = await WordModel.findAndCountAll(
    {
                where: {
                    user_id: user_id,
                },
                order : [["bin", "DESC"]],
                limit,
                offset,
            }
        )
        logger.info('Successfully fetched all words', { user_id, page, total: count });
        return res.status(200).json({
            words: rows,
            total: count
        });

    } catch (err) {
        logger.error('Failed to get all words', { message: err.message, stack: err.stack, user_id: req.user_id });
        return res.status(400).json({error: err})
    }
}

export const fetch_word_to_review = async (req, res) => {
    try {
        const user_id = req.user_id;
        const words = await WordModel.findAll({

            where: {
                user_id: user_id,
                next_review_time: {
                    [Op.lte]: new Date()
                },
                bin: {
                    [Op.lt] : 11
                },
                wrong_guesses: {
                    [Op.lt]: 10
                }

            },
            order: [
                ["bin", "DESC"]
            ],
            limit: 1
        })

        if (words.length === 0){
            return res.status(404).json({error: "No words left to review"});
        }

        const word = words[0];

        if ( word.bin === 0){
            word.bin += 1;
            await word.save();
        }
        logger.info('Word fetched for review successfully', { word_id: word.id, user_id });
        return res.status(200).json({word: word});

    } catch (err){
        logger.error('Failed to fetch word for review', { message: err.message, stack: err.stack, user_id: req.user_id });
        return res.status(500).json({error: err})
    }


}

export const delete_word = async (req, res)=>{

    try {
        const user_id = req.user_id;
        const {word_id} = req.params;

        if (!word_id ) {
            logger.error('Delete word attempt with missing Word id', );
            return res.status(400).json({error: "Word Id and Review Status are needed"});
        }

        const value = await WordModel.destroy({where:{user_id: user_id, id:word_id}})
        if (value === 0){
            return res.status(404).json({error: "Word to be deleted not found"});
        }

        return res.status(204).json({message: "Word Successfully Deleted"})

    } catch (err) {
        return res.status(500).json({error: "Internal Server Error"})
    }



}

export const edit_word = async (req, res)=>{

    try {
        const user_id = req.user_id;
        const {id, ...updates} = req.body;

        const [rowsAffected, [updatedWord]] = await WordModel.update(updates, {
            where: {
                id: id,
                user_id: user_id
            },
            returning: true
        });

        if (rowsAffected === 0) {
            logger.error(`Edit word failed: Word with ID ${id} not found or not owned by user ${user_id}`);
            return res.status(404).json({ error: "Word not found or you do not have permission to edit it." });
        }
        logger.info("Word updated successfully", updatedWord)
        return res.status(200).json({ message: "Word updated successfully", word: updatedWord });

    } catch (err){
        return res.status(500).json({error: "Internal Server Error"});
    }

}