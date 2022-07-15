// hard-mode benchmark script v2
async function benchmark() {
  const input = document.querySelector("input");
  // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  ).set;

  const N = 21;
  const INTERVAL = 64;
  const SIZES = [1, 6, 12];

  let inputDelay = 0;
  let renderingOverhead = 0;
  for (const size of SIZES) {
    const { inputDelayMedian, renderingOverheadMedian } = await runOneSize(
      size
    );
    inputDelay += inputDelayMedian * (12 / size);
    renderingOverhead += renderingOverheadMedian * (12 / size);
  }
  console.log("--- result ---");
  console.log("inputDelay:", inputDelay);
  console.log("renderingOverhead:", renderingOverhead);

  async function runOneSize(size) {
    const inputDelayList = [];
    const renderingOverheadList = [];
    for (const _ of Array.from(range(0, N))) {
      const { inputDelay, renderingOverhead } = await runOnce(size);
      inputDelayList.push(inputDelay);
      renderingOverheadList.push(renderingOverhead);
    }
    const inputDelayMedian = getMedian(inputDelayList);
    const renderingOverheadMedian = getMedian(renderingOverheadList);
    console.log({
      size,
      inputDelayList,
      renderingOverheadList,
    });
    return {
      inputDelayMedian,
      renderingOverheadMedian,
    };
  }

  function getMedian(arr) {
    arr.sort((a, b) => a - b);
    return arr[arr.length >> 1];
  }

  async function runOnce(size) {
    globalThis.setDataSetRepeatSize(size);
    inputClear();
    await waitUntil(() => document.querySelectorAll("mark").length === 0);
    const start = performance.now();
    const inputDelay = await runTasks(INTERVAL, [
      inputChar("b"),
      inputChar("a"),
      inputChar("l"),
      inputChar("l"),
      // removeChar,
      // removeChar,
      // removeChar,
      // removeChar,
    ]);
    await waitUntil(
      () => document.querySelectorAll("mark").length === 43 * size
    );
    const end = performance.now();
    return {
      inputDelay,
      renderingOverhead: end - start - INTERVAL * 3,
    };
  }

  async function waitUntil(predicate) {
    while (true) {
      if (predicate()) {
        return;
      }
      await waitForIdle();
    }
  }

  function runTasks(interval, _tasks) {
    const [task1, ...tasks] = _tasks;
    let accDelay = 0;
    let startTime;
    queueMicrotask(() => {
      startTime = performance.now();
      task1();
    });
    let end;
    const timerId = setInterval(() => {
      accDelay += performance.now() - startTime - interval;
      const task = tasks.shift();
      if (task) {
        startTime = performance.now();
        task();
        if (tasks.length === 0) {
          clearInterval(timerId);
          end(accDelay);
        }
        return;
      }
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
