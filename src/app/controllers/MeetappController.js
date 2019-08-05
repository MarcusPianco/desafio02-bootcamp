import { getTime } from 'date-fns';
import * as Yup from 'yup';
import Meetapp from '../models/Meetapp';

class MeetappController {
  async index(req, res) {
    const meetapps = await Meetapp.findAll({ user_id: req.userID });

    return res.json(meetapps);
  }

  async store(req, res) {
    const { title, description, date, location } = req.body;

    const scheme = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
      location: Yup.string().required(),
      banner_id: Yup.number(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (getTime(date) < Number(new Date())) {
      return res.status(400).json({
        error: 'Date can not to be previous of today',
      });
    }

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

  async update(req, res) {
    const scheme = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      date: Yup.date(),
      location: Yup.string(),
      banner_id: Yup.number(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const meetapp = await Meetapp.findByPk(req.params.id);

    if (!(req.userID === meetapp.user_id)) {
      return res.status(401).json({ error: 'User unauthorized' });
    }

    const {
      title,
      description,
      date,
      location,
      // eslint-disable-next-line camelcase
      banner_id,
    } = await meetapp.update(req.body);

    return res.json({ title, description, date, location, banner_id });
  }

  async delete(req, res) {
    const meetapp = await Meetapp.findByPk(req.params.id);

    if (!(meetapp.user_id === req.userID)) {
      return res.status(401).json({ error: 'User unauthorized' });
    }
    // Modificar a autorização de mudança para horas e nnao dia de cancelamento
    // adicionar também uma coluna de valor bollean para checar se ocorreu a
    // meetapp
    if (getTime(meetapp.date) < Number(new Date())) {
      return res.status(400).json({
        error: 'The cancel is not possible because the meeting has occurred',
      });
    }

    await meetapp.destroy();
    return res.status(202).json({ message: 'Meetapp Canceled' });
  }
}

export default new MeetappController();
