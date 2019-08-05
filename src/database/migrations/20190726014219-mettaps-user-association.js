module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_meetapp', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      meetapp_id: {
        type: Sequelize.INTEGER,
        references: { model: 'meetapps', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('user_meetapp');
  },
};
