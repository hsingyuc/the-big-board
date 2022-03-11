import React, { useEffect, useState } from 'react';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import { AnnualEarnings, EpsData, Stock } from '../utils/types';
import './StockChart.scss';
import { getDataSets, options } from './charts';

type StockChartProps = {
	selectedStocks: Stock[];
}

export const StockChart:React.FC<StockChartProps> = ( { selectedStocks } ) => {
	const [epsData, setEpsData] = useState<EpsData>( {} );

	useEffect( ()=>{
		if ( selectedStocks.length ) {
			fetchData();
		}
	},[selectedStocks] );

	const fetchData = () => {
		selectedStocks.forEach( ( selectedStock ) => {
			const stock = selectedStock.symbol;
			if ( ! epsData[ stock ] ) {
				fetch( `https://www.alphavantage.co/query?function=EARNINGS&symbol=${stock}&apikey=${process.env.REACT_APP_API_KEY}` )
					.then( ( response )=>response.json() )
					.then( ( json )=>{
						if ( ! json['annualEarnings'] ) {
							return;
						}

						const newEpsData = {...epsData};
						const data = json['annualEarnings'];
						const sanitizedData = data.map( ( earning: AnnualEarnings ) => {
							return {
								date: earning.fiscalDateEnding,
								value: parseFloat( earning.reportedEPS ),
							};
						} );
						newEpsData[stock] = sanitizedData;
						setEpsData( newEpsData );
					} )
					.catch( ( error: Error )=> {
						console.log( `Error in fetch: ${error.message}` );
					} );
			}
		} );
	};

	if ( ! selectedStocks.length ) {
		return null;
	}

	return (
		<div className="stock-chart">
			<Line
				options={options}
				data={
					{
						datasets: getDataSets( epsData, selectedStocks ),
					}
				}
			/>
		</div>
	);
};

