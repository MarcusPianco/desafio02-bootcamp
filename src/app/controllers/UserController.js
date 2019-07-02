import User from '../models/User';
import Profile from '../models/Profile';

class UserController {
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'User Already Exist' });
    }

    const profileExist = await Profile.findOne({
      where: { id: req.body.profile_id },
    });

    if (!profileExist) {
      return res.status(400).json({ error: 'Profile does not exist' });
    }

    // eslint-disable-next-line camelcase
    const { id, name, profile_id, email } = await User.create(req.body);

    return res.json({ id, name, profile_id, email });
  }

  async update(req, res) {
    const userExist = await User.findByPk(req.userID);

    if (!userExist) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    // eslint-disable-next-line camelcase
    const { id, email, profile_id, name } = await userExist.update(req.body);

    return res.json({ id, email, profile_id, name });
  }
}
export default new UserController();
