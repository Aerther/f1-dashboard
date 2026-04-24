export class StartingGrid {
    constructor(startingGridData) {
        this.driverNumber = startingGridData["driver_number"];
        this.position = startingGridData["position"];
        this.lapDuration = startingGridData["lap_duration"];
    }

    static compositeStartingGrid(driversList, startingGridList) {
        driversList.forEach(driver => {
            let grid = startingGridList.find(grid => grid.driver_number == driver.number);

            driver.startingGrid = new StartingGrid(grid);
            driver.position = driver.startingGrid.position;
        });

        console.log("Starting Grid are composite into the Drivers");
    }
}