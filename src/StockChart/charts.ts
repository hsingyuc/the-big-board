import { EpsData, Stock } from '../utils/types';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Annual EPS',
		},
	},
	parsing: {
		xAxisKey: 'date',
		yAxisKey: 'value'
	},
	scales: {
		x: {
			type: 'time' as const,
			time: {
				parser: 'YYYY-MM-DD',
			}
		}
	}
};

const colors = [
	{
		borderColor: 'rgb(255, 99, 132)',
		backgroundColor: 'rgba(255, 99, 132, 0.5)'
	},
	{
		borderColor: 'rgb(66, 151, 255)',
		backgroundColor: 'rgba(81, 104, 188, 0.5)'
	},
	{
		borderColor: 'rgb(66, 255, 195)',
		backgroundColor: 'rgba(53, 201, 154, 0.5)'
	},
];

export const getDataSets = ( epsData: EpsData, selectedStocks: Stock[] ) => {
	return selectedStocks.map( ( stock, i ) => {
		const { name, symbol } = stock;
		const color = colors[ i ];

		return {
			label: name,
			data: epsData[symbol],
			borderColor: color.borderColor,
			backgroundColor: color.backgroundColor,
		};
	} );
};
