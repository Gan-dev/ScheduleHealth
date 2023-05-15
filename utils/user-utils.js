const User = require('./../models/User-model')

function noAvatar(avatar) {
    if (!avatar) avatar = String(User.schema.obj.avatar.default)
    return avatar
}

function renderizeButtom(user, id) {
    return { isAdmin: user?.role === "Admin", isUser: user?._id == id }
}

module.exports = { noAvatar, renderizeButtom }