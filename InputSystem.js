class InputSystem {
  /** @type {Phaser.Input.InputPlugin} */
  cursors = null;

  /** @type {Phaser.Input.Keyboard.Key} */
  ok = null;

  okHandle = false;

  /** @type {Phaser.Input.Keyboard.Key} */
  cancel = null;

  /**
   *
   * @param {Phaser.Input.InputPlugin} input
   * @param {string} ok
   * @param {string} cancel
   */
  constructor(input, ok, cancel) {
    this.cursors = input.keyboard.createCursorKeys();
    this.ok = input.keyboard.addKey(ok);
    this.cancel = input.keyboard.addKey(cancel);
  }

  /**
   * Only returns true ONCE when OK key is pressed.
   *
   * @returns True if it is pressed, otherwise false.
   */
  isOkPressed() {
    return Phaser.Input.Keyboard.JustDown(this.ok);
  }

  /**
   * Only returns true ONCE when cancel key is pressed.
   *
   * @returns True if it is pressed, otherwise false.
   */
  isCancelPressed() {
    return Phaser.Input.Keyboard.JustDown(this.cancel);
  }
}

export default InputSystem;
