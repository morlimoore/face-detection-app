const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: 'b57fdc38eab0440dba24d41655c57066'});
const handleImageApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to connect to API'))
}

const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get count'))
}

module.exports = {handleImage, handleImageApiCall};