
module.exports = (sequelize, DataTypes) => {

  const Card = sequelize.define('Card', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    color: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    content: DataTypes.TEXT,
    due_date: DataTypes.DATE,
    status: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //https://github.com/EngineerFocus/FocusPro/blob/master/server/databases/Schema.js
    history: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING, DataTypes.STRING)),
  });

  Card.associate = (models) => {
    models.Card.belongsTo(models.Board, {
      foreignKey: 'board_id',
      onDelete: 'CASCADE',
    });

    models.Card.belongsTo(models.User, {
      foreignKey: 'owner_id',
    });

  }

  return Card;
}