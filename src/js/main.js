import { Driver } from "./objects/driver.js";
import { StartingGrid } from "./objects/startinggrid.js";
import { Meeting } from "./objects/meeting.js";
import { Overtake } from "./objects/overtake.js";
import { Race } from "./objects/race.js";
import { Qualy } from "./objects/qualy.js";
import { Position } from "./objects/position.js";
import { loadDrivers, loadMeeting, loadStartingGrid, loadOvertakes, loadRace, loadQualy, loadPositions } from "./utils/calls.js";

let drivers = [];
let overtakes = [];
let positions = [];
let race = null;
let meeting = null;
let qualy = null;
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
    let position = positions[0];

    console.log(position);

    let driverOvertaking = drivers.find(driver => driver.number == position.driverNumber);
    let driverOvertaken = drivers.find(driver => driver.position == position.position);

    if(driverOvertaken == null || driverOvertaking == null) {
        positions = positions.slice(1);
        return;
    }

    let positionOvertaking = driverOvertaking.position;
    driverOvertaking.position = driverOvertaken.position;
    driverOvertaken.position = positionOvertaking;

    positions = positions.slice(1);

    if(positions.length == 0) {
        clearInterval(interval);
    }
}

function createElement(element) {
    return document.createElement(element);
}

async function init() {
    meeting = Meeting.createMeeting( await loadMeeting("Brazil", "2025") );

    qualy = Qualy.createQualy( await loadQualy(meeting) );
    race = Race.createRace( await loadRace(meeting) );

    let session_race = race.key;
    let session_qualy = qualy.key;

    overtakes = Overtake.createOvertakes( await loadOvertakes(session_race) );
    drivers = Driver.createDrivers( await loadDrivers(session_qualy) );
    positions = Position.createPositions( await loadPositions(session_race) );
    StartingGrid.compositeStartingGrid( drivers, await loadStartingGrid(session_qualy) );
}

function orderPositions() {
    positions.sort((positionA, positionB) => {
        let dateA = new Date(positionA.date);
        let dateB = new Date(positionB.date);

        return dateA - dateB;
    });
}

await init();

updateMeetingData();
setStartingGrid();
orderPositions();

let interval = setInterval(() => {
    updateGrid();
    setStartingGrid();
}, 100)