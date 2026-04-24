export class Driver {
    constructor(driverData) {
        // Driver Data
        this.fullName = driverData["full_name"].toLowerCase();
        this.number = driverData["driver_number"];
        this.urlPhoto = driverData["headshot_url"];

        // Team Data
        this.teamColor = driverData["team_colour"];
        this.teamName = driverData["team_name"];

        this.startingGrid = null;

        this.position = 0;

        this.fullName = this.capitalizeName(this.fullName);
    }

    static createDrivers(driversList) {
        let drivers = [];

        driversList.forEach(driver => {
            drivers.push(new Driver(driver));
        });

        return drivers;
    }

    capitalizeName(name) {
        return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }
}