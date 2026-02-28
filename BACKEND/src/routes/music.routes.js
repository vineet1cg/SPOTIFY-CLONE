const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();
const multer = require('multer');
//api/music/upload
const upload = multer({
    storage : multer.memoryStorage() 
});

router.post("/upload",authMiddleware.authArtist,upload.single("music"), musicController.createMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);
router.get("/",authMiddleware.authUser,musicController.getAllMusics);
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);
router.get("/albums/:albumId",authMiddleware.authUser , musicController.getAlbumById);
module.exports = router; 