import { t } from 'testcafe';

export async function device(resolution: string, ...expects: Promise<any>[]) {
  const res = resolution.split('x');
  await t.resizeWindow(+res[0], +res[0]);
  for (const prom of expects) {
    await prom;
  }
  // TODO: return only the last promise
}

export function expectElement(baseElement: Selector) {
  return new Assert(baseElement)
}

class Assert {
  constructor(private base: Selector) {}

  async leftOf(target: Selector) {
    const left = await target.getBoundingClientRectProperty('left');
    return await t.expect(this.base.getBoundingClientRectProperty('right')).lt(left);
  }

  async rightOf(target: Selector) {
    const right = await target.getBoundingClientRectProperty('right');
    return await t.expect(this.base.getBoundingClientRectProperty('left')).gt(right);
  }

  async below(target: Selector) {
    const bottom = await target.getBoundingClientRectProperty('bottom');
    return await t.expect(this.base.getBoundingClientRectProperty('top')).gt(bottom);
  }

  async above(target: Selector) {
    const top = await target.getBoundingClientRectProperty('top');
    return await t.expect(this.base.getBoundingClientRectProperty('bottom')).lt(top);
  }
}
