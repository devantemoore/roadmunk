module.exports = {
    processError: function (error) {
        if(error.details !== undefined) {
            return { error: error.details }

        } else{
            return { error: error }
        }

    },

};
