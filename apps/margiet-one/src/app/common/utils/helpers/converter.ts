import { ComicEntity } from '../../../entities';
import { ComicModel } from '../../../graphql';

export class Converter {
  static convertComicEntityToComicModel(entity: ComicEntity): ComicModel {
    return entity as ComicModel;
  }
}
