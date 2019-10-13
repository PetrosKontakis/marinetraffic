import genericHttpCall from './httpHelper.service';
import { API_ENDPOINTS, API_KEYS } from './config.service';
import { VesselTrackModel } from './models/vesselTrack.model';
import { ShipSearchModel } from './models/shipSearch.model';

/**
 * DESCRIPTION: HTTP call for export vessel track
 * @param {*} mmsi 
 */
export const exportVesselTrack = (mmsi) => {
    return genericHttpCall(
        {
            apiEndpoint: API_ENDPOINTS.EXPORT_VESSEL_TRACK,
            apiKey: API_KEYS.PS01
        },
        { v: 2, period: 'daily', days: 5, mmsi: mmsi, protocol: 'jsono' })
        .then(response => response.map(vtrack => new VesselTrackModel(vtrack)))
}

/**
 * TODO: future implementation 
 * @param {*} mmsi 
 */
export const shipSearch = (mmsi) => {
    return genericHttpCall(
        {
            apiEndpoint: API_ENDPOINTS.SHIP_SHEARCH,
            apiKey: API_KEYS.VD03
        },
        { mmsi: mmsi, protocol: 'jsono' })
        .then(response => response.map((sSearch) => new ShipSearchModel(sSearch)));
}