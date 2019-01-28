import { t } from 'testcafe';

export async function device(resolution: string, ...expects: Promise<any>[]) {
  const res = resolution.split('x');
  await t.resizeWindow(+res[0], +res[0]);
  for (const expect of expects) {
    await expect;
  }
}

export function expectElement(baseElement: Selector) {
  return new Assert(baseElement)
}

class Assert {
  constructor(private base: Selector) {}

  async leftOf(target: Selector) {
    const targetLeft = await target.getBoundingClientRectProperty('left');
    return await t.expect(this.base.getBoundingClientRectProperty('right')).lt(targetLeft);
  }

  async rightOf(target: Selector) {
    const targetRight = await target.getBoundingClientRectProperty('right');
    return await t.expect(this.base.getBoundingClientRectProperty('left')).gt(targetRight);
  }

  async below(target: Selector) {
    const targetBottom = await target.getBoundingClientRectProperty('bottom');
    return await t.expect(this.base.getBoundingClientRectProperty('top')).gt(targetBottom);
  }

  async above(target: Selector) {
    const targetTop = await target.getBoundingClientRectProperty('top');
    return await t.expect(this.base.getBoundingClientRectProperty('bottom')).lt(targetTop);
  }
}
