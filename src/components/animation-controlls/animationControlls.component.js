import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Name: AnimationControlls
 * Description: AnimationControlls component is responsible for animation controll actions
 * @param {*} props 
 */

export default class AnimationControlls extends Component {

    state = {
        statusPlaying: false
    }

    /**
     * On click handling 
     */
    playClicked = () => {
        this.props.onPlayClick();
        this.setState({ statusPlaying: true });
    }

    /**
     * Render more animation actions (Pause Replay)
     */
    renderPauseReplay = () => {
        const { onPauseClick, onReplayClick } = this.props;
        return (
            <React.Fragment>

                <br />
                <br />

                <button className="md-button-primary md-button-round" onClick={onPauseClick}>
                    <img src="images/pause-24px.svg" alt="" />
                </button>
                <button className="md-button-primary md-button-round" onClick={onReplayClick}>
                    <img src="images/replay-24px.svg" alt="" />
                </button>
            </React.Fragment>
        )
    }

    /**
     * Main render component's function
     */
    render() {
        const { statusPlaying } = this.state;
        return (
            <React.Fragment>
                <button className="md-button-primary"
                    onClick={this.playClicked}>SHOW VESSELS TRACK</button>
                {/* Render Pause Replay */}
                {statusPlaying ? this.renderPauseReplay() : null}

            </React.Fragment>
        )
    }
}

AnimationControlls.propTypes = {
    onPauseClick: PropTypes.func.isRequired,
    onPlayClick: PropTypes.func.isRequired,
    onReplayClick: PropTypes.func.isRequired
}
