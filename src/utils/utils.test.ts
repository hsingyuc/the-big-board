import { debounce, sanitizeProperties, sanitizeDecimal, sanitizePercentage } from './utils';
/**
 * Test sanitize properties
 */
test( 'should remove the number', () => {
	const obj = sanitizeProperties( {'01. symbol': 'pfe', '02. name': 'Pfizer'} );
	expect( obj ).toEqual( {'symbol': 'pfe', 'name': 'Pfizer'} );
} );

test( 'should be camel case when object property is more than one word', () => {
	const obj = sanitizeProperties( {'01. symbol': 'pfe', '02. latest trading day': '2022-03-08'} );
	expect( obj ).toEqual( {'symbol': 'pfe', 'latestTradingDay': '2022-03-08'} );
} );

/**
 * Test debounce
 */
describe( 'debounce', () => {
	beforeEach( () => {
		jest.useFakeTimers();
		jest.spyOn( global, 'setTimeout' );
	} );
  
	afterEach( () => {
		jest.useRealTimers();
	} );

	test( 'should only call function 1 time', () => {
		const mockFunc = jest.fn();
		const debouncedFunc = debounce( mockFunc, 500 );
		debouncedFunc();
		debouncedFunc();
	
		jest.advanceTimersByTime( 500 );

		expect( setTimeout ).toHaveBeenCalledTimes( 2 );
		expect( mockFunc ).toHaveBeenCalledTimes( 1 );
	} );

} );

/**
 * Test sanitization methods
 */
describe( 'sanitize methods', () => {
	test( 'should round down to 2 decimals', () => {
		const num = sanitizeDecimal( '10.24667' );
		expect( num ).toBe( 10.25 );
	} );

	test( 'should add decimal places',() => {
		const num = sanitizeDecimal( '10' );
		expect( num ).toBe( 10.00 );
	} );

	test( 'should remove percent sign',() => {
		const num = sanitizeDecimal( '23.89%' );
		expect( num ).toBe( 23.89 );
	} );

	test( 'should format percentage',() => {
		const num = sanitizePercentage( '82.1915' );
		expect( num ).toBe( '82.19%' );
	} );

	test( 'should remove minus symbol',() => {
		const num = sanitizePercentage( '-5.2678' );
		expect( num ).toBe( '5.27%' );
	} );

} );