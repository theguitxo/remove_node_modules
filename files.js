const fs = require('fs');
const path = require('path');

let levels = 5;
let deleteAngularCache = false;

const params = process.argv.slice(2);

if (params.length) {
  if (params[0] === 'true') {
    deleteAngularCache = true;
  } else {
    const paramLevels = +params[0];
    if (!isNaN(paramLevels)) {
      levels = paramLevels;
    }
    deleteAngularCache = params[1] === 'true';
  }
}

function readDir(route) {
  fs.readdir(route, (err, items) => {
    if (err) {
      throw(new Error(err));
    } else {
      items.forEach(f => readDirRecursive(route, f));
    }
  });
}

function readDirRecursive(route, currentPath) {
  const completeRoute = path.join(route, currentPath);
  if(fs.lstatSync(completeRoute).isDirectory()){
    if (currentPath === 'node_modules' ||
      (currentPath === '.angular' && deleteAngularCache)) {
      try {
        console.log(`Borrando: ${completeRoute}`);
        deleteFolderRecursive(completeRoute);
      } catch(e) {
        console.log(e.message);
      }
    } else {
      const levels = completeRoute.split('\\').length;
      if (levels < 4) {
        readDir(completeRoute);
      }
    }
  }
}

function deleteFolderRecursive(currentPath) {
  if( fs.existsSync(currentPath) ) {
    fs.readdirSync(currentPath).forEach(function(file) {
      let currentPathFile = path.join(currentPath, file);
      if(fs.lstatSync(currentPathFile).isDirectory()) {
        deleteFolderRecursive(currentPathFile);
      } else {
        fs.unlinkSync(currentPathFile);
      }
    });
    fs.rmdirSync(currentPath);
  }
}

readDir('./');
