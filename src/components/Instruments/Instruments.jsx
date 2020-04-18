import React, { Component } from 'react'
import * as Tone from 'tone'
import InstrumentSettings from './InstrumentsSettings'

class Instruments extends Component{
    constructor(props) {
        super(props)
        this.state = {
                synth: null,
                oscillator: false, 
                defaultSettings: {
                    Synth: InstrumentSettings.Synth(),
                    AMSynth: InstrumentSettings.AMSynth()
                },
                gain: new Tone.Gain().toMaster(),
                filter: new Tone.Filter({
                    type : '    lowpass' ,
                    frequency : 2000 ,
                    rolloff : -12 ,
                    Q : 1 ,
                    gain : 0
                }).toMaster()
        }
    }

    updateOscillator = (oscillatorType) => {
        const newSynth = this.state.synth
        newSynth.oscillator.type = oscillatorType.target.value
        this.setState({synth: newSynth})
        newSynth.frequency._param.value = 1
        console.log(newSynth.frequency._param.value)
        newSynth.triggerAttackRelease('C4', '16n')
    }
    
    updateInstrument = (synthType) => {
        if(this.state.synth){
           this.state.synth.disconnect(this.state.filter)
           this.state.synth.dispose()
        }
        let settings = this.state.defaultSettings[synthType.target.value] || {}
        const newTone = new Tone[synthType.target.value](settings)
        if(newTone.oscillator){
            this.setState({
                oscillator: true
            })
        }
        this.setState({
            synth: newTone
        })
        console.log(this.state.filter)
        newTone.connect(this.state.filter)
        newTone.triggerAttackRelease('C4', '1')
    }

    componentDidMount() {
    //    console.log(this.state.synth)
    }
    
    render () {
        
        return (
            <div className="container">
                <form action="">
                    <div className="form-group">
                        <p className="text-left">Instruments</p>
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
                    {this.state.oscillator && <div className="form-group">
                        <p className="text-left">Oscillator</p>
                        <select name="oscillator" id="" className="form-control" onChange={this.updateOscillator}>
                            <option value="triangle">Triangle</option>
                            <option value="sawtooth">Sawtooth</option>
                            <option value="sine">Sine</option>
                            <option value="square">Square</option>
                            <option value="pulse">Pulse</option>
                        </select>
                    </div>}
                    {this.state.oscillator && <div className="form-group">
                        <p className="text-left">Partials</p>
                        <select name="oscillator" id="" className="form-control" onChange={this.updateOscillator}>
                            <option value="triangle">Triangle</option>
                            <option value="sawtooth">Sawtooth</option>
                            <option value="sine">Sine</option>
                            <option value="square">Square</option>
                            <option value="pulse">Pulse</option>
                        </select>
                    </div>}
                </form>
            </div>
        )
    }
}
export default Instruments