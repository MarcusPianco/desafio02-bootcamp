import Router from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authHeaders from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import multerConfig from './config/multer';
import MeetappController from './app/controllers/MeetappController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authHeaders);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetapps', MeetappController.store);
routes.get('/meetapps', MeetappController.index);
routes.post('/meetapps/:id', MeetappController.update);
routes.delete('/meetapps/cancel/:id', MeetappController.delete);

routes.put('/users', UserController.update);

routes.post('/meetapps/:id/subscription', SubscriptionController.store);

export default routes;
