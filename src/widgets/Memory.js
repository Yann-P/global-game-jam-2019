import { Collectable } from "./Collectable";

export class Memory extends Collectable {
  constructor({ scene, x, y }) {
    super({ scene, x, y, key: "memory" });
  }
}
