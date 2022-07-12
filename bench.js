async function benchmark() {
  const input = document.querySelector("input");
  // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  ).set;

  const results = [];
  for (const _ of Array.from(range(0, 101))) {
    results.push(await runOnce());
  }
  results.sort((a, b) => a - b);
  const median = results[50];
  console.log("median:", median);
  console.log(results);

  async function runOnce() {
    inputClear();
    await waitForIdle();
    const start = performance.now();
    await runTasks(100, [
      inputChar("b"),
      inputChar("a"),
      inputChar("l"),
      inputChar("l"),
      // removeChar,
      // removeChar,
      // removeChar,
      // removeChar,
    ]);
    const end = performance.now();
    await waitForIdle();
    return end - start;
  }

  function runTasks(interval, _tasks) {
    const tasks = [..._tasks];
    let end;
    const timerId = setInterval(() => {
      const task = tasks.shift();
      if (task) {
        task();
        return;
      }
      clearInterval(timerId);
      end();
    }, interval);
    return new Promise((resolve) => (end = resolve));
  }

  function inputChar(char) {
    return () => {
      nativeInputValueSetter.call(input, input.value + char);
      input.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
        })
      );
    };
  }
  function removeChar() {
    nativeInputValueSetter.call(input, input.value.slice(0, -1));
    input.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
      })
    );
  }
  function inputClear() {
    nativeInputValueSetter.call(input, "");
    input.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
      })
    );
  }

  function waitForIdle() {
    return new Promise((resolve) => {
      requestIdleCallback(resolve);
    });
  }

  function* range(start, end) {
    for (let i = start; i < end; i++) {
      yield i;
    }
  }
}
benchmark();
