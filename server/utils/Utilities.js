module.exports = {
    processError: function (error) {
        if(error.details !== undefined) {
            return { error: error.details }
        } else{
            return { error: error }
        }

    },
    processModelError: function (error) {
        switch (error.name) {
            case 'UsageError': return error.details;
            default: return 'Unable to process request';
        }

    },
    processResponse: function (data) {
        return { data: data};
    }

};
