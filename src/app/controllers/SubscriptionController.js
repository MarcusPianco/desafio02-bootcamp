import Meetapp from '../models/Meetapp';
import User from '../models/User';

class SubscriptionController {
  async store(req, res) {
    // eslint-disable-next-line camelcase
    const { id } = req.params;
    const meetapp = await Meetapp.findOne({
      where: {
        id,
      },
    });
    if (!meetapp) {
      return res
        .status(400)
        .json({ error: 'Meetapp does not exist or was deleted' });
    }

    if (req.userID === meetapp.user_id) {
      return res.status(400).json({
        error:
          "You are the same user that Created meetapp, you don't subscribe",
      });
    }

    const user = await User.findOne({ where: { id: req.userID } });

    await meetapp.setUsers(user);

    return res.json(meetapp);
  }
}
export default new SubscriptionController();
