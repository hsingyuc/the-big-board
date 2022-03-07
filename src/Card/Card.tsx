import React from 'react';
import './Card.scss';

type CardProps = {
	isEmpty?: boolean;
}

export const Card: React.FC<CardProps> = ( {children, isEmpty = false} ) => {
	return (
		<div className={ 'card ' + ( isEmpty ? 'is-empty' : 'has-content' ) }>
			{ children }
		</div>
	);
};