import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersController = new ProvidersController();
const providerDayAvailability = new ProviderDayAvailabilityController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailability.index,
);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailability.index,
);

export default providersRouter;
