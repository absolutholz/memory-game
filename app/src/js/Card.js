export default function Card (id, name) {
	this.id = id;
	this.name = name;
	this.faceImage = {
		src: '',
		type: 'text',
	};
	this.color = 'inherit';
}

export const colors = [
	'#b71c1c',
	'#880e4f',
	'#4a148c',
	'#311b92',
	'#1a237e',
	'#0d47a1',
	'#01579b',
	'#006064',
	'#004d40',
	'#1b5e20',
	'#33691e',
	'#827717',
	'#f57f17',
	'#ff6f00',
	'#e65100',
	'#bf360c',
	'#3e2723',
	'#212121',
	'#263238',
	'firebrick',
	'chocolate',
	'dodgerblue',
	'rebeccapurple',
	'forestgreen',
	'teal',
	'tomato',
	'limegreen',
];
