import { container } from 'tsyringe';
import MailProvider from './MailProvider/implementations/MailProvider';
import IMailProvider from './MailProvider/models/IMainProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
container.registerSingleton<IMailProvider>('StorageProvider', MailProvider);
