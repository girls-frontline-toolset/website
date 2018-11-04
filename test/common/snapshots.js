import path from "path";
import fs from "fs";
let dir = __dirname +'\\'+ '..\\__snapshots__\\';
let styleFile = fs.readFileSync(dir + "setting\\" + "styleColor.html");

export default {
  addSnapshots(body,test,name){
    let testDir = common.getData().replace("_","\\");
    let filepath = dir + testDir + "\\" + path.basename(test).split(".")[0] + "\\";

    name = name.replace(new RegExp(' ', 'g'),"_");
    filepath
      .split(path.sep)
      .reduce((currentPath, folder) => {
        currentPath += folder + path.sep;
        if (!fs.existsSync(currentPath)){
          fs.mkdirSync(currentPath);
        }
        return currentPath;
      }, '');


    function creatDir(path) {
      if (fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
    }
let  html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="/common/lib/lib.css">
    <link rel="stylesheet" type="text/css" href="/common/css/styles.css">
    <link rel="stylesheet" type="text/css" href="/common/css/gl-icon.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CMaterial+Icons">
    ${styleFile}
    </head>
<body>
${body}
</body>
</html>`;

    fs.writeFile(filepath + name  + ".html", html);
    console.log( common.getHost() + "/test/__snapshots__/" + testDir.replace("\\","/") + "/" + path.basename(test).split(".")[0] + "/" + name  + ".html");
  }
}


