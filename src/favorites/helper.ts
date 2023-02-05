import { Store } from 'src/store/store';
import { Favorite } from './favorites.entitie';

export const removeFromFavoritesByKey = (
  id: string,
  favKey: keyof Favorite,
): void => {
  const index = Store.getInstance().favorites[favKey].findIndex(
    (key) => key.id == id,
  );

  if (index !== -1) {
    Store.getInstance().favorites[favKey].splice(index, 1);
  }
};
