import React, { Component } from 'react';
import MapContainer from '../../components/map-container/mapContainer.conponent'
import { exportVesselTrack } from '../../services/httpActions.service';
import NavigatorCard from '../../components/navigator-card/navigatorCard.component';
import { ANIMATION_STAUSES } from '../../services/config.service';

/**
 * NAME: MainPage
 * DESCIPTION:  Component responsiple for the main page view. This componen listening events 
 * (like search inputchange, play pause ) fetching and provide data to approprite components  
 * 
 */
class MainPage extends Component {

    state = {
        mmsi: 0,
        loading: false,
        serverError: false,
        serverMessage: "",
        trackData: null,
        animationStatus: ANIMATION_STAUSES.INITIAL
    }

    /**
     * On Query change
     */
    handleOnQueryChange = (query) => {
        if (query && !isNaN(query)) {
            query = parseInt(query)
            this.setState({ mmsi: query, trackData: null, loading: true })
            this.fetchVesselData(query);
        }
    }

    /**
     * On pause click
     */
    handlePauseClick = () => {
        this.setState({
            animationStatus: ANIMATION_STAUSES.PAUSE
        })
    }

    /**
     * On play click
     */
    handlePlayClick = () => {
        this.setState({
            animationStatus: ANIMATION_STAUSES.PLAY
        })
    }

    /**
     * On replay click
     */
    handleReplayClick = () => {
        this.setState({
            animationStatus: ANIMATION_STAUSES.REPLAY
        })
    }

    /**
     * Fetch Vessel data
     * @param {*} mmsi 
     */
    fetchVesselData(mmsi) {
        exportVesselTrack(mmsi).then((response) => {
            this.setState({
                trackData: response,
                loading: false,
                serverError: false,
                animationStatus: ANIMATION_STAUSES.INITIAL
            })
        }).catch(errors => {
            let errorMessage = "Connection error";
            if (errors.length > 0) {
                errorMessage = errors.map(error => error.detail).join(', ');
            }
            this.setState({
                loading: false,
                serverError: true,
                serverMessage: errorMessage
            });
        })
    }

    /**
     * Main render component function 
     */
    render() {

        const { mmsi,
            trackData,
            loading,
            serverError,
            animationStatus,
            serverMessage } = this.state;

        return (
            <div className="md-page-container">
                <NavigatorCard
                    mmsi={mmsi}
                    loading={loading}
                    serverError={serverError}
                    serverMessage={serverMessage}
                    trackData={trackData}
                    onSearchQueryChange={this.handleOnQueryChange}
                    onPauseClick={this.handlePauseClick}
                    onPlayClick={this.handlePlayClick}
                    onReplayClick={this.handleReplayClick}
                />
                <MapContainer
                    animationStatus={animationStatus}
                    trackData={trackData} mmsi={mmsi} />
            </div>
        )
    }
}

export default MainPage;