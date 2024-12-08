import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
    it('converts paise to rupees', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds off to the nearest number at right', () => {
        expect(formatCurrency(1996.5)).toEqual('19.97');
    });
    it('rounds off to the nearest number at left', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });
    it('works with negative numbers', () => {
        expect(formatCurrency(-1000)).toEqual('-10.00');
    })
});