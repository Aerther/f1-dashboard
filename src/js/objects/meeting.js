export class Meeting {
    constructor(meetingData) {
        this.officialName = meetingData["meeting_official_name"];
        this.name = meetingData["meeting_name"];

        this.country = meetingData["country_name"];
        this.countryFlag = meetingData["country_flag"];
        this.countryCode = meetingData["country_code"];

        this.circuit = meetingData["circuit_image"];
        this.circuitName = meetingData["circuit_short_name"];

        this.dateStart = meetingData["date_start"];
        this.dateEnd = meetingData["date_end"];
        this.offset = meetingData["gmt_offset"];

        this.cancelled = meetingData["is_cancelled"];
        this.year = meetingData["year"];

        this.key = meetingData["meeting_key"];
    }

    static createMeeting(meetingData) {
        return new Meeting(meetingData);
    }
}