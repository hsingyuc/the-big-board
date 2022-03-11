import React from 'react';
import {act, render, fireEvent, screen} from '@testing-library/react';
import App from './App';

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
		{
			'1. symbol': 'AAPL',
			'2. name': 'Apple Inc',
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

const quoteResult = {
	'Global Quote': {
		'01. symbol': 'PFE',
		'02. open': '48.3050',
		'03. high': '49.2900',
		'04. low': '48.0500',
		'05. price': '49.2000',
		'06. volume': '24218483',
		'07. latest trading day': '2022-03-10',
		'08. previous close': '48.7500',
		'09. change': '0.4500',
		'10. change percent': '0.9231%'
	}
};

// Mock the charts since context does not work in charts.js during tests.
jest.mock( './StockChart/StockChart', () => ( { StockChart: () => 'mocked chart' } ) );

describe( 'App', () => {
	test( 'should render three empty cards', () => {
		render( <App /> );
		const card = screen.getAllByText( 'Pick an additional stock symbol in the search box above to display stock information' );
		expect( card ).toHaveLength( 3 );
	} );

	test( 'should be able to query', () => {
		render( <App /> );
		const input = screen.getByLabelText( 'Search stocks' );
		expect( input ).not.toHaveAttribute( 'disabled' );
	} );

	beforeEach( () => {
		jest.useFakeTimers();
		jest.spyOn( global, 'fetch' ).mockImplementation( ( url ) => {
			return Promise.resolve( {
				json: () => ( url as string ).indexOf( 'SYMBOL_SEARCH' ) >= 0
					? Promise.resolve( stockResults )
					: Promise.resolve( quoteResult )
			} ) as any;
		}
		);
	} );

	test( 'should be able to query and find options', async () => {
		await act( async () => {
			render( <App /> );
			const input = screen.getByLabelText( 'Search stocks' );
			fireEvent.change( input, {target: {value: 'pfe'}} );
			jest.advanceTimersByTime( 1000 );
		} );
			
		const pfe = screen.getByText( 'Pfizer Inc' );
		expect( pfe ).toBeInTheDocument();
	} );

	test( 'should show the loading spinner while fetching data', async () => {
		await act( async () => {
			render( <App /> );
			const input = screen.getByLabelText( 'Search stocks' );
			fireEvent.change( input, {target: {value: 'pfe'}} );
			jest.advanceTimersByTime( 1000 );
		} );

		jest.spyOn( global, 'fetch' ).mockImplementation( () => {
			return Promise.resolve( {
				json: () => Promise.resolve( {} )
			} ) as any;
		} );

		await act( async() => {
			fireEvent.click( screen.getByText( /Pfizer/i ) );
		} );

		const loading = screen.getByLabelText( /Loading/i );
		expect( loading ).toBeInTheDocument();
	} );

	test( 'should be able to select and render in the card', async () => {
		await act( async () => {
			render( <App /> );
			const input = screen.getByLabelText( 'Search stocks' );
			fireEvent.change( input, {target: {value: 'pfe'}} );
			jest.advanceTimersByTime( 1000 );
		} );

		await act( async () => {
			fireEvent.click( screen.getByText( /Pfizer/i ) );
		} );

		const pfe = screen.getAllByText( /Pfizer/i );
		expect( pfe ).toHaveLength( 2 );
	} );

	test( 'should remove card when remove button is clicked', async () => {
		await act( async () => {
			render( <App /> );
			const input = screen.getByLabelText( 'Search stocks' );
			fireEvent.change( input, {target: {value: 'pfe'}} );
			jest.advanceTimersByTime( 1000 );
		} );

		await act( async () => {
			fireEvent.click( screen.getByText( /Pfizer/i ) );
		} );

		fireEvent.click( screen.getByText( /Remove/i ) );
		const pfe = screen.queryByText( /Pfizer/i );
		expect( pfe ).not.toBeInTheDocument();
	} );

	test( 'should disable input box when there are three stocks selected', async () => {
		render( <App /> );
		const input = screen.getByLabelText( 'Search stocks' );
		
		await act( async () => {
			fireEvent.change( input, {target: {value: 'pfe'}} );
			jest.advanceTimersByTime( 1000 );
		} );
		await act( async () => {
			fireEvent.click( screen.getByText( /Pfizer/i ) );
		} );

		await act( async () => {
			fireEvent.change( input, {target: {value: 'mrna'}} );
			jest.advanceTimersByTime( 1000 );
		} );
		await act( async () => {
			fireEvent.click( screen.getByText( /Moderna/i ) );
		} );
		
		await act( async () => {
			fireEvent.change( input, {target: {value: 'aapl'}} );
			jest.advanceTimersByTime( 1000 );
		} );
		await act( async () => {
			fireEvent.click( screen.getByText( /Apple/i ) );
		} );
		
		expect( input ).toHaveAttribute( 'disabled' );
	} );
} );