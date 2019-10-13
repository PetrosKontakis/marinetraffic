import React from 'react';
import './navigatorCard.component.style.scss';
import SearchBox from '../search-box/searchBox.component';
import VesselInfoCard from '../vessel-info-card/vesselInfoCard.component';
import AnimationControlls from '../animation-controlls/animationControlls.component';
import PropTypes from 'prop-types';
import LinearLoader from '../lineaar-loader/linearLoader.component';

/**
 * Name: NavigatroCard
 * Description: NavigatroCard component is responsible vessel info and search
 * @param {*} props 
 */
const NavigatroCard = (props) => {

    /**
     * Error Message
     */
    const renderErrorMessage = () => {
        const { serverMessage } = props;
        return (
            <div className="md-error">
                ERROR: {serverMessage}
            </div>
        )
    }

    /**
     * Loader
     */
    const renderLoader = () => {
        return (
            <LinearLoader></LinearLoader>
        )
    }

    /**
     * Rendering of vessel info & animation controlls
     */
    const renderVesselInfo = () => {
        return (
            <div className="navigator-card">
                <VesselInfoCard mmsi={props.mmsi}/>
                <div className="navigator-card-body">
                    <AnimationControlls
                        onPauseClick={props.onPauseClick}
                        onPlayClick={props.onPlayClick}
                        onReplayClick={props.onReplayClick}
                    />
                </div>
            </div>
        )
    }

    /**
     * Main render component's function 
     */
    return (
        <div className="navigator-container">

            {/* Vessel track info card & animation controlls */}
            {props.trackData ? renderVesselInfo() : null}

            <div className="navigator-card">
                {/* Loader */}
                {props.loading ? renderLoader() : null}
                {/* Server Error */}
                {props.serverError ? renderErrorMessage() : null}
                {/* Search box */}
                <SearchBox onQueryChange={props.onSearchQueryChange} />
            </div>
        </div>
    )
}

NavigatroCard.propTypes = {
    onSearchQueryChange: PropTypes.func.isRequired,
    onPauseClick: PropTypes.func.isRequired,
    onPlayClick: PropTypes.func.isRequired,
    onReplayClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    serverError: PropTypes.bool.isRequired,
    serverMessage: PropTypes.string.isRequired,
    mmsi: PropTypes.number
}

export default NavigatroCard;