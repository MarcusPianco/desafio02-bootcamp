import Router from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authHeaders from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import multerConfig from './config/multer';
import MeetappController from './app/controllers/MeetappController';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authHeaders);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetapps', MeetappController.store);

routes.put('/users', UserController.update);

export default routes;
