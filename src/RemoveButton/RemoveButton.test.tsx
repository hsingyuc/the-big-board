import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {RemoveButton} from './RemoveButton';

test( 'should call onSelect prop when clicked', () => {
	const mockOnSelect = jest.fn();
	render( <RemoveButton
		onRemove={ mockOnSelect }
	/> );
	fireEvent.click( screen.getByText( /Remove/i ) );
	expect( mockOnSelect ).toHaveBeenCalledTimes( 1 );
} );