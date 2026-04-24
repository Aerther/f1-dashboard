export class Race {
    constructor(raceData) {
        this.key = raceData["session_key"];
        this.dateStart = raceData["date_start"];
        this.dateEnd = raceData["date_end"];
    }

    static createRace(raceData) {
        return new Race(raceData);
    }
}