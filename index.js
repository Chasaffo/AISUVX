const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentDir = process.cwd();

function listFiles() {
  console.log(`\nListing files in: ${currentDir}`);
  fs.readdir(currentDir, (err, files) => {
    if (err) console.error('Error reading directory:', err);
    else {
      files.forEach(file => console.log(file));
      promptUser(); // För att fortsätta inmatningscykel
    }
  });
}

function renameFile(oldName, newName) {
  fs.rename(path.join(currentDir, oldName), path.join(currentDir, newName), (err) => {
    if (err) console.error('Error renaming file:', err);
    else console.log(`Renamed: ${oldName} to ${newName}`);
    promptUser(); // För att fortsätta inmatningscykel
  });
}

function changeDirectory(newDir) {
  const nextDir = path.resolve(currentDir, newDir);
  fs.access(nextDir, fs.constants.R_OK, (err) => {
    if (err) console.error('Cannot access directory:', err);
    else {
      currentDir = nextDir;
      console.log(`Changed directory to: ${currentDir}`);
    }
    promptUser(); // För att fortsätta inmatningscykel
  });
}

function promptUser() {
  rl.question('\nEnter command (list, rename <old> <new>, cd <dir>, exit): ', (cmd) => {
    const [operation, param1, param2] = cmd.split(' ');

    switch (operation) {
      case 'list':
        listFiles();
        break;
      case 'rename':
        renameFile(param1, param2);
        break;
      case 'cd':
        changeDirectory(param1);
        break;
      case 'exit':
        rl.close();
        break;
      default:
        console.log('Invalid command');
        promptUser();
    }
  });
}

console.log('Welcome to the file organizer!');
promptUser();