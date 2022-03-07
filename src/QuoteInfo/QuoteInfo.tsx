import React from 'react';
import { StockQuote } from '../utils/types';
import './QuoteInfo.scss';
import { sanitizeDecimal, sanitizePercentage } from '../utils/utils';

export type QuoteInfoProps = {
	quote: StockQuote;
}

export const QuoteInfo: React.FC<QuoteInfoProps> = ( {quote} ) => {
	const { price, high, low, changePercent } = quote;
	
	return (
		<div className='quote-info'>
			{ price && <div className='quote-info__text'>$ { sanitizeDecimal( price ) }</div> }
			{ changePercent && <div className={'quote-info__text' }>
				{ sanitizePercentage( changePercent ) }
			</div> }
			<h4>Stats</h4>
			<div className='quote-info__stats'>
				{ high && <div className='quote-info__text'>
					<span className="quote-info__label">High</span>
					<span className="quote-info__stat">{ sanitizeDecimal( high ) }</span>
				</div> }
				{ low && <div className='quote-info__text'>
					<span className="quote-info__label">Low</span>
					<span className="quote-info__stat">{ sanitizeDecimal( low ) }</span>
				</div> }
			</div>
		</div>
	);
};