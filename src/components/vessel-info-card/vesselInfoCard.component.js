import React from 'react';
import './vesselInfoCard.component.style.scss';
import PropTypes from 'prop-types';

/**
 * Name: VesselInfoCard
 * Description: VesselInfoCard component is represented vessel general info (dammy data)
 * TODO: add dynamicaly data
 * @param {*} props 
 */
const VesselInfoCard = (props) => {

    return (
        <div>
            <div className="navigator-card-header-image"></div>
            <div className="navigator-card-body">
                <div className="md-subtitle">
                    MMSI: {props.mmsi}
                </div>
            </div>
        </div>
    )
}

VesselInfoCard.propTypes = {
    mmsi: PropTypes.number
}

export default VesselInfoCard;