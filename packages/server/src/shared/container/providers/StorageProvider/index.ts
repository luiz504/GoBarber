import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';

const storages = {
  local: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storages.local,
);
