import { v4 } from "uuid";

export function createUuid() {
  return v4();
}

// no op function to avoid redundant multiple no op function creation
export function noOp() {}