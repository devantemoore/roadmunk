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
                return res.json(post);
        }).catch(err => {
            const { error } = Utilities.processError(err);
            logger.error(`Error in creating post: ${error}`);
            return res.status(400).json({error});
        });
    }

};

