const path = require("path");
const fs = require("fs");
const acrcloud = require("acrcloud");
const { defaultOptions } = require("./utils");

const acr = new acrcloud({ ...defaultOptions });

const provider = async (fileName) => {
  try {
    const filepath = path.resolve(__dirname, "..", "..", "public", "uploads");
    console.log(filepath + "/" + fileName);
    const file = fs.readFileSync(filepath + "/" + fileName);
    if (file) {
      const res = await acr.identify(Buffer.from(file));
      console.log(JSON.stringify(res.metadata));
      return res.metadata;
    } else {
      console.log("file not found");
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

module.exports = { provider };
