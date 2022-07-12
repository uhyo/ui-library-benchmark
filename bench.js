function benchmark() {
  const input = document.querySelector("input");
  // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  ).set;

  runOnce().then(console.log);

  async function runOnce() {
    inputClear();
    await waitForIdle();
    const start = performance.now();
    inputChar("b");
    await sleep(100);
    inputChar("a");
    await sleep(100);
    inputChar("l");
    await sleep(100);
    inputChar("l");
    await waitForIdle();
    const end = performance.now();
    return end - start;
  }

  function inputChar(char) {
    nativeInputValueSetter.call(input, input.value + char);
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

  function sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }

  function waitForIdle() {
    return new Promise((resolve) => {
      requestIdleCallback(resolve);
    });
  }
}
benchmark();
