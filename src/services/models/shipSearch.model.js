import { ShipSearchDto } from "../dtos/shipSearch.dto.model";

export class ShipSearchModel extends ShipSearchDto {


    constructor({ SHIPNAME,
        MMSI,
        IMO,
        SHIP_ID,
        CALLSIGN,
        TYPE_NAME,
        DWT,
        FLAG,
        COUNTRY,
        YEAR_BUILT,
        MT_URL }) {
        super();

        this.shipName = SHIPNAME;
        this.mmsi = parseInt(MMSI);
        this.imo = parseInt(IMO)
        this.shipId = parseInt(SHIP_ID);
        this.callsing = CALLSIGN;
        this.typeName = TYPE_NAME;
        this.dwt = DWT;
        this.flag = FLAG;
        this.country = COUNTRY;
        this.yearBuilt = YEAR_BUILT;
        this.mtUrl  = MT_URL

    }
}