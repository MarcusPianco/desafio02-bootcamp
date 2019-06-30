import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import Profile from './Profile';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        profile_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Profile,
            key: 'id',
          },
        },
      },
      { sequelize }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
