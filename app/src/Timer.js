import Observable from './Observable';

const Timer = () => {
	const { addObserver, notify, removeObserver } = Observable();
	let gameTimer = null;

	const start = (interval) => {
		console.log('starting');

		if (gameTimer) {
			console.warn('already running');
			stop();
		}

		gameTimer = setInterval(() => {
			notify();
		}, interval);
	};

	const stop = () => {
		console.log('stopping');
		clearInterval(gameTimer);
		gameTimer = null;
	};

	return Object.freeze({
		addObserver,
		removeObserver,
		start,
		stop,
	});
};

export default Timer;
