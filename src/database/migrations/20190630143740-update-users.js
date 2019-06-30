module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'profile_id',

      {
        type: Sequelize.INTEGER,
        references: {
          model: 'profiles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: queryInterface => queryInterface.removeColumn('users', 'profile_id'),
};
