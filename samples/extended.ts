import { Basket } from '../samples/basket';
import { Item } from '../samples/item';
import { Action } from '../src/models/action';
import { Store } from '../src/store';

export class Basket$ extends Store<Basket> {
  constructor() {
    super({ client: '', items: [], status: '' });
  }

  setClient(client: string): void {
    const setClientAction: Action<Basket> = new Action<Basket>('SET_CLIENT', {
      client: client,
      status: 'EMPTY',
    });
    super.dispatch(setClientAction);
  }

  addItem(item: Item): void {
    const addItemAction: Action<Basket> = new Action<Basket>('ADD_ITEM', item, this.addItemReducer);
    super.dispatch(addItemAction);
  }
  private addItemReducer(basket: Basket, payload: unknown) {
    basket.items = [...basket.items, payload as Item];
    basket.status = 'FILLED';
    return basket;
  }
}
