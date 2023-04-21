// import Podcast from "../model/podcast";
const Podcast = require("../model/podcast");

exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find({});
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    res.status(200).json({ podcast });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createPodcast = async (req, res) => {
  const podcast = req.body;
  const newPodcast = new Podcast(podcast);
  try {
    await newPodcast.save();
    res.status(201).json(newPodcast);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updatePodcast = async (req, res) => {
  const { id: _id } = req.params;
  const podcast = req.body;


  const updatedPodcast = await Podcast.findByIdAndUpdate(
    _id,
    { ...podcast, _id },
    {
      new: true,
    }
  );

  res.json(updatedPodcast);
};

exports.deletePodcast = async (req, res) => {
  const { id } = req.params;
  await Podcast.findByIdAndRemove(id);
  res.json({ message: "Podcast deleted successfully." });
};


exports.searchPodcast = async (req, res) => {
  const { searchQuery } = req.query;
  console.log(searchQuery ,"  Is search query ");

  try {;

    // if Podcast title.includes(searchQuery) then return that podcast

    const podcasts = await Podcast.find({
      title: { $regex: `${searchQuery}`, $options: "i" },
    });

    res.json({ podcasts });
    

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
