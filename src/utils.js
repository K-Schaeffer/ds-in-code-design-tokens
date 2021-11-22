const fs = require('fs');
const path = require('path');

function getDirectories(dirPath){

    return fs.readdirSync(path.resolve(__dirname, dirPath)).map(file => {
        return file;
    });
}

module.exports = {
  getDirectories
}