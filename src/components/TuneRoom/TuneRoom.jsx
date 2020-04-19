import React, { Component } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import songService from '../../utils/songService'
import io from 'socket.io-client'
import Instruments from '../Instruments/Instruments';

class PianoKeyboard extends Component {
    state = {
        display: true, 
        active: false,
        recordingStartTime: 0,
        songNotes: [],
        props: this.props,
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


    
    componentDidMount(){
        console.log(this.state.props)
    }
    
    render () {
    const localhost         = 'http://localhost:3001'
    const heroku            = 'https://fingertones.herokuapp.com/'
    const firstNote         = MidiNumbers.fromNote('c1');
    const lastNote          = MidiNumbers.fromNote('A2');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
    
    const synth = this.state.props.synth

    synth.volume.value = 8

    synth.toMaster()

    function playNote(key){
        synth.triggerAttackRelease(key, '8n')
        console.log(`${key} play`)
    }

    const socket = io.connect(localhost)

    socket.on('play-note', function(data){
        synth.triggerAttackRelease(data.note, '8n')
    })
    
  return (
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
            
            <Piano
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
                    socket.emit('play-note', {
                        note: midiNumber,
                    })
                    // synth.triggerAttackRelease(midiNumber, '8n')
                    // console.log(this.state.songNotes)
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
}

export default PianoKeyboard