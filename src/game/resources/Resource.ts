export class Resource {
  private _quantity: number;

  constructor(
    readonly name: string,
    quantity: number,
  ) {
    this._quantity = quantity;
  }

  getQuantity() {
    return this._quantity;
  }

  add(quantity: number) {
    this._quantity += quantity;
  }
  
  remove(quantity: number) {
    this._quantity -= quantity;
  }
}