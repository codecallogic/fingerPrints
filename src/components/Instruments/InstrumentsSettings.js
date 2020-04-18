export default {
    Synth,
    AMSynth,
}

function Synth(){
    const settings = 
        {oscillator: {type: 'sine'},
        envelope: {
        attack: .9,
        decay: .2,
        sustain: .9,
        release: 1
        }}
    return settings
}

function AMSynth(){
    const settings = {
        harmonicity : 3 ,
        detune : 0 ,
        oscillator : {
        type : 'sine'
        } ,
        envelope : {
        attack : 0.01 ,
        decay : 0.01 ,
        sustain : 1 ,
        release : 0.5
        } ,
        modulation : {
        type : 'sawtooth'
        } ,
        modulationEnvelope : {
        attack : 0.5 ,
        decay : 0 ,
        sustain : 1 ,
        release : 0.5
        }
        }
    return settings
}