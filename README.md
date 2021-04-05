# ☢ Reactor

## RxJs-Store

Basic **Observable Store** made with RxJs

> Production ready _minimalistic REDUX_.

## 🎯 Motivation

Avoid the use of heavy and complex libraries like NgRX

## ✨ Use

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
  client: 'Jhon Doe',
  items: [],
  status: 'EMPTY',
});
basket$.dispatch(setClientAction);

// WITH A REDUCER
// dispatch action with payload and reducer
const itemPayload: Item = {
  name: 'An ACME thing',
  units: 1,
  unitPrice: 99,
};
const addItemReducer = (basket: Basket, payload: Item) => {
  basket.items.push(payload);
  return basket;
};
const addItemAction: Action<Basket> = new Action<Basket>('ADD_ITEM', itemPayload, addItemReducer);
basket$.dispatch(addItemAction);
```

## ⚙ Workflows

### 👨‍💻 Dev Workflow

While developing, make sure to install the recommended extensions for a better dev experience.

#### Testing

Run `npm run test:watch` it will run test after each change. Ideal for TDD or testing just in time.

#### Updating

To keep your dependencies up to date use `npm run updates` and it will check for updates. Then cherry pick what you want to update.

### 🚚 Deploy Workflow

#### Testing

Run `npm run test` it will run all test once and stops. Default for CI/CD most common environments.

If you want also the coverage report then use `npm run test:coverage` .

#### Publish

If you want to publish your work as a package or simply want to keep track of your releases, then there is a script for you: `npm run release`. It will:

- update the versión number
- update the change log file.
- push and tag changes

### 🤖 Scripts

Here you have a recap of the available scripts

```json
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch --verbose --noStackTrace",
    "test:coverage": "jest --coverage",
    "format": "prettier --write \"./**/*.{ts,json}\"",
    "lint": "eslint src --ext .ts",
    "lint:fix": "npm run lint -- --fix",
    "prerelease": "standard-version ",
    "release": "git push --follow-tags origin master",
    "updates": "ncu -u"
  }
```

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

### 🧩 VS Code Extensions

Recommendations

- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [Editor Config](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [JavaScript Booster](https://marketplace.visualstudio.com/items?itemName=sburg.vscode-javascript-booster)
- [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Peacock](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)
- [Prettier](https://github.com/prettier/prettier-vscode)
- [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright)
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

## 👨 Created by Alberto Basalo

[@albertobasalo](https://twitter.com/albertobasalo)
