import { VesselTrackDto } from "../dtos/vesselTrack.dto.model";

export class VesselTrackModel extends VesselTrackDto {

    mapPosition;
    date;

    constructor({ MMSI,
        STATUS,
        SPEED,
        LON,
        LAT,
        COURSE,
        HEADING,
        TIMESTAMP,
        SHIP_ID }) {
        super();

        this.mmsi = parseInt(MMSI);
        this.status = parseInt(STATUS);
        this.speed = parseInt(SPEED);
        this.lon = parseFloat(LON);
        this.lat = parseFloat(LAT);
        this.course = parseInt(COURSE);
        this.heading = parseInt(HEADING);
        this.timestamp = TIMESTAMP;
        this.shipId = parseInt(SHIP_ID);

        this.date = new Date(this.timestamp);
        this.mapPosition = [this.lat, this.lon];

    }
}