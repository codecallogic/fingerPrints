import React, { Component } from 'react';
import "./Piano.css"

const Piano = () => {
    const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

    const keys = document.querySelectorAll('.key')

    keys.forEach(key => {
        key.addEventListener('click', () => playNote(key))
    })
    
    function playNote(key) {
        const noteAudio = document.getElementById(key.dataset.note)
    }
    return (
        <div id="pianoContainer">
            <div class="piano">
                <div data-note="C" class="key white"></div>
                <div data-note="Db" class="key black"></div>
                <div data-note="D" class="key white"></div>
                <div data-note="Eb" class="key black"></div>
                <div data-note="E" class="key white"></div>
                <div data-note="F" class="key white"></div>
                <div data-note="Gb" class="key black"></div>
                <div data-note="G" class="key white"></div>
                <div data-note="Ab" class="key black"></div>
                <div data-note="A" class="key white"></div>
                <div data-note="Bb" class="key black"></div>
                <div data-note="B" class="key white"></div>
            </div>
        </div>
    )    
}

export default Piano

