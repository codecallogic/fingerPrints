import tokenService from './tokenService'
const BASE_URl = "/api/songs/"

export default {
    createSong,
    getSongs
}

function createSong(song){
    return fetch(BASE_URl + 'add', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
            'authorization': 'Bearer ' + tokenService.getToken()
        }),
        body: JSON.stringify(song)
    })
    .then(res => {
        if(res.ok) return res.json()
        throw new Error('Something went wrong')
    })
}

function getSongs(){
    return fetch(BASE_URl + 'all')
    .then(res => res.json())
}