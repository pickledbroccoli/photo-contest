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
    },
    body: {
        type: Sequelize.DataTypes.TEXT
    }
});

sequelize.sync().then( (data) => {
   console.log('models synced successfully');
}).catch((err) => {
    console.log('Error syncing models', err);
});

/*
// insert test pics
Picture.sync({alter: true}).then( () => {
    return Picture.create({
        src_path: 'testPath01'
    });
}).catch( (err) => {
    console.log(err);
});
*/

// insert test user
User.sync({alter: true}).then( () => {
    return User.create({
        username: 'testuser01',
        password: 'asdf'
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

const getPictureById = async (req, res) => {
    const thisId = req.params.id;
    const myPicture = await Picture.sync({alter: true}).then( () => {
        return Picture.findOne({ where: { id: thisId } });
    }).catch( (err) => {
        res.status(404).send(` Id ${thisId} not found`);
    });
    res.status(200).send(myPicture.toJSON());
};

const postCaption = async (req, res) => {
    const thisId = req.params.id;
    const thisUser = req.body.userId;
    const captionText = req.body.caption;
    const newCaption = await Caption.sync({alter: true}).then( () => {
        return Caption.create( {
            picture_id: thisId,
            user_id: thisUser,
            body: captionText
        } );
    }).catch( (err) => {
        res.status(400).send('error, cannot post caption', err);
    });
    res.status(201).send('caption saved');
};


module.exports = { getAllPictures, getPictureById, postCaption, };