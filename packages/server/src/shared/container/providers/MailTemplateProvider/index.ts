import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

const providers = {
  default: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.default,
);
