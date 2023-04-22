const express = require("express");
const { getAllPodcasts, createPodcast, getPodcastById, updatePodcast, deletePodcast, searchPodcast, getPodcastsByUserId, getFavPocastsbyUserID, addFavPodcast, removeFavPodcast } = require("../controllers/podcast");
const router = express();

router.get('/get-allpodcasts',getAllPodcasts);

router.post('/create-podcast', createPodcast);

router.get('/get-podcast/:id', getPodcastById);

router.put('/update-podcast/:id', updatePodcast);

router.delete('/delete-podcast/:id', deletePodcast);

router.get('/search-podcast/:query', searchPodcast);

router.get('/get-podcast-byuser/:id', getPodcastsByUserId);

router.get('/get-fav-podcasts/:id',getFavPocastsbyUserID)

router.put('/add-to-favorite-podcast', addFavPodcast);
router.put('/remove-favorite-podcast', removeFavPodcast);





module.exports = router;
