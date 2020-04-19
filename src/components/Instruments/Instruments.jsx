import React, { Component } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css'
import * as Tone from 'tone'
import './Instruments.css'
import "./TuneRoom.css"
import songService from '../../utils/songService'
import InstrumentSettings from './InstrumentsSettings'
import InstrumentsSettings from './InstrumentsSettings'
import io from 'socket.io-client'

const localhost         = 'http://localhost:3001'
const heroku            = 'https://fingertones.herokuapp.com/'
const socket            = io.connect(heroku)

class Instruments extends Component{
    constructor() {
        super()
        this.state = {
                display: true, 
                active: false,
                piano: false,
                recordingStartTime: 0,
                songNotes: [],
                synth: null,
                oscillator: false,
                envelop: false,
                filter: new Tone.Filter().toMaster(),
                reverb: new Tone.Freeverb(InstrumentSettings.Reverb()),
                defaultSettings: {
                    Reverb: InstrumentSettings.Reverb(),
                    Synth: InstrumentSettings.Synth(),
                    AMSynth: InstrumentSettings.AMSynth(),
                    PluckSynth: InstrumentsSettings.PluckSynth()
                },
                gain: new Tone.Gain(),
                range: {
                    synth: {
                        type: null,
                    },
                    filter: {
                        frequency: 0,
                    },
                    envelope: {
                        attack: 0,
                        decay: 0,
                        sustain: 0,
                        release: 0,
                    },
                    reverb: {
                        roomSize: 0,
                        dampening: 0,
                    }
                }
        }
    }

    toggle = () => {
        if(this.state.songNotes.length !== 0){
            this.setState({
                display: false
            })
        }
        this.setState({
            active: !this.state.active,
            recordingStartTime: Date.now()
        })
        // console.log(this.state.recordingStartTime)
    }

    saveSong = async () => {
        // console.log(this.props.user)
        if(this.props.user){
        try {
            await songService.createSong(this.state.songNotes)
            this.setState({
                display: true,
                active: false,
                recordingStartTime: 0,
                songNotes: [],
            })
            this.props.history.push('/tuneroom')
        }catch(err){
            console.log(err)
        }
        }else{
            this.props.history.push('/login')
        }
    }

    updateInstrument = (synthType) => {
        let synthSettings = this.state.defaultSettings[synthType.target.value] || {}
        
        const newTone = new Tone[synthType.target.value](synthSettings)
        
        if(newTone.oscillator){this.booleanTrue('oscillator')}else{this.booleanFalse('oscillator')}
        if(newTone.envelope){this.booleanTrue('envelope')}else{this.booleanFalse('envelope')}
        this.setState({synth: newTone})
        const newRange = this.state.range
        newRange.synth.type = synthType.target.value
        this.setState({range: newRange})
        newTone.connect(this.state.filter)
        newTone.chain(this.state.reverb, this.state.gain)
        this.state.gain.chain(Tone.Master)
        // newTone.triggerAttackRelease('C4', '16n')
    }

    updateOscillator = (oscillatorType) => {
        const newSynth = this.state.synth
        const number = newSynth.oscillator.type.replace(/\D/g,'')
        console.log(number)
        console.log(newSynth.oscillator.type)
        newSynth.oscillator.type = `${oscillatorType.target.value}${number}`
        this.setState({synth: newSynth})
        // newSynth.triggerAttackRelease('C4', '16n')
    }

    updatePartials = (oscillatorPartials) => {
        const partials = oscillatorPartials === 'none' ? '' : oscillatorPartials
        const newSynth = this.state.synth
        newSynth.oscillator.type = newSynth.oscillator.type.replace(/\d+$/, "")
        // console.log(newSynth.oscillator.type.replace(/\d+$/, ""))
        newSynth.oscillator.type = `${newSynth.oscillator.type}${partials.target.value}`
        // console.log(newSynth.oscillator.type)
        this.setState({synth: newSynth})
        // newSynth.triggerAttackRelease('C4', '16n')
    }

    booleanTrue = (param) => {
        this.setState({[param]: true})
    }

    booleanFalse = (param) => {
        this.setState({[param]: false})
    }

    updateEnvelope = (e) => {
        const state = this.state.range
        // console.log(e.target.value/100)
        state.envelope[e.target.name] = e.target.value
        this.setState({ range: state})
        // console.log(state.envelope.attack)
        const synthEnvelope = this.state.synth
        synthEnvelope.envelope[e.target.name] = e.target.value/100
        this.setState({
            synth: synthEnvelope
        })
    }

