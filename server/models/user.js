const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: { args: 3 },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: 3 },
      },
      field: 'password',
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
  });

  User.associate = (models) => {
    models.User.hasMany(models.Board, {
      foreignKey: 'owner_id',
      onDelete: 'SET NULL',
    });

    models.User.hasMany(models.Card, {
      foreignKey: 'owner_id',
      onDelete: 'SET NULL',
    });




  };

  User.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
  };

  User.beforeUpdate(function (user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password)
      hasSecurePassword(user, options, callback);
    else
      return callback(null, options);
  });

  User.beforeCreate((model, options) => {
    return new Promise((resolve, reject) => {
      model.password = bcrypt.hashSync(model.password, bcrypt.genSaltSync(8), null)
      return resolve(model, options);
    });
  });

  // Alternate approach: https://stackoverflow.com/questions/31427566/sequelize-create-model-with-beforecreate-hook



  return User;
}