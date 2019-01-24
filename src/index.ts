import { t } from 'testcafe';

class Elmt {
    constructor(private base: Selector) {}

    async leftOf(target: Selector) {
        return t.expect(this.base.getBoundingClientRectProperty('right')).lt((await target.getBoundingClientRectProperty('left')));
    }

    async rightOf(target: Selector) {
        return t.expect(this.base.getBoundingClientRectProperty('left')).gt((await target.getBoundingClientRectProperty('right')));
    }

    async below(target: Selector) {
        return t.expect(this.base.getBoundingClientRectProperty('top')).gt((await target.getBoundingClientRectProperty('bottom')));
    }

    async above(target: Selector) {
        return t.expect(this.base.getBoundingClientRectProperty('bottom')).lt((await target.getBoundingClientRectProperty('top')));
    }

}

export function expectElement(baseElement: Selector) {
    return new Elmt(baseElement);
}
