const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res, next) => {
    res.json({info: 'legalabb az express elindult'});
});

const sequelize = new Sequelize(
  'photo_contest',
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'postgres'
  }
);

/*
const testit = async () => {
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
};
testit();
*/






app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});