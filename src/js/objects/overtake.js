export class Overtake {
    constructor(overtakeData) {
        this.numberOvertaking = overtakeData["overtaking_driver_number"];
        this.numberOvertaken = overtakeData["overtaken_driver_number"];
        this.date = overtakeData["date"];
    }

    static createOvertakes(overtakesList) {
        let overtakes = [];

        overtakesList.forEach(overtake => {
            overtakes.push(new Overtake(overtake));
        });

        return overtakes;
    }
}