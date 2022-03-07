import React from 'react';

type RemoveButtonProps = {
	onRemove: () => void;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ( {onRemove} ) => {
	return(
		<button
			type='button'
			className='remove-button'
			onClick={()=>onRemove()}
		>
			Remove
		</button>
	);
};