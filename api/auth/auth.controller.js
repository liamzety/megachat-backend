const authService = require('./auth.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send(err)
    }
}

async function signup(req, res) {
    try {
        const { password, username, nickname } = req.body
        await authService.signup(password, username, nickname)
        const user = await authService.login(username, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        res.status(500).send(err || 'could not signup, please try later' )
    }
}
async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    login,
    signup,
    logout
}