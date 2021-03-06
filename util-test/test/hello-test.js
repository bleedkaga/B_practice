const assert = require('assert')
const sum = require('../hello')

describe('#hello.js', () => {
	describe('#sum()', () => {
		before( () => {
			console.log('before')
		})

		after( () => {
			console.log('after:')
		})

		beforeEach( () => {
			console.log(' before each')
		})

		afterEach( () => {
			console.log(' after each')
		})
		it('sum() should return 0', () => {
			assert.strictEqual(sum(1), 1)
		})
		it('sum(1) should return 1', () => {
        assert.strictEqual(sum(1), 1);
    });

    it('sum(1, 2) should return 3', () => {
        assert.strictEqual(sum(1, 2), 3);
    });

    it('sum(1, 2, 3) should return 6', () => {
        assert.strictEqual(sum(1, 2, 3), 6);
    });
	})
})