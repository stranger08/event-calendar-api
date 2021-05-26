const {
    mongoDbService
} = require('../../../services')

async function _delete(id) {
    try {
        await mongoDbService.deleteEvent(id)
        return {id}
    } catch(err) {
        throw err
    }
}

module.exports = function(args, cb) {
    _delete(args)
        .then(event => {
            cb({
                event
            })
    })
}