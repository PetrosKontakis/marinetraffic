import { API_ROOT, USE_MOCK_DATA } from './config.service';

/**
 * DESCRIPTION: converting object with params to string  
 * @param {*} params 
 */
const getParamsAsString = (params) => {
    return Object.keys(params).map(function (key, value) {
        return `${key}:${params[key]}`
    }).join("/");
}


/**
 * DESCRIPTION:Layer function to manipulate response 
 */
const genericHttpCall = ({ apiEndpoint, apiKey }, params = {}) => {

    let fetchOpt = {};

    let fetchUrl = `${API_ROOT}/${apiEndpoint}/${apiKey}/${getParamsAsString(params)}`

    //  Only for dev proposes
    if (USE_MOCK_DATA) {
        fetchUrl = `mocks/${apiEndpoint}.json`
        console.log(`Mock is enabled fecting data from: ${fetchUrl}`)
    }

    return fetch(fetchUrl, fetchOpt)
        .then(response => response.json())
        .catch(error => error.json())
        .then(response => {
            if (response.errors) {
                throw (response.errors);
            }
            return response
        });

}

export default genericHttpCall;