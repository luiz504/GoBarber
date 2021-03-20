/* eslint-disable @typescript-eslint/no-explicit-any */
import ICacheProvider from '../models/ICacheProvider';

interface IClient {
  [key: string]: string;
}
class FakeCacheProvider implements ICacheProvider {
  private client: IClient = {};

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async save(key: string, value: any): Promise<void> {
    this.client[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.client[key] || null;

    if (!data) {
      return null;
    }
    const parsedDate = JSON.parse(data) as T;

    return parsedDate;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.client[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.client).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.client[key];
    });
  }
}

export default FakeCacheProvider;
