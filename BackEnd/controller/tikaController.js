const tikaSchema = require("../model/tikaSchema");

const tikaExchange = async (req, res) => {
  try {
    const { message } = req.body;
    const tikaExchange = new tikaSchema({
      message: message,
    });

    const tika = await tikaExchange.save();
    res.status(200).json({ msg: "You successfully sent tika", tika });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Server Error" });
  }
};

module.exports = tikaExchange;
