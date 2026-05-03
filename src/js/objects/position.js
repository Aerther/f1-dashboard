export class Position {
    constructor(positionData) {
        this.position = positionData["position"];
        this.date = positionData["date"];
        this.driverNumber = positionData["driver_number"];
    }

    static createPositions(positionsList) {
        let positions = [];

        positionsList.forEach(position => {
            positions.push(new Position(position));
        });

        return positions;
    }
}