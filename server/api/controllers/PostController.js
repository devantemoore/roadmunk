/**
 * PostController
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
            let author = req.headers.authorization;
            author = (author) ? author : 'Anonymous';
           const post = await Post.create({author, ...req.body}).fetch();
            logger.info(`Post created: ${post.title}`);
            return res.json(Utilities.processResponse(post));
        }catch (err){
            const error = Utilities.processModelError(err);
            logger.error(`Error in creating post: ${error}`);
            return res.badRequest({error});
        }
    },
    getById: async function(req, res){
        try{
            const post = await Post.findOne(req.params.id).populate('comments', {
                limit: 3,
                sort: 'id DESC',
            });
            if(post){
                logger.info(`Get post by id: ${post.title}`);
                return res.json(Utilities.processResponse(post));
            }else{
                logger.info(`Get post by id not found: ${req.params.id}`);
                return res.status(400).json({error: 'Post not found'});
            }
        }catch (err){
            const { error } = Utilities.processError(err);
            logger.error(`Error in getting post: ${error}`);
            return res.status(400).json({error});
        }
    },
    search: async function(req, res){
        let { size, page, title, description, id } = req.body;
        size = (size) ? size : 10;
        page = (page) ? page : 1;
        const offset = size * (page - 1);
        try{
            const posts = await Post.find(
                {
                    title,
                    id,
                    description
                })
                .skip(offset)
                .limit(size);
            return res.json(Utilities.processResponse({posts, page, size}));
        } catch (err){
            const error = Utilities.processModelError(err);
            return res.badRequest({error});
        }
    }

};

