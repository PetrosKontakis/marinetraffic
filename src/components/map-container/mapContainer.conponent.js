
import React, { Component } from 'react';
import './mapContainer.component.style.scss';
import { Map, TileLayer, Marker, Popup, CircleMarker, Polyline } from 'react-leaflet';
import { getPositionBetween } from '../../services/helper.service';
import { ANIMATION_STAUSES } from '../../services/config.service';

const CLUSTER_STEP = 0.01;
const FRAMES_PER_SECOND = 32;


export default class MapContainer extends Component {

    intervalId;
    animationPlaying = false;
    data = null;

    state = {
        loading: false,
        error: false,
        errorMessage: "",
        showVesselMarker: false,
        showVesselTrackMarkers: false,
        vessel: null,
        vesselCurrentTrack: null,
        vesselTracks: [],
        clusteringPositions: [],
        mapPosition: [37.946163, 23.629808],
        zoom: 10,
        bounds: null
    }

    /**
     * 
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        // Check mmsi update 
        if (nextProps.trackData
            && nextProps.trackData.length > 0) {

            // Handle init
            if (nextProps.animationStatus === ANIMATION_STAUSES.INITIAL) {
                // Init trackdata
                this.data = nextProps.trackData;
                this.initStateData(nextProps.trackData)
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            }

            // Handle Play
            if (nextProps.animationStatus === ANIMATION_STAUSES.PLAY) {
                this.animationPlaying = true;
                if (!this.intervalId) {
                    this.animate()
                }
            }

            // Handle Pause
            if (nextProps.animationStatus === ANIMATION_STAUSES.PAUSE) {
                this.animationPlaying = false;
            }

            // Handle replay
            if (nextProps.animationStatus === ANIMATION_STAUSES.REPLAY) {
                this.initStateData(nextProps.trackData);
                this.animationPlaying = true;
                if (this.intervalId) {
                    clearInterval(this.intervalId)
                }
                this.animate();
            }
        }
    }

    /**
     * Initate response data
     * @param {*} response 
     */
    initStateData(response) {

        if (this.intervalId) {
            clearInterval(this.intervalId)
        }

        // find max lat , max lon, min lat, min lon
        const maxBounds = [
            Math.max(...response.map(track => track.lat)),
            Math.max(...response.map(track => track.lon)),
        ]
        const minBounds = [
            Math.min(...response.map(track => track.lat)),
            Math.min(...response.map(track => track.lon)),
        ]

        const endPosition = [...response].pop();

        this.setState({
            vessel: { track: endPosition },
            showVesselMarker: true,
            clusteringPositions: [],
            loading: false,
            bounds: [maxBounds, minBounds],
            vesselCurrentTrack: null,
            vesselTracks: [],
            showVesselTrackMarkers: true
        });
    }

    /**
     * Basic animation engine
     */
    animate() {

        let clusterProgress = 0;
        let tarckId = 0;
        const { clusteringPositions, vesselTracks } = this.state;
        const data = this.data;
        // Add first track to show
        vesselTracks.push(data[tarckId])

        // Animation engine
        this.intervalId = setInterval(() => {

            if (!this.animationPlaying) {
                return;
            }

            // Track steps has finished 
            if (tarckId >= data.length - 1) {
                // Should stop animation
                clearInterval(this.intervalId)
                this.setState({
                    vesselCurrentTrack: null
                })
                return;
            }

            // Cluster Progress has finished this step
            if (clusterProgress >= 1) {
                tarckId++;
                vesselTracks.push(data[tarckId])
                clusterProgress = 0;
                return;
            }

            const trackStart = data[tarckId].mapPosition;
            const trackEnd = data[tarckId + 1].mapPosition;
            // Get pont of animated cluster point (percentage of destination) 
            const currentPosition = getPositionBetween(trackStart, trackEnd, clusterProgress);
            // Add cluster position to clusters polyline
            clusteringPositions.push(currentPosition);
            this.setState({
                vesselCurrentTrack: currentPosition,
                clusteringPositions,
                vesselTracks: [...vesselTracks],
                showVesselTrackMarkers: true
            })
            // Increase cluster progress
            clusterProgress += CLUSTER_STEP;

        }, FRAMES_PER_SECOND)

    }

    /**
     * 
     * @param {*} track 
     */
    renderPopup(track) {
        const { timestamp, speed } = track;
        return (
            <Popup>
                Date: {timestamp} <br />
                Speed: {speed}Knts
            </Popup>
        )
    }

    /**
     * 
     * @param {*} vessel 
     */
    renderVesselInfo(vessel) {
        return (<Marker position={vessel.track.mapPosition}>
            {this.renderPopup(vessel.track)}
        </Marker>)
    }

    /**
     * 
     * @param {*} track 
     * @param {*} key 
     */
    renderVesseTrack(track, key) {
        return (
            <CircleMarker key={key} center={track.mapPosition} radius={5}>
                {this.renderPopup(track)}
            </CircleMarker>
        )
    }

    /**
     * Drow polyline
     * @param {*} positions 
     */
    renderVesselTrackCluster(positions) {
        if (!positions || positions.length === 0) {
            return;
        }
        // pass new instance of object
        // positions prop are compared by reference, not by value
        // https://github.com/PaulLeCam/react-leaflet/issues/504
        const newPositions = [...positions];
        return (
            <Polyline color={"white"} positions={newPositions}></Polyline>
        )
    }

    /**
     * Main render function
     */
    render() {

        const {
            bounds,
            zoom,
            mapPosition,
            showVesselMarker,
            vesselCurrentTrack,
            vessel,
            showVesselTrackMarkers,
            clusteringPositions,
            vesselTracks } = this.state;

        return (
            <React.Fragment>

                <Map
                    bounds={bounds}
                    duration={2} easeLinearity={0.25} animate={true} center={mapPosition} zoom={zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Draw vessel marker last position*/}
                    {showVesselMarker ? this.renderVesselInfo(vessel) : null}

                    {/* Draw vessel track cluster */}
                    {showVesselTrackMarkers ? this.renderVesselTrackCluster(clusteringPositions) : null}

                    {/* Draw vessel track  */}
                    {showVesselTrackMarkers ?
                        vesselTracks.map((track, key) => this.renderVesseTrack(track, key)) : null}

                    {/* Draw vessel Animation state  */}
                    {vesselCurrentTrack ? (<CircleMarker color={'red'} center={vesselCurrentTrack} radius={10}></CircleMarker>) : null}
                </Map>
            </React.Fragment>
        )
    }
}