import Sequelize, { Model } from 'sequelize';

class Meetapp extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
    this.belongsToMany(models.User, {
      through: 'user_meetapp',
      foreignKey: 'user_id',
      as: 'users',
    });
  }
}

export default Meetapp;
