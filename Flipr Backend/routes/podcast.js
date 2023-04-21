const express = require("express");
const { getAllPodcasts, createPodcast, getPodcastById, updatePodcast, deletePodcast, searchPodcast } = require("../controllers/podcast");
const router = express();

router.get('/get-allpodcasts',getAllPodcasts);

router.post('/create-podcast', createPodcast);

router.get('/get-podcast/:id', getPodcastById);

router.put('/update-podcast/:id', updatePodcast);

router.delete('/delete-podcast/:id', deletePodcast);

router.get('/search-podcast/', searchPodcast);



module.exports = router;