import React from 'react';
import { Stock } from '../utils/types';

export type DropdownProps = {
	options: Stock[];
}

export const Dropdown: React.FC<DropdownProps> = ( {options} ) =>{
	return(
		<ul className='options'>
			{ options.map( option=>{
				return(
					<li key={ option.symbol } className='option'>
						<button>{ option.name }</button>
					</li>
				);
			} ) }
		</ul>
	); 
	
};