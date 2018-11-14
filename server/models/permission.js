
module.exports = (sequelize, DataTypes) => {

  const Permission = sequelize.define('Permission', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    access_level: DataTypes.INTEGER,
  })

  Permission.associate = (models) => {
    models.User.belongsTo(models.User, {
      foreignKey: 'owner_id',
      onDelete: 'CASCADE',
    })
  }

  return Permission;
}