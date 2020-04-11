const handleProfileId = (req, res, knex) => {
    const { id } = req.params;
    knex.select('*').from('users')
        .where({id})
        .then(user => {
            if (user.length) {
               res.json(user[0]) 
            }
            else {
                throw new Error('Not Found');
            }
            })
    .catch(err => res.status(400).json(err.message))
}

module.exports = {handleProfileId};