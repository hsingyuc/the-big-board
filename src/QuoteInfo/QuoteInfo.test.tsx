import React from 'react';
import {QuoteInfo} from './QuoteInfo';
import {render, screen} from '@testing-library/react';
import { StockQuote } from '../utils/types';

const quote = {	
	symbol: 'PFE',
	open: '47.5800',
	high: '48.4182',
	low: '46.4650',
	price: '47.4400',
	volume: '31343318',
	latestTradingDay: '2022-03-08',
	previousClose: '47.9800',
	change: '-0.5400',
	changePercent: '-1.1255%'
} as StockQuote;

describe( 'QuoteInfo', () => {
	test( 'should render content', ()=>{
		render( <QuoteInfo quote={quote}/> );

		const price = screen.getByText( /47\.44/ );
		expect( price ).toBeInTheDocument();
		const dailyHigh = screen.getByText( /48\.42/ );
		expect( dailyHigh ).toBeInTheDocument();
		const dailyLow = screen.getByText( /46\.47/ );
		expect( dailyLow ).toBeInTheDocument();
		const change = screen.getByText( '1.13%' );
		expect( change ).toBeInTheDocument();
	} );

	test( 'should not render missing content', ()=>{
		quote.price = null;
		render( <QuoteInfo quote={quote}/> );

		const price = screen.queryByText( /47\.44/ );
		expect( price ).not.toBeInTheDocument();
		const dailyHigh = screen.queryByText( /48\.42/ );
		expect( dailyHigh ).toBeInTheDocument();
	} );
} );