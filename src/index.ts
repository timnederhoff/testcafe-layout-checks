import { t } from 'testcafe';

class Dev {

  constructor(private resolution: string) {
  }

  expectElement(baseElement: Selector) {
    return new Elmt(baseElement, this.resolution);
  }
}

class Elmt {

  width: number;
  height: number;

  constructor(private base: Selector, private resolution: string) {
    const res = resolution.split('x');
    this.width = +res[0];
    this.height = +res[1];
  }

  async leftOf(target: Selector) {
    return t
      .resizeWindow(this.width, this.height)
      .expect(this.base.getBoundingClientRectProperty('right')).lt((await target.getBoundingClientRectProperty('left')));
  }

  async rightOf(target: Selector) {
    return t
      .resizeWindow(this.width, this.height)
      .expect(this.base.getBoundingClientRectProperty('left')).gt((await target.getBoundingClientRectProperty('right')));
  }

  async below(target: Selector) {
    return t
      .resizeWindow(this.width, this.height)
      .expect(this.base.getBoundingClientRectProperty('top')).gt((await target.getBoundingClientRectProperty('bottom')));
  }

  async above(target: Selector) {
    return t
      .resizeWindow(this.width, this.height)
      .expect(this.base.getBoundingClientRectProperty('bottom')).lt((await target.getBoundingClientRectProperty('top')));
  }

}

export function device(resolution: string) {
  return new Dev(resolution);
}
