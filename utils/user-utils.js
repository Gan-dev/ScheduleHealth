const User = require('./../models/User-model')

function noAvatar(avatarUrl) {
    if (!avatarUrl) avatarUrl = String(User.schema.obj.avatarUrl.default)
    return avatarUrl
}


module.exports = noAvatar