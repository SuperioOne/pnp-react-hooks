export class AbortError extends Error {
  constructor() {
    super("Fetch aborted");
    this.name = "AbortError";
  }
}
