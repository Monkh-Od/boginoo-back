const Url = require("../Models/Url");

const createNewUrl = async (req, res) => {
  const { original, ownerId } = req.body;
  const short = (Math.random() + 1).toString(36).substring(7);

  try {
    const newUrl = await Url.create({
      original,
      short,
      ownerId,
    });
    res.status(201).json({ message: "created successfully", url: newUrl });
  } catch (err) {
    res.status(500).json({ message: "server aldaa garlaa" });
  }
};
const getUrl = async (req, res) => {
  const { shortId } = req.params;
  try {
    const short = await Url.findOne({
      short: shortId,
    });
    if (short === null) {
      return res.status(404).json({ message: "baihgui baina" });
    }
    res.status(201).json({ message: "gotten successfully", url: short });
  } catch (err) {
    res.status(500).json({ message: "server aldaa garlaa" });
  }
};

module.exports = {
  createNewUrl,
  getUrl,
};
