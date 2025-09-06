# @bemedev/vitest-extended

Extensions pour faciliter la création de tests avec Vitest.

<br/>

## Installation

```sh
npm install @bemedev/vitest-extended
```

ou

```sh
pnpm add @bemedev/vitest-extended
```

ou

```sh
yarn add @bemedev/vitest-extended
```

<br/>

## Utilisation

### Importation des fonctions

```ts
import {
  useTestFunctionAcceptation,
  useTFA /* Alias of useTestFunctionAcceptation*/,
  createTests,
  doneTest,
  useEach,
  useEachAsync,
  useEachCases,
} from '@bemedev/vitest-extended';
```

### Exemples

<br/>

#### Création de tests

```ts
import { createTests } from '@bemedev/vitest-extended';

const add = (a: number, b: number) => a + b;

describe('Addition', () => {
  const { success } = createTests(
    add,
    {}, // all options (optional)
  );

  success(
    { invite: 'addition de 1 et 2', parameters: [1, 2], expected: 3 },
    { invite: 'addition de 2 et 3', parameters: [2, 3], expected: 5 },
  );
});
```

<br/>

#### Utilisation de `doneTest`

```ts
import { doneTest } from '@bemedev/vitest-extended';
import { createMachine, interpret, typings } from 'xstate';

const machine = createMachine(
  {
    id: 'my-machine',
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: '/running',
        },
      },
      running: {
        on: {
          STOP: '/idle',
          FINISH: '/done',
        },
      },
      done: { entry: 'onDone' },
    },
  },
  typings({
    context: 'boolean',
    eventsMap: {
      START: 'primitive',
      STOP: 'primitive',
      FINISH: 'primitive',
    },
  }),
);

doneTest('test avec done', done => {
  const service = interpret(machine, { context: false });
  service.addOptions(({ voidAction }) => ({
    actions: {
      onDone: voidAction(done),
    },
  }));

  service.start();
  service.send('START');
  service.send('STOP');
  service.send('START');
  service.send('FINISH');
});
```

<br/>

## API

### `useTestFunctionAcceptation`

Test d'acceptation pour une fonction.

### `useTFA`

Alias de `useTFA`.

### `createTests`

Crée des tests pour une fonction avec des cas spécifiques.

### `doneTest`

Crée un test avec une fonction `done` et un timeout.

### `useEach`

Version améliorée de `test.each` suivant le principe de la librairie.

### `useEachAsync`

Version asynchrone de `useEach`.

### `useErrorAsync`

Version asynchrone de `useError`.

<br/>

## NB:

- You can mock the function and assign a value to this function at runtime

<br/>

```ts
import { createTests } from '@bemedev/vitest-extended';

type Add_F = (numb1: number, numb2: number) => number;
const add: Add_F = (numb1, numb2) => numb1 + numb2;
const addTest = undefined as unknown as Add_F;

describe('#2 => CreateTests, funcTest is initialazed after', () => {
  const { success } = createTests.withImplementation(addTest, {
    instanciation: () => add,
    name: 'add', // Add a name because name is not provided at static time
  });

  describe(
    '#01 => success',
    success(
      {
        invite: '0 + 0 = 0',
        parameters: [0, 0],
        expected: 0,
      },
      {
        invite: '99 + 1 = 0',
        parameters: [99, 1],
        expected: 100,
      },
      {
        invite: '1 + 1 = 0',
        parameters: [1, 1],
        expected: 2,
      },
    ),
  );
});
```

<br/>

- And you can transform the function to test

```ts
import { createTests } from '@bemedev/vitest-extended';

const noArgs = () => 'no args';

describe('#1 => Transform', () => {
  const { success } = createTests(noArgs, { transform: () => 'result' });

  describe(
    '#01 => success',
    success({
      invite: 'no args',
      parameters: [],
      // Here the result is transformed from value "no args" to "result"
      expected: 'result',
    }),
  );
});
```

<br/>

- And customize the test function

```ts
import { createTests } from '@bemedev/vitest-extended';

describe('#01 => Add', () => {
  const add = (a: number, b: number) => a + b;
  const { success } = createTests(add, x => x.toLocaleString());

  describe(
    '#01 => success',
    success(
      {
        invite: '1 + 2',
        parameters: [1, 2],
        expected: '3',
      },
      {
        invite: '1 + 2, with specific test',
        parameters: [1, 2],
        expected: '31',
        test: (value, expected) => {
          expect(value + 1).toBe(expected);
        },
      },
    ),
  );
});
```

<br/>

## Licence

MIT

<br/>

## [CHANGE_LOG](CHANGE_LOG.md)

<br/>

## Auteur

Charles-Lévi BRI,

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

```

```
