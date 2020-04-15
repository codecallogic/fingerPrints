import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'

const PianoCom = () => {
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('f5');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    const synth = new Tone.Synth()

    synth.toMaster()
    
  return (
    <div className="container-fluid">
    <div className="row">
        <div className="col-2"></div>
        <div className="col-10">
            <Piano
                noteRange={{ first: firstNote, last: lastNote }}
                playNote={(midiNumber) => {
                    synth.triggerAttackRelease(midiNumber, '8n')
                }}
                stopNote={(midiNumber) => {
                    // Stop playing a given note - see notes below
                }}
                width={1000}
                keyboardShortcuts={keyboardShortcuts}
            />
        </div>
    </div>
    </div>
  )
}

export default PianoCom