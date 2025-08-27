import { makeAutoObservable } from "mobx";

export class Counter {
  private _value = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this._value++;
  }

  decrease() {
    this._value--;
  }

  get() {
    return this._value;
  }
}
