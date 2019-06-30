import Sequelize, { Model } from 'sequelize';
import Profile from './Profile';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize }
    );
    User.belongsTo(Profile);
  }
}

export default User;
