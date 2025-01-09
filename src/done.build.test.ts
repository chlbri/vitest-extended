import sleep from '@bemedev/sleep';
import { doneTest } from 'this1';
import { describe } from 'vitest';
import { createMachine, interpret } from 'xstate';

const machine = createMachine({
  id: 'my-machine',
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: 'running',
      },
    },
    running: {
      on: {
        STOP: 'idle',
        FINISH: 'done',
      },
    },
    done: { type: 'final' },
  },
});

describe('DoneTest', () => {
  doneTest('#1 => Simple', done => {
    const service = interpret(machine)
      .onDone(() => done())
      .start();

    service.send('START');
    service.send('STOP');
    service.send('START');
    service.send('FINISH');
  });

  doneTest.fails('#2 => Fails', done => {
    const service = interpret(machine)
      .onDone(() => done())
      .start();

    service.send('START');
    service.send('STOP');
    service.send('START');
  });

  doneTest.concurrent(
    '#3 => Concurrent',
    done => {
      const service = interpret(machine)
        .onDone(() => done())
        .start();

      service.send('START');
      service.send('STOP');
      service.send('START');

      setTimeout(() => {
        service.send('FINISH');
      }, 100);
    },
    { timeout: 100 },
  );

  doneTest.fails(
    '#4 => Not enough time',
    done => {
      const service = interpret(machine)
        .onDone(() => done())
        .start();

      service.send('START');
      service.send('STOP');
      service.send('START');

      setTimeout(() => {
        service.send('FINISH');
      }, 1000);
    },
    10,
  );

  doneTest.fails(
    '#5 => Adding Async function for only 1 second plus will fails',
    async done => {
      const service = interpret(machine)
        .onDone(() => done())
        .start();

      service.send('START');
      service.send('STOP');
      service.send('START');
      await sleep(1);

      setTimeout(() => {
        service.send('FINISH');
      }, 100);
    },
    100,
  );
});
