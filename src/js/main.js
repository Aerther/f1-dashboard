import { Driver } from "./objects/driver.js";
import { StartingGrid } from "./objects/startinggrid.js";
import { Meeting } from "./objects/meeting.js";
import { Overtake } from "./objects/overtake.js";
import { Race } from "./objects/race.js";
import { loadDrivers, loadMeeting, loadStartingGrid, loadOvertakes, loadRace } from "./utils/calls.js";

let drivers = [];
let overtakes = [];
let race = null;
let meeting = null;
let driversTable = document.querySelector(".table-drivers tbody");

function setStartingGrid() {
    drivers.sort(function(a, b) {
        let posA = a.position;
        let posB = b.position;
        
        return posA - posB;
    });

    driversTable.textContent = "";

    drivers.forEach(driver => {
        let tr = createElement("tr");
        tr.classList.add("driver");

        let columns = {
            "position": driver.position,
            "name": driver.fullName,
            "number": driver.number,
            "team": driver.teamName
        }

        Object.keys(columns).forEach(key => {
            let td = createElement("td");
            td.textContent = columns[key];
            td.classList.add(key);

            td.style.backgroundColor = "#" + driver.teamColor;

            tr.appendChild(td);
        });

        driversTable.appendChild(tr);
    });

    console.log("All drivers into the Starting Grid")
}

function updateMeetingData() {
    let name = document.querySelector(".meeting .name");
    let year = document.querySelector(".meeting .year");
    let circuit = document.querySelector(".meeting .circuit");
    let country = document.querySelector(".meeting .country");
    let countryImage = document.querySelector(".meeting img");

    countryImage.src = meeting.countryFlag;
    countryImage.alt = meeting.country + " Flag";

    countryImage.textContent = meeting.country;
    name.textContent = "Name: " + meeting.name;
    year.textContent = "Year: " + meeting.year;
    circuit.textContent = "Circuit: " + meeting.circuitName;
}

function updateGrid() {
    let overtake = overtakes[0];

    console.log(overtake);

    let driverOvertaking = drivers.find(driver => driver.number == overtake.numberOvertaking);
    let driverOvertaken = drivers.find(driver => driver.number == overtake.numberOvertaken);

    if(driverOvertaken == null || driverOvertaking == null) {
        overtakes = overtakes.slice(1);
        return;
    }

    let positionOvertaking = driverOvertaking.position;
    driverOvertaking.position = driverOvertaken.position;
    driverOvertaken.position = positionOvertaking;

    overtakes = overtakes.slice(1);

    if(overtakes.length == 0) {
        clearInterval(interval);
    }
}

function createElement(element) {
    return document.createElement(element);
}

let session_id = 9627; // Brazil 2024 Qualy

async function init() {
    meeting = Meeting.createMeeting( await loadMeeting("Brazil", "2024") );
    race = Race.createRace( await loadRace(meeting) );

    let session_race = race.key;

    overtakes = Overtake.createOvertakes( await loadOvertakes(session_race));
    drivers = Driver.createDrivers( await loadDrivers(session_id) );
    StartingGrid.compositeStartingGrid( drivers, await loadStartingGrid(session_id) );
}

await init();

updateMeetingData();
setStartingGrid();

console.log(overtakes)

let interval = setInterval(() => {
    updateGrid();
    setStartingGrid();
}, 500)