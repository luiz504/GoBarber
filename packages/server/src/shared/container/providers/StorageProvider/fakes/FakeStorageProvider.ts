import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findFileIndex = this.storage.findIndex(
      storagedFile => storagedFile === file,
    );

    if (findFileIndex !== -1) {
      this.storage.splice(findFileIndex, 1);
    }
  }
}

export default FakeStorageProvider;
