import User from '../models/User';
import Profile from '../models/Profile';

class UserController {
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'User Already Exist' });
    }

    const profileExist = await Profile.findOne({
      where: { id: req.body.profileID },
    });

    if (!profileExist) {
      return res.status(400).json({ error: 'Profile does not exist' });
    }

    const { id, name, profileID, email } = await User.create(req.body);

    return res.json({ id, name, profileID, email });
  }
}
export default new UserController();
