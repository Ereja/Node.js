const fs = require("fs");
const path = require("path");

//by the idea instead of giving placeholder of folderName I could have instantly wrote "blogPosts", but this way the functions stay reusable in case we would want to put posts inside of seperate folders by their content

//function to check if file exist
function checkIfExist(folderName, nameOfFile) {
  return fs.existsSync(path.join(__dirname, folderName, nameOfFile));
}

//function to create a file
function createFile(folderName, nameOfFile, file) {
  fs.writeFileSync(path.join(__dirname, folderName, nameOfFile), file);
}

//function to get a post
function getPost(folderName, postTitle) {
  //readfile returns a buffer of hexidecimals
  const postBuffer = fs.readFileSync(
    path.join(__dirname, folderName, postTitle)
  );
  const postsString = postBuffer.toString();
  const postsJSON = JSON.parse(postsString);
  return postsJSON;
}

module.exports = {
  checkIfExist,
  createFile,
  getPost,
};
