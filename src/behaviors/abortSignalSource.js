export class AbortSignalSource {
  /**
   * @type{AbortController}
   * @private
   */
  abortController;

  constructor() {
    this.abortController = new AbortController();
  }

  /** @returns {AbortSignal} **/
  get signal() {
    return this.abortController.signal;
  }

  abort() {
    this.abortController.abort();
  }

  reset() {
    this.abortController = new AbortController();
  }
}
