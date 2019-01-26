import { Collectable } from "./Collectable";

export class Memory extends Collectable {
  constructor({ scene, x, y }) {
    console.log("memory constructor scene");
    super({ scene, x, y, key: "memory" });
  }
}
