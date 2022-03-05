/**
 * Updates an object keys to camel case properties
 */
export const sanitizeProperties = ( data: { [key: string]: any } ) => {
	const newData: {[key: string]: any } = {};
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
