export type Stock = {
	symbol: string;
	name: string;
	type: string;
	region: string;
	marketOpen: string;
	marketClose: string;
	timezone: string;
	currency: string;
	matchScore: string;
}

export type StockQuote = {	
	symbol: string | null;
	open: string | null;
	high: string | null;
	low: string | null;
	price: string | null;
	volume: string | null;
	latestTradingDay: string | null;
	previousClose: string | null;
	change: string | null;
	changePercent: string | null;
}

export type StockQuotes = {
	[symbol: string]: StockQuote;
}

export type StockResult = {
	'1. symbol': string;
	'2. name': string;
	'3. type': string;
	'4. region': string;
	'5. marketOpen': string;
	'6. marketClose': string;
	'7. timezone': string;
	'8. currency': string;
	'9. matchScore': string;
}
