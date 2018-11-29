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
        Post.create(req.body)
            .then(post => {
                logger.info(`Created post ${post.title}`);
                return res.json(Utilities.processResponse(post));
        }).catch(err => {
            const { error } = Utilities.processError(err);
            logger.error(`Error in creating post: ${error}`);
            return res.status(400).json({error});
        });
    },
    getById: async function(req, res){
        Post.findOne(req.params.id)
            .then(post => {
                if(post){
                    logger.info(`Get post by id: ${post.title}`);
                    return res.json(Utilities.processResponse(post));
                }else{
                    logger.info(`Get post by id not found: ${req.params.id}`);
                    return res.status(400).json({error: 'Post not found'});
                }
        }).catch(err => {
            const { error } = Utilities.processError(err);
            logger.error(`Error in getting post: ${error}`);
            return res.status(400).json({error});
        });
    },
    search: async function(req, res){
        Post.find(req.body)
            .then(posts => {
                logger.info(`Search posts`);
                return res.json(posts);
        }).catch(err => {
            const { error } = Utilities.processError(err);
            logger.error(`Error in searching post: ${error}`);
            return res.status(400).json({error});
        });
    }

};

