const User = require('./../models/User-model')

function noAvatar(avatar) {
    if (!avatar) avatar = String(User.schema.obj.avatar.default)
    return avatar
}

function renderizeButtom(user, id) {
    return { isAdmin: user?.role === "Admin", isUser: user?._id == id }
}

function logged(currentUser, id) {
    return currentUser && currentUser._id === id;
}
function logOut(currentUser, id) {
    return currentUser && currentUser._id === id;
}


module.exports = { noAvatar, renderizeButtom, logged, logOut }