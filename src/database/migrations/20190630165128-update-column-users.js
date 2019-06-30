module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'provider', {
      type: Sequelize.BOOLEAN,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'provider',

      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    );
  },
};
