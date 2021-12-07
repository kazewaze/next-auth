export default function Counter(count) {
  this._count = count;
  this._limit = 5;

  this.increment = () => {
    this._count++;
  };
}