import {formatCurrency} from '../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
    it('converts paise to rupees', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds off to the nearest number', () => {
        expect(formatCurrency(1996.5)).toEqual('19.97');
    });
});