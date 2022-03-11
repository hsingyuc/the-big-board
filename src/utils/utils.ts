/**
 * Updates an object keys to camel case properties
 */
export const sanitizeProperties = ( data: { [key: string]: string } ) => {
	const newData: {[key: string]: string } = {};
	Object.keys( data ).forEach( key => {
		const newKey = key.split( ' ' ).map( ( text,i ) => {
			if ( i === 0 ) {
				return '';
			}
			if ( i === 1 ) {
				return text;
			}
			return text[0].toUpperCase() + text.slice( 1 );
		} ).join( '' );
		newData[newKey] = data[key];
	} );
	return newData;
};

/**
 * Returns a new debounced function
 */
export const debounce = ( func:( ...args: string[] )=>void, delay = 500 ) => {
	let timer: ReturnType<typeof setTimeout>;
	return function( ...args: string[] ) {
		clearTimeout( timer );
		timer = setTimeout( () => {
			func( ...args );
		}, delay );
	};
};

/**
 * Changes a number to 2 decimal places
 */
export const sanitizeDecimal = ( data:string ): number => {
	return parseFloat( parseFloat( data ).toFixed( 2 ) );
};

/**
 * Sanitizes decimal and adds % sign
 */
export const sanitizePercentage = ( data:string ) => {
	return Math.abs( sanitizeDecimal( data ) ) + '%';
};