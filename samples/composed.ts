import { Observable } from 'rxjs';
import { Basket } from '../samples/basket';
import { Item } from '../samples/item';
import { Action } from '../src/models/action';
import { Store } from '../src/store';

export class Basket$ {
  // avoid direct access to store methods
  private store$ = new Store<Basket>({ client: '', items: [], status: '' });

  // needs some helpers
  getBasket$(): Observable<Basket> {
    return this.store$.getState$();
  }

  setClient(client: string): void {
    const setClientAction: Action<Basket> = new Action<Basket>('SET_CLIENT', {
      client: client,
      status: 'EMPTY',
    });
    this.store$.dispatch(setClientAction);
  }

  addItem(item: Item): void {
    const addItemAction: Action<Basket> = new Action<Basket>('ADD_ITEM', item, this.addItemReducer);
    this.store$.dispatch(addItemAction);
  }
  private addItemReducer(basket: Basket, payload: unknown) {
    basket.items = [...basket.items, payload as Item];
    basket.status = 'FILLED';
    return basket;
  }
}
