import React from 'react';
import {act, render, fireEvent, screen} from '@testing-library/react';
import {Search} from './Search';

const stockResults = {
	bestMatches: [
		{
			'1. symbol': 'MRNA',
			'2. name': 'Moderna Inc',
			'3. type': 'Equity',
			'4. region': 'United States',
			'5. marketOpen': '09:30',
			'6. marketClose': '16:00',
			'7. timezone': 'UTC-04',
			'8. currency': 'USD',
			'9. matchScore': '1.0000'
		},
		{
			'1. symbol': 'PFE',
			'2. name': 'Pfizer Inc',
			'3. type': 'Equity',
			'4. region': 'United States',
			'5. marketOpen': '09:30',
			'6. marketClose': '16:00',
			'7. timezone': 'UTC-04',
			'8. currency': 'USD',
			'9. matchScore': '1.0000'
		},
	]
};

describe( 'Search', () => {
	beforeEach( () => {
		jest.useFakeTimers();
		jest.spyOn( global, 'fetch' ).mockImplementation( () =>
			Promise.resolve( {
				json: () => Promise.resolve( stockResults )
			} ) as any
		);
	} );

	test( 'should render options when query is given', async () => {
		await act( async () => {
			render( <Search 
				onSelect={ jest.fn() }
				selected={ [] }
			/> );
			
			const input = screen.getByLabelText( 'Search stocks' );
			fireEvent.change( input, {target: {value: 'pfe'}} );
			jest.advanceTimersByTime( 1000 );
		} );
	
		const pfe = screen.getByText( 'Pfizer Inc' );
		expect( pfe ).toBeInTheDocument();
	} );

	test( 'should not render options when query is empty string', async () => {
		await act( async () => {
			render( <Search 
				onSelect={ jest.fn() }
				selected={ [] }
			/> );
			
			const input = screen.getByLabelText( 'Search stocks' );
			fireEvent.change( input, {target: {value: ''}} );
			jest.advanceTimersByTime( 1000 );
		} );
	
		const pfe = screen.queryByText( 'Pfizer Inc' );
		expect( pfe ).not.toBeInTheDocument();
	} );

	test( 'should disable input box', () => {
		render( <Search 
			onSelect={ jest.fn() }
			selected={ [] }
			isDisabled={ true }
		/> );
		const input = screen.getByLabelText( 'Search stocks' );
		expect( input ).toHaveAttribute( 'disabled' );
	} );

	test( 'should not render options when disabled', async () => {
		await act( async () => {
			const { rerender } = render( <Search 
				onSelect={ jest.fn() }
				selected={ [] }
			/> );
			
			const input = screen.getByLabelText( 'Search stocks' );
			fireEvent.change( input, {target: {value: 'pfe'}} );
			jest.advanceTimersByTime( 1000 );

			rerender( <Search 
				onSelect={ jest.fn() }
				selected={ [] }
				isDisabled={ true }
			/> );
		} );
	
		const pfe = screen.queryByText( 'Pfizer Inc' );
		expect( pfe ).not.toBeInTheDocument();
	} );
} );
