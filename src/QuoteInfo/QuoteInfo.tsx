import React from 'react';
import { StockQuote } from '../utils/types';

export type QuoteInfoProps = {
	quote: StockQuote;
}

export const QuoteInfo: React.FC<QuoteInfoProps> = ( {quote} ) => {
	const { price, high, low, changePercent } = quote;
	
	return (
		<div className='quote-info'>
			{ price && <div className='quote-info__text'>$ { price }</div> }
			{ changePercent && <div className={'quote-info__text' }>
				{ changePercent }
			</div> }
			<h4>Stats</h4>
			<div className='quote-info__stats'>
				{ high && <div className='quote-info__text'>
					<span className="quote-info__label">High</span>
					<span className="quote-info__stat">{ high }</span>
				</div> }
				{ low && <div className='quote-info__text'>
					<span className="quote-info__label">Low</span>
					<span className="quote-info__stat">{ low }</span>
				</div> }
			</div>
		</div>
	);
};