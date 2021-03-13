import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileController = new ProfileController();

const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        not: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      password_confirmation: Joi.string().when('old_password', {
        not: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.string().required().valid(Joi.ref('password')),
      }),
    },
  }),
  profileController.update,
);

export default profileRouter;
