export class Qualy {
    constructor(qualyData) {
        this.key = qualyData["session_key"];
        this.dateStart = qualyData["date_start"];
        this.dateEnd = qualyData["date_end"];
    }

    static createQualy(qualyData) {
        return new Qualy(qualyData);
    }
}