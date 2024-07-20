const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const { getAllPictures, getPictureById, postCaption }= require('./database.js');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res, next) => {
    res.json({info: 'legalabb az express elindult'});
});

/* endpointok routingjai
*get all, get single pic by id, post caption to single pic by id
*/
app.get('/pictures', getAllPictures);

app.get('/pictures/:id', getPictureById);

app.post('/pictures/:id', postCaption);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});