const fs = require('fs');
const path = require('path');

const directoryPath = '.'; // specify your directory path here
let result = '';

function readDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (['.git', 'output.txt', 'output.js'].includes(file)) return;
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      readDirectory(filePath);
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      result += '=====filepath=====\n' + filePath + '\n=====filecontentBEGIN=====\n' + content + '\n=====filecontentEND=====\n';
    }
  });
}

readDirectory(directoryPath);

fs.writeFileSync('./output.txt', result);
