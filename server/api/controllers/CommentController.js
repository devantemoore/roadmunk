/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Utilities = require('../../utils/Utilities');
const Logger = require('../../utils/Logger');
const logger = new Logger('RM');

module.exports = {
    create: async function(req, res){
        try{
            const comment = await Comment.create(req.body).fetch();
            logger.info(`Comment created: ${comment.message}`);
            return res.json(Utilities.processResponse(comment));
        }catch (err){
            const error = Utilities.processModelError(err);
            logger.error(`Error in creating comment: ${error}`);
            return res.badRequest({error});
        }
    },
    search: async function(req, res){
        let { size, page, postId, id } = req.body;
        size = (size) ? size : 10;
        page = (page) ? page : 1;
        const offset = size * (page - 1);
        try{
            const comments = await Comment.find(
                {
                    postId,
                    id
                })
                .skip(offset)
                .limit(size);
            return res.json(Utilities.processResponse(comments));
        } catch (err){
            const error = Utilities.processModelError(err);
            return res.badRequest({error});
        }
    },
    test: async function (req, res) {
        try{
            const user = await User.find({}).populate('pets');
            return res.json(Utilities.processResponse(user));
        } catch (err){
            const error = Utilities.processModelError(err);
            return res.badRequest({error});
        }
    },
    test2: async function (req, res) {
        try{
            const user = await User.create(req.body).fetch();
            return res.json(Utilities.processResponse(user));
        } catch (err){
            const error = Utilities.processModelError(err);
            return res.badRequest({error});
        }
    },
    test3: async function (req, res) {
        try{
            const user = await Pet.create(req.body).fetch();
            return res.json(Utilities.processResponse(user));
        } catch (err){
            const error = Utilities.processModelError(err);
            return res.badRequest({error});
        }
    }

};

