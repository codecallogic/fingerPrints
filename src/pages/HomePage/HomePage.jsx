import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Tone from 'tone'

const HomePage = (props) => {
    const synth = new Tone.Synth({
        envelope  : {
            attack  : 0.1 ,
            decay  : .8 ,
            sustain: .2,
            release  : 2
        },
        harmonicity  : 5.1 ,
        modulationIndex  : 32 ,
        resonance  : 4000 ,
        octaves  : 1.5 
    })
    var reverb = new Tone.Freeverb(.4,1000);
    var gain = new Tone.Gain(.15);
    console.log(synth)
    synth.oscillator.type = 'square'
    // synth.toMaster()

    gain.chain(reverb, Tone.Master)
    synth.chain(gain)
    
    const notes = [
        'C2', 'E2', 'G2',
        'C3', 'E3', 'G3'
    ]

    let index = 0

    Tone.Transport.scheduleRepeat(time => {
        repeat(time)
    }, '16n')

    Tone.Transport.bpm.value = 95

    function repeat(time){
        let note = notes[index % notes.length]
        synth.triggerAttackRelease(note, '8n', time)
        index++
    }

    Tone.Transport.start()

    setTimeout(() => {
        Tone.Transport.stop()
    }, 5000)
    
    return (
        <Navbar 
            user={props.user} 
            handleLogout={props.handleLogout}
        />

    )
}

export default HomePage