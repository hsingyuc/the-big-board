import { sanitizeProperties } from './utils';
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
