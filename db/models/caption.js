'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Caption.belongsTo(models.User, {
        as: 'createdByUser',
        foreignKey: 'user_id'
      });
      Caption.belongsTo(models.Picture, {
        as: 'captionsThisPicture',
        foreignKey: 'picture_id'
      });
    }
  }
  Caption.init({
    id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    picture_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caption',
    tableName: 'captions',
  });
  return Caption;
};