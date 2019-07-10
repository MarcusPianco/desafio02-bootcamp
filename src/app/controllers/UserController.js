import * as Yup from 'yup';
import User from '../models/User';
import Profile from '../models/Profile';

class UserController {
  async store(req, res) {
    const scheme = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
      profile: Yup.string()
        .required()
        .max(2),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const scheme = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      profile: Yup.string().max(2),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    const { email, oldPassword } = req.body;

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const user = await User.findByPk(req.userID);

    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        return res.status(400).json({ error: 'User already exist!!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // eslint-disable-next-line camelcase
    const { id, profile_id, name } = await user.update(req.body);

    return res.json({ id, profile_id, name });
  }
}
export default new UserController();
