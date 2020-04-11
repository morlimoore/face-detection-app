const handleSignIn = (req, res, knex, bcrypt) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).json('Invalid credentials')
    }
    knex.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                knex.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            }
            else {
                res.status(400).json('Wrong password');
            }
        })
        .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {handleSignIn}