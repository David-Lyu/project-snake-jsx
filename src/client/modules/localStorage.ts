export default class LocalStorageAdapter {

	private name = "highscore";
	constructor() {
		if (!LocalStorageAdapter._instance) {
			LocalStorageAdapter._instance = this;
		}
		return LocalStorageAdapter._instance;
	}

	static GetInstance() {
		return this._instance;
	}

	getHighscore(): number {
		let score = Number(window.localStorage.getItem(this.name));
		return isNaN(score) ? 0 : score;
	}
	updateHighscore(score: number) {
		if (score > this.getHighscore()) {
			window.localStorage.setItem(this.name, score.toString())
		}
	}

}
