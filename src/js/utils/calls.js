export async function callApi(path) {
    await waitTime(1000);

    let url = "https://api.openf1.org/v1/";

    let response = await fetch(url + path);

    let data = await response.json();

    console.log("Url + Path: " + url + path)

    return data;
}

export async function loadDrivers(sessionId) {
    let path = `drivers?session_key=${sessionId}`;
    
    let driversList = await callApi(path);
    
    console.log("Drivers loaded");

    return driversList;
}

export async function loadStartingGrid(sessionId) {
    let path = `starting_grid?session_key=${sessionId}`;

    let startingGrid = await callApi(path);

    console.log("Starting Grid loaded");

    return startingGrid;
}

export async function loadMeeting(countryName, year) {
    let path = `meetings?year=${year}&country_name=${countryName}`;

    let meeting = await callApi(path);

    console.log("Meeting loaded");

    return meeting[0];
}

export async function loadOvertakes(sessionId) {
    let path = `overtakes?session_key=${sessionId}`;

    let overtakes = await callApi(path);

    console.log("Overtakes loaded");

    return overtakes;
}

export async function loadRace(meeting) {
    let path = `sessions?meeting_key=${meeting.key}&session_name=Race&session_type=Race`;

    let race = await callApi(path);

    console.log("Race loaded");

    return race[0];
}

export async function loadQualy(meeting) {
    let path = `sessions?meeting_key=${meeting.key}&session_name=Qualifying&session_type=Qualifying`;

    let qualy = await callApi(path);

    console.log("Qualy loaded");

    return qualy[0];
}

export async function loadPositions(race_key) {
    let path = `position?session_key=${race_key}`;

    let positions = await callApi(path);

    console.log("Positions loaded");

    return positions;
}

async function waitTime(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}