const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');
const albumModel = require('../models/album.model');
const { uploadFile } = require('../services/storage.service');

async function createMusic(req, res) {
  // protection of this api is needed cause not every user is an artist so they should not have access to this site 
  // when we created cookie token we also gave them role so that we should check that role property from that token verification
  // if the role matches then we give the access to them and if it does not then we give them forbidden access rout :[p]


  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No music file provided" });
    }

    // Use buffer directly to avoid giant base64 strings taking up RAM
    const result = await uploadFile(file.buffer);

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });

    res.status(201).json({
      message: "Music Created Successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (e) {
    console.error("UPLOAD ERROR:", e);
    res.status(500).json({ message: "Upload failed on the server: " + e.message });
  }

};


async function createAlbum(req, res) {

  const { title, musics } = req.body;
  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  })

  res.status(201).json({
    message: "Album Created Successfully",
    album: {
      id: album._id,
      title: album.title,
      music: album.musics,
    }
  })

};

async function getAllMusics(req, res) {
  const musics = await musicModel.find().limit(20).populate("artist")

  res.status(200).json({
    message: "Music Fetched",
    musics: musics
  })
};


async function getAllAlbums(req, res) {
  const albums = await albumModel.find().select("title artist").populate("artist").populate("musics");
  res.status(200).json({
    message: "Albums Fetched",
    albums
  })
};

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;
  const album = await albumModel.findById(albumId).populate("artist", "username email");

  return res.status(200).json({
    message: "Album Fetched Successfully",
    album: album,
  })
}
module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };