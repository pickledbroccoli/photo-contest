const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res, next) => {
    res.json({info: 'legalabb az express elindult'});
});









app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});