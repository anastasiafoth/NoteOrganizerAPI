const fs = require("fs");
const path = require("path");

const FILEPATH = path.join(process.cwd(), "data", "notes.json");

function writeFile(notes) {
  const json = JSON.stringify(notes, null, 2);
  fs.writeFileSync(FILEPATH, json);
}

function readFile() {
  const data = fs.readFileSync(FILEPATH, "utf8");
  return JSON.parse(data);
}

module.exports = {
  writeFile,
  readFile
};