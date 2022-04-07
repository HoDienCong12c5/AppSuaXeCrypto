export default class EtherGasStation {
  static getGasPrice() {
    const possible = [300000000];
    const results = possible.sort( () => 0.5 - Math.random() );
    return results[0];
  }
}
