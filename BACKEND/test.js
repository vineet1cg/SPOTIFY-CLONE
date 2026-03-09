require('dotenv').config();
const fs = require('fs');
const token = require('jsonwebtoken').sign({ id: '67cbd1bc7db113e11f0a1d41', role: 'artist' }, process.env.JWT_SECRET);

async function testUpload() {
    const fd = new FormData();
    fd.append('title', 'Final Test MP3');
    fd.append('music', new Blob([fs.readFileSync('test-7mb.mp3')]), 'test-7mb.mp3');

    try {
        const res = await fetch('http://localhost:3000/api/music/upload', {
            method: 'POST',
            body: fd,
            headers: { cookie: 'token=' + token }
        });
        const data = await res.json();
        console.log('STATUS:', res.status);
        console.log('RESPONSE:', data);
    } catch (e) {
        console.error('ERROR:', e);
    }
}
testUpload();