    updateFilterType = (e) => {
        const filterType = this.state.filter
        filterType.type = e.target.value
        this.setState({filter: filterType})
    }

    updateFilterFrequency = (e) => {
        const state = this.state.range
        // console.log(e.target.value/100)
        state.filter[e.target.name] = e.target.value
        // state.filter.Q = -3
        this.setState({ range: state})
        // console.log(state.envelope.attack)
        const filterFrequency = this.state.filter
        filterFrequency.frequency.value = e.target.value
        this.setState({
            filter: filterFrequency
        })
    }

    updateReverb = (e) => {
        const state = this.state.range
        state.reverb[e.target.name] = e.target.value
        this.setState({ range: state})
        const reverbParam = this.state.reverb
        reverbParam.dampening.value = e.target.value
        this.setState({
            reverb: reverbParam
        })
    }

    updateReverbRoomSize = (e) => {
        const state = this.state.range
        state.reverb[e.target.name] = e.target.value
        this.setState({ range: state})
        const reverbParam = this.state.reverb
        reverbParam.roomSize.value = e.target.value/100
        this.setState({
            reverb: reverbParam
        })
       
    }

    play = (e) => {
        e.preventDefault()
        const synth = this.state.synth
        console.log(synth)
        synth.triggerAttackRelease('C8', '8n')
    }

    showPiano = (e) => {
        e.preventDefault()
        this.setState({piano: true})
    }

    render () {
        const firstNote         = MidiNumbers.fromNote('C4');
        const lastNote          = MidiNumbers.fromNote('A5');
        const keyboardShortcuts = KeyboardShortcuts.create({
            firstNote: firstNote,
            lastNote: lastNote,
            keyboardConfig: KeyboardShortcuts.HOME_ROW,
        });

        function playNote(key){
            // synth.triggerAttackRelease(key, '8n')
        }

        socket.on('play-note', (data) => {
            // console.log(data)
            const newSynth = this.state.synth
            const note = Tone.Midi(data.note).toNote()
            // const audioContext = new AudioContext();
            // console.log(audioContext.state); //suspended
            // audioContext.resume();
            Tone.context.resume()
            console.log(note)
            newSynth.triggerAttackRelease(note, '8n')
        })

        return (
            <div className="container">
                <form action="">
                    <div className="form-group">
                        <p className="display-3 text-left">Synthesizer</p>
                        <select name="instrument" id="" className="form-control" onChange={this.updateInstrument}>
                            <option value="Synth">Synth</option>
                            <option value="PluckSynth">PluckSynth</option>
                            <option value="PolySynth">PolySynth</option>
                            {/* <option value="NoiseSynth">NoiseSynth</option> */}
                            {/* <option value="Monophonic">Monophonic</option> */}
                            <option value="MonoSynth">MonoSynth</option>
                            {/* <option value="MetalSynth">MetalSynth</option> */}
                            <option value="MembraneSynth">MembraneSynth</option>
                            {/* <option value="Instrument">Instrument</option> */}
                            <option value="FMSynth">FMSynth</option>
                            <option value="DuoSynth">DuoSynth</option>
                            <option value="AMSynth">AMSynth</option>
                        </select>
                    </div>

                   {this.state.synth !== null && <div className="form-group">
                        <p className="text-left">Filter Type</p>
                        <select name="filter" id="" className="form-control" onChange={this.updateFilterType}>
                            <option value="lowpass">Lowpass</option>
                            <option value="highpass">Highpass</option>
                            <option value="bandpass">Bandpass</option>
                            <option value="lowshelf">Lowshelf</option>
                            <option value="highshelf">Highshelf</option>
                            <option value="notch">Notch</option>
                            <option value="allpass">Allpass</option>
                            <option value="peaking">Peaking</option>
                        </select>
                    </div>}

                    {this.state.synth !== null && <div className="form-group">
                        <p className="text-left">Filter Frequency</p>
                        <input type="range" min="0" max="1500" className="custom-range" onChange={this.updateFilterFrequency} name="frequency" value={this.state.range.filter.frequency}/>
                        <output>{this.state.range.filter.frequency}</output>
                    </div>}

                    {this.state.oscillator && <div className="form-group">
                        <p className="text-left">Oscillator</p>
                        <select name="oscillator" id="" className="form-control" onChange={this.updateOscillator}>
                            <option value="triangle">Triangle</option>
                            <option value="sawtooth">Sawtooth</option>
                            <option value="sine">Sine</option>
                            <option value="square">Square</option>
                        </select>
                    </div>}
                    {this.state.oscillator && <div className="form-group">
                        <p className="text-left">Partials</p>
                        <select name="oscillator-partials" id="" className="form-control" onChange={this.updatePartials}>
                            <option value="none">None</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                            <option value="64">64</option>
                        </select>
                    </div>}
                    {this.state.envelope && <div className="form-group">
                        <p className="text-left">Attack</p>
                        <input type="range" min="1" max="300" className="custom-range" onChange={this.updateEnvelope} name="attack" value={this.state.range.envelope.attack}/>
                        <output>{this.state.range.envelope.attack}</output>
                    </div>}

                    {this.state.envelope && <div className="form-group">
                        <p className="text-left">Decay</p>
                        <input type="range" min="1" max="5000" className="custom-range" onChange={this.updateEnvelope} name="decay" value={this.state.range.envelope.decay}/>
                        <output>{this.state.range.envelope.decay}</output>
                    </div>}

                    {this.state.envelope && <div className="form-group">
                        <p className="text-left">Sustain</p>
                        <input type="range" min="1" max="5000" className="custom-range" onChange={this.updateEnvelope} name="sustain" value={this.state.range.envelope.sustain}/>
                        <output>{this.state.range.envelope.sustain}</output>
                    </div>}


                    {this.state.envelope && <div className="form-group">
                        <p className="text-left">Release</p>
                        <input type="range" min="1" max="5000" className="custom-range" onChange={this.updateEnvelope} name="release" value={this.state.range.envelope.release}/>
                        <output>{this.state.range.envelope.release}</output>
                    </div>}

                    {this.state.synth !== null && <h1 className="display-3 text-left">Effects</h1>}

                    {this.state.synth && <div className="form-group">
                        <p className="text-left">Reverb Roomsize</p>
                        <input type="range" min="0" max="100" className="custom-range" onChange={this.updateReverbRoomSize} name="roomSize" value={this.state.range.reverb.roomSize}/>
                        <output>{this.state.range.reverb.roomSize}</output>
                    </div>}

                    {this.state.synth && <div className="form-group">
                        <p className="text-left">Reverb Dampening</p>
                        <input type="range" min="0" max="10000" className="custom-range" onChange={this.updateReverb} name="dampening" value={this.state.range.reverb.dampening}/>
                        <output>{this.state.range.reverb.dampening}</output>
                    </div>}

                    {this.state.synth !== null && <button onClick={this.play}>play</button>}

                    {this.state.synth !== null && <button onClick={this.showPiano}>Instrument Set Up</button>}

                </form>

                <div className="container-fluid">
                <div className="row">
                    <div className="col-1 ml-5"></div>
                    <div className="col-10">
                        
                        {!this.state.active && this.state.display && <button className="record-button btn btn-light" onClick={this.toggle}>Record</button>}
                        {this.state.active && this.state.display && <button className="btn btn-light active" onClick={this.toggle}>Recording</button>}
            
                        {!this.state.display && <button className="btn btn-light" onClick={() => {
                                if(this.state.songNotes.length === 0) return
                                this.state.songNotes.forEach(note => {
                                    setTimeout(() => {
                                        playNote(note.key)
                                    }, note.startTime)
                                })
                            }
                        }>Play</button>}
            
                        {!this.state.display && <button className="btn btn-light" onClick={this.saveSong}>Save</button>}
                        
                        {this.state.synth !== null && <Piano
                            noteRange={{ first: firstNote, last: lastNote }}
                            playNote={(midiNumber) => {
                                if(this.state.active){
                                    const obj = {'key': midiNumber, 'startTime': Date.now() - this.state.recordingStartTime}
                                    console.log(this.state.recordingStartTime)
                                    const joined = this.state.songNotes.concat(obj);
                                    this.setState(
                                        {
                                            songNotes: joined,
                                        }
                                    )
                                }

                               
                                socket.emit('play-note', {note: midiNumber})
                            }}
                            stopNote={(midiNumber) => {
                                // Stop playing a given note - see notes below
                            }}
                            width={1000}
                            keyboardShortcuts={keyboardShortcuts}
                        />}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Instruments