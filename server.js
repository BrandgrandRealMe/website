const express = require("express");
const app = express();
const fs = require('fs');
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/pages/home.html");
});
app.get("/gamevault", (request, response) => {
  response.sendFile(__dirname + "/pages/games/gamevalt.html");
});
app.get("/chat", (request, response) => {
  response.sendFile(__dirname + "/pages/chat.html");
});
app.get("/mit", (request, response) => {
  response.sendFile(__dirname + "/pages/mit.html");
});
app.get("/games/snake", (request, response) => {
  response.sendFile(__dirname + "/pages/games/snake.html");
});
app.get("/games/tetris", (request, response) => {
  response.sendFile(__dirname + "/pages/games/tetris.html");
});
app.get("/games/pong", (request, response) => {
  response.sendFile(__dirname + "/pages/games/pong.html");
});
app.get("/games/breakout", (request, response) => {
  response.sendFile(__dirname + "/pages/games/breakout.html");
});
app.get("/games/bomberman", (request, response) => {
  response.sendFile(__dirname + "/pages/games/bomberman.html"); 
});
app.get("/games/missilecommand", (request, response) => {
  response.sendFile(__dirname + "/pages/games/missilecommand.html"); 
});
app.get("/games/frogger", (request, response) => {
  response.sendFile(__dirname + "/pages/games/frogger.html"); 
});
app.get("/games/sokban", (request, response) => {
  response.sendFile(__dirname + "/pages/games/sokban.html"); 
});
app.get("/games/donotopen", (request, response) => {
  response.sendFile(__dirname + "/pages/games/donotopen.html");
});
app.get("/games/hungergames", (request, response) => {
  response.sendFile(__dirname + "/pages/games/hungergames.html");
});
// new games
app.get("/games/tower-stack", (request, response) => {
  response.sendFile(__dirname + "/pages/games/tower-stack.html"); 
});
app.get("/games/doodle-jump", (request, response) => {
  response.sendFile(__dirname + "/pages/games/doodle-jump.html"); 
});
app.get("/games/maze", (request, response) => {
  response.sendFile(__dirname + "/pages/games/maze.html"); 
});
app.get("/games/break-the-blocks", (request, response) => {
  response.sendFile(__dirname + "/pages/games/break-the-blocks.html"); 
});
app.get("/games/spaceinvaders", (request, response) => {
  response.sendFile(__dirname + "/pages/games/spaceinvaders.html"); 
});

app.get("/videos/all", (request, response) => {
  response.sendFile(__dirname + "/videos/all.html");
});
app.get("/video", (request, response) => {
  response.sendFile(__dirname + "/videos/template.html");
});

app.get("/games/dreamscape", (request, response) => {
  response.sendFile(__dirname + "/pages/games/dreamscape.html");
});
app.get("/bg", (request, response) => {
  response.sendFile(__dirname + "/pages/time.html");
});
app.get("/BikeMounts.gcode", (request, response) => {
  response.sendFile(__dirname + "/files/BikeMounts.gcode");
});
app.get("/what.gif", (request, response) => {
  response.sendFile(__dirname + "/pages/knickknacks/gifviddiscord.html");
});
app.get("/Knicknacks", (request, response) => {
  response.sendFile(__dirname + "/pages/knickknacks/knickknacks.html");
});
app.get("/mdlg", (request, response) => {
  response.sendFile(__dirname + "/pages/megadirlinkgen.php");
});
app.get("/knickknacks/clock", (request, response) => {
  response.sendFile(__dirname + "/pages/knickknacks/clock.html");
});
app.get("/knickknacks/test", (request, response) => {
  response.sendFile(__dirname + "/pages/knickknacks/testing.html");
});
app.get("/knickknacks/periodictable", (request, response) => {
  response.sendFile(__dirname + "/pages/knickknacks/periodictable.html");
});
app.get('/favicon/:fname', (req, res) => {
 if (!fs.readFileSync('./favicon/' + req.params.fname)) r404(res)
 else
  res.sendFile(__dirname + '/favicon/' + req.params.fname);
});
app.get('/public/:fname', (req, res) => {
 if (!fs.readFileSync('./public/' + req.params.fname)) r404(res)
 else
  res.sendFile(__dirname + '/public/' + req.params.fname);
});
app.get('/file/:fname', (req, res) => {
 if (!fs.readFileSync('./files/' + req.params.fname)) r404(res)
 else
  res.sendFile(__dirname + '/files/' + req.params.fname);
});
app.get('/v/:fname', (req, res) => {
 if (!fs.readFileSync(`./videos/${req.params.fname}.mp4`)) r404(res)
 else
  res.sendFile(__dirname + `/videos/${req.params.fname}.mp4`);
});
app.get('/logo/:fname', (req, res) => {
 if (!fs.readFileSync('./logo/' + req.params.fname)) r404(res)
 else
  res.sendFile(__dirname + '/logo/' + req.params.fname);
});
app.get('/fonts/:fname', (req, res) => {
 if (!fs.readFileSync('./fonts/' + req.params.fname)) r404(res)
 else
  res.sendFile(__dirname + '/fonts/' + req.params.fname);
});
app.get('*', function(req, res){
  res.sendFile(__dirname + '/404.html');
});
const listener = app.listen(process.env.PORT, () => {

});
