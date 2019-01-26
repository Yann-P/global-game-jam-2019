import { Collectable } from "./Collectable";

export class Memory extends Collectable {
  constructor({ scene, x, y, fallSpeed, radius }) {
    super({ scene, x, y, fallSpeed, radius, key: "memory" });
  }
}
