/**
 * 
 * Math calculation functions source: http://www.movable-type.co.uk/scripts/latlong.html 
 * 
 */

// Add toRadians on number prototype
if (typeof (Number.prototype.toRadians) === "undefined") {
    Number.prototype.toRadians = function () {
        return this * Math.PI / 180;
    }
}

// Add toDegrees on number prototype
if (typeof (Number.prototype.toDegrees) === "undefined") {
    Number.prototype.toDegrees = function () {
        return this * (180 / Math.PI);
    }
}

const R = 6371e3; // metres


/**
 * @param {*} lat1 
 * @param {*} lon1 
 * @param {*} lat2 
 * @param {*} lon2 
 */
export const getDistance = (lat1, lon1, lat2, lon2) => {

    const φ1 = lat1.toRadians();
    const φ2 = lat2.toRadians();
    const Δφ = (lat2 - lat1).toRadians();
    const Δλ = (lon2 - lon1).toRadians();

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d;
}

/**
 * 
 * @param {*} lat1 
 * @param {*} lon1 
 * @param {*} lat2 
 * @param {*} lon2 
 */
export const getBearing = (lat1, lon1, lat2, lon2) => {
    const φ1 = lat1.toRadians();
    const φ2 = lat2.toRadians();
    const Δλ = (lon2 - lon1).toRadians();

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const brng = Math.atan2(y, x);

    return brng.toDegrees();
}

/**
 * 
 * @param {*} lat 
 * @param {*} lon 
 * @param {*} distance 
 * @param {*} bearing 
 */
export const getLatLonFromPointDistBearing = (lat, lon, distance, bearing) => {

    const φ1 = lat.toRadians();
    const λ1 = lon.toRadians();
    const d = distance;
    const brng = bearing.toRadians();

    const φ2 = Math.asin(Math.sin(φ1) * Math.cos(d / R) +
        Math.cos(φ1) * Math.sin(d / R) * Math.cos(brng));
    let λ2 = λ1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(φ1),
        Math.cos(d / R) - Math.sin(φ1) * Math.sin(φ2));

    return [φ2.toDegrees(), λ2.toDegrees()];
}

/**
 * 
 * @param {*} pos1 [lat, lon]
 * @param {*} pos2 [lat, lon]
 * @param {*} persentage  (float 0 - 1 )
 */
export const getPositionBetween = (pos1, pos2, persentage) => {
    const d = getDistance(pos1[0], pos1[1], pos2[0], pos2[1]);
    const brng = getBearing(pos1[0], pos1[1], pos2[0], pos2[1]);
    return getLatLonFromPointDistBearing(pos1[0], pos1[1], d * persentage, brng)
}