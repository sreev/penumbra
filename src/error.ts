import { getWorkerID } from './worker-id';

/** Penumbra error class */
export class PenumbraError extends Error {
  /** The download URL or job ID throwing an error */
  public id: string | number;

  /** The worker ID associated with this error */
  public worker: number | null;

  /** Extend new Error */
  constructor(error: string | Error, id: string | number) {
    if (typeof error === 'string') {
      super(error);
    } else {
      const { message } = error;
      super(message);
      Object.keys(error).forEach((key) => {
        if (key !== 'message') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this as any)[key] = (error as any)[key];
        }
      });
    }
    this.id = id;
    this.worker = getWorkerID();
    this.name = 'PenumbraError';
  }

  /** Error name */
  get [Symbol.toStringTag](): string {
    return this.name;
  }
}
