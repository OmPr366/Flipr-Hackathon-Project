import Podcast from "../model/podcast";

export const getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find({});
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    res.status(200).json({ podcast });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPodcast = async (req, res) => {
  const podcast = req.body;
  const newPodcast = new Podcast(podcast);
  try {
    await newPodcast.save();
    res.status(201).json(newPodcast);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePodcast = async (req, res) => {
  const { id: _id } = req.params;
  const podcast = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No podcast with that id");

  const updatedPodcast = await Podcast.findByIdAndUpdate(
    _id,
    { ...podcast, _id },
    {
      new: true,
    }
  );

  res.json(updatedPodcast);
};

export const deletePodcast = async (req, res) => {
  const { id } = req.params;
  await Podcast.findByIdAndRemove(id);
  res.json({ message: "Podcast deleted successfully." });
};


export const searchPodcast = async (req, res) => {
  const { searchQuery } = req.query;

  try {;
    // If product tile will contain searchQuery then it will be returned
    const title = new RegExp(searchQuery, "i");

    const res = await Podcast.find({ title });
    
    res.json({ data: res });
    

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
