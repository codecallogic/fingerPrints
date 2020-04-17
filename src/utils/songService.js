const BASE_URl = "/api/songs/"

export default {
    createSong
}

function createSong(song){
    return fetch(BASE_URl + 'add', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(song)
    })
    .then(res => {
        if(res.ok) return res.json()
        console.log('Something went wrong')
    })
}