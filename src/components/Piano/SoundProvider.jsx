import React, { Component } from 'react';
import * as Tone from 'tone';

class SoundProvider extends Component {
    playNote = midiNumber => {
        const synth = new Tone.Synth().toMaster()
        synth.triggerAttackRelease()
    }
    render() {
        return this.props.render({
          playNote: this.playNote,
        });
    }
}
export default SoundProvider