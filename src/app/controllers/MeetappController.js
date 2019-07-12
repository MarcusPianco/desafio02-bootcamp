import Meetapp from '../models/Meetapp';

class MeetappController {
  async store(req, res) {
    const { title, description, date, location } = req.body;

    await Meetapp.create({
      title,
      description,
      date,
      location,
      user_id: req.userID,
      banner_id: req.body.banner_id,
    });
    return res.json({ title, description, date, location });
  }
}

export default new MeetappController();
