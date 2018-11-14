
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Card', {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      completed: {
        type: Sequelize.BOOLEAN,
      },
      content: {
        type: Sequelize.TEXT,
      },
      due_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // @ FOREIGN KEY SECTION
      board_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Board',
          key: '_id',
        },
      },
      owner_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'User',
          key: '_id',
        },
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Tasks');
  }
};