

module.exports = {

  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Board', {
      _id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // @ FOREIGN KEY SECTION
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
    return queryInterface.dropTable('Board');
  },

};