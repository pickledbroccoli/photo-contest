const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

const sequelize = new Sequelize('photo_contest', process.env.DBUSER, process.env.DBPASSWORD, {
    dialect: 'postgres',
    host: process.env.DBHOST
});

sequelize.authenticate().then( () => {
    console.log('Successful connection to DB');
}).catch( (err) => {
    console.log('An error happened, ', err);
});

const User = sequelize.define('user', {
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

const Picture = sequelize.define('picture', {
    src_path: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

const Caption = sequelize.define('caption', {
    user_id: {
        type: Sequelize.DataTypes.INTEGER
    },
    picture_id: {
        type: Sequelize.DataTypes.INTEGER
    }
});

sequelize.sync().then( (data) => {
   console.log('models synced successfully');
}).catch((err) => {
    console.log('Error syncing models', err);
});

// insert test pics
Picture.sync({alter: true}).then( () => {
    return Picture.create({
        src_path: 'testPath01'
    });
}).catch( (err) => {
    console.log(err);
});
// helper query functions for the routers
const getAllPictures = async (req, res) => {
    const pictureArray = await Picture.sync({alter: true}).then( () => {
        return Picture.findAll();
    }).catch( (err) => {
        res.status(404).send('no records found');
    });
    res.status(200).send(pictureArray);
};




module.exports = { getAllPictures, };