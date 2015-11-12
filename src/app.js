import Rx from 'rx';
import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';

function main(responses) {
	// Listen for clicks on update button
	let click$ = responses.DOM.select('.container').events('click');

	// Pick up request response
	let data$ = responses.HTTP
		.mergeAll()
		.map(res => res.body);

	// Create a stream of quotes, emitting when
	let quote$ = click$.withLatestFrom(data$, (event, quotes) => {
		return quotes[Math.floor(Math.random() * quotes.length)];
	}).startWith('');

	return {
		DOM: quote$.map(quote =>
			h('div.container', [
				h('div#quote', quote),
			])
		).skip(1), // Skip first update to use server rendered html

		// Do a inital request for data
		HTTP: Rx.Observable.just({
			url: 'data.json',
			method: 'GET'
		})
	}
}

Cycle.run(main, {
	DOM: makeDOMDriver('.container'),
	HTTP: makeHTTPDriver()
})
