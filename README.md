[![npm (scoped)](https://img.shields.io/npm/v/@atomic.builders/reactor)](https://www.npmjs.com/package/@atomic.builders/reactor)

# ☢ Reactor

## Reactive-store

Basic _minimalistic REDUX_ made with RxJs

> Production ready **observable state management**

## 🎯 Motivation

✅ Avoid the use of heavy and complex libraries like _NgRX_

✅ Less than 100 lines [store.ts](https://github.com/AtomicBuilders/reactor/blob/master/src/store.ts)

## Installation

```bash
npm i @atomic.builders/reactor
```

## ✨ Sample use

```typescript
const initialBasket: Basket = { client: '', items: [], status: '' };
const basket$ = new Store<Basket>(initialBasket);

// BASIC USAGE
// get snapshot
const currentBasket: Basket = basket$.getState();
console.log(currentBasket);
// observe changes
basket$.getState$().subscribe({
  next: basket => console.log({ basket }),
});
// observe selected changes
basket$
  .select$(basket => basket.status)
  .subscribe({
    next: status => console.log({ status }),
  });
// setting direct state
basket$.setState({ client: '', items: [], status: 'EMPTY' });

// WHITH ACTIONS
// observe actions
basket$.getActions$().subscribe({
  next: action => console.log({ action }),
});
// dispatch simple action
const setClientAction: Action<Basket> = new Action<Basket>('SET_CLIENT', {
  client: 'John Doe',
  status: 'EMPTY',
});
basket$.dispatch(setClientAction);

// WITH A REDUCER
// dispatch action with payload and reducer
const itemPayload: Item = {
  name: 'An ACME thing',
  units: 19,
  unitPrice: 71,
};
const addItemReducer = (basket: Basket, payload: unknown) => {
  basket.items = [...basket.items, payload as Item];
  basket.status = 'FILLED';
  return basket;
};
const addItemAction: Action<Basket> = new Action<Basket>('ADD_ITEM', itemPayload, addItemReducer);
basket$.dispatch(addItemAction);
```

## ⚙ Workflows

### 👨‍💻 Dev Workflow

While developing, make sure to install the recommended extensions for a better dev experience.

Run `npm run test:watch` it will run test after each change. Ideal for TDD or testing just in time.

Run `npm run test` it will run all test once and stops. Default for CI/CD most common environments.

If you want also the coverage report then use `npm run test:coverage` .

## 🛠 Tools

### 📦 Commits and release

- Use [standard-version](https://www.npmjs.com/package/standard-version) to produce a changelog file from [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### 💅 Code style with Prettier

- Installed and configured prettier

> Recommended [prettier extension](https://github.com/prettier/prettier-vscode)

### 📐 Code linting with esLint

- Installed and configured eslint to work with prettier

> Recommended [esLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### 🧪 Code tested with Jest

- Installed and configured **jest** to run specs
- Configured to conform with **eslint**
- Uses `ts-jest` to work natively with **TypeScript**

## 👨 Created by Alberto Basalo

> [@albertobasalo](https://twitter.com/albertobasalo)
