import Sequelize from 'sequelize';

import User from '../app/models/User';
import Profile from '../app/models/Profile';

import databaseConfig from '../config/database';
import File from '../app/models/File';
import Meetapp from '../app/models/Meetapp';

const models = [Profile, User, File, Meetapp];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
