import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {Dropdown} from './Dropdown';

const sampleOptions = [
	{
		symbol: 'PFE',
		name: 'Pfizer Inc',
		type: 'Equity',
		region: 'United States',
		marketOpen: '09:30',
		marketClose: '16:00',
		timezone: 'UTC-04',
		currency: 'USD',
		matchScore: '1.0000'
	},
	{
		symbol: 'MRNA',
		name: 'Moderna Inc',
		type: 'Equity',
		region: 'United States',
		marketOpen: '09:30',
		marketClose: '16:00',
		timezone: 'UTC-04',
		currency: 'USD',
		matchScore: '1.0000'
	}
];

describe( 'Dropdown', () => {
	test( 'should render options', () => {
		render( <Dropdown
			options={ sampleOptions }
			onSelect={ jest.fn() }
			selected={ [] }
		/> );
		const mrna = screen.getByText( 'Moderna Inc' );
		expect( mrna ).toBeInTheDocument();
		const pfe = screen.getByText( 'Pfizer Inc' );
		expect( pfe ).toBeInTheDocument();
	} );
	
	test( 'should call onSelect prop when clicked', () => {
		const mockOnSelect = jest.fn();
		render( <Dropdown
			options={ sampleOptions }
			onSelect={ mockOnSelect }
			selected={ [] } /> );
		fireEvent.click( screen.getByText( /Pfizer/i ) );
		expect( mockOnSelect ).toHaveBeenCalledTimes( 1 );
		expect( mockOnSelect ).toBeCalledWith( sampleOptions[0] );
	} );
	
	test( 'should not allow select if disabled', () => {
		const mockOnSelect = jest.fn();
		render( <Dropdown
			isDisabled={true}
			options={ sampleOptions }
			onSelect={ mockOnSelect }
			selected={ [] } /> );
		fireEvent.click( screen.getByText( /Pfizer/i ) );
		expect( mockOnSelect ).toHaveBeenCalledTimes( 0 );
	} );
	
	test( 'should disable the selected buttons', () => {
		const mockOnSelect = jest.fn();
		render( <Dropdown
			options={ sampleOptions }
			onSelect={ mockOnSelect }
			selected={ [sampleOptions[1]] } /> );
		fireEvent.click( screen.getByText( /Moderna Inc/i ) );
		expect( mockOnSelect ).toHaveBeenCalledTimes( 0 );
		fireEvent.click( screen.getByText( /Pfizer/i ) );
		expect( mockOnSelect ).toHaveBeenCalledTimes( 1 );
	} );
	
} );