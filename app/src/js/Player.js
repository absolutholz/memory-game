export default function Player (id, name = 'Player') {
	this.id = id;
	this.name = name;
	this.cards = [];
	this.avatar = {
		onSurfaceColor: 'var(--on-primary)',
		surfaceColor: 'var(--primary)',
	};
}
