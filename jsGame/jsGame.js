var element = document.getElementById("canvas")
var startTime = new Date()

class Sound {
  constructor(src, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("loop", loop)
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
}
  play(){
    this.sound.play();
  }
  stop(){
    this.sound.pause();
  }
}

function startTime() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
}
var aspectRatio = 16/9
var scale = 256
var map =[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,,0,0,0]]
var bigMap = checkAllCells(scaleArray(map,3))
window.onload = function() {
  if(!localStorage.highScore)
    localStorage.highScore = 0
  game.resize()
  game.end()
}

var game = {
  song : new Sound("game.mp3", true),
  menu : new Sound("menu.mp3", true),
  score : 0,
  points: 0,
  started : false,
  canvas : element.getContext("2d"),
  components : [],
  spawnList: [],
  resize : function() {
    if(window.innerWidth/16>window.innerHeight/9) {
      this.width = canvas.width = window.innerHeight * aspectRatio
      this.height = canvas.height = window.innerHeight
    }
    else {
      this.width = canvas.width = window.innerWidth 
      this.height = canvas.height = window.innerWidth / aspectRatio
    }
  },
  start : function() {
    this.menu.stop()
    this.song.play()
    for(let r = 0; r < map.length; r++) {
      for(let c = 0; c < map[r].length; c++) {
        if(map[r][c] == 1)
          new Component(8.1, 16.1, '#800000', c * 8, r * 16)
        if(map[r][c] == 2)
          new Cell(8.1, 16.1, '#30D5C8', c * 8, r * 16)
        //(width, height, color, x, y)
      }
    }
    this.player = new Player(7,14,"#0000ff",0,0,3, 50)
    this.update = setInterval(update, 20)
  },
  end : function() {
    this.song.stop()
    this.menu.play()
    game.canvas.clearRect(0, 0, element.width, element.height)
    game.started = false
    this.components = []
    this.spawnList = []
    if(localStorage.highScore < this.score)
      localStorage.highScore = this.score
    this.score = 0
    this.points = 0
    clearInterval(this.update)
    game.canvas.fillStyle = "#005500"
    game.canvas.font = game.width/5 + "px Comic Sans MS";
  game.canvas.textAlign = "center"
  game.canvas.fillText("Zombies", game.width/2, game.height/2);
    game.canvas.fillStyle = "#222222"
  game.canvas.font = game.width/20 + "px Comic Sans MS";
  game.canvas.fillText("High Score: " + localStorage.highScore, game.width/2, game.height/3*2);
    game.canvas.fillText("Press Space to Play", game.width/2, game.height/6*5);
  }
}

function update() {
  if(!document.hidden) {
    game.canvas.clearRect(0, 0, element.width, element.height)
  let player = false
  for(var i of game.components) {
    if(i == game.player)
      player = true
    i.update()
  }
  if(!player) {
    game.end()
    return
  }
  endTime = new Date()
  var timeDiff = Math.round((endTime - startTime) / 1000)
  if(timeDiff >= 5-game.score*.01) {
    var random = Math.floor(Math.random() * game.spawnList.length);
    new Enemy(7,14,game.score<256?rgbToHex(255-game.score,0,0):"#000000",game.spawnList[random].x / game.width * scale + 0.5, game.spawnList[random].y / game.height * scale + 1, game.score*0.1+0.5, Math.round(game.score*0.5)+5)
    startTime = new Date()
  }
    if(game.points == 5) {
      var random1 = Math.floor(Math.random() * map.length);
      var random2 = Math.floor(Math.random() * map[0].length);
      while(map[random1][random2] != 0) {
        random1 = Math.floor(Math.random() * map.length);
        random2 = Math.floor(Math.random() * map[0].length);
      }
      new PowerUp(8.1, 16.1, '#66023c', random2 * 8, random1 * 16)
      game.points = 0
    }
        game.canvas.textAlign = "center"
    game.canvas.fillStyle = "#222222"
  game.canvas.font = game.width/50 + "px Comic Sans MS";
  game.canvas.fillText("Score: " + game.score, game.width/20*19, game.height/30)
  }
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
document.addEventListener('keydown', function(event) {
  var key = event.key
  if(game.started) {
    if(key == "w" || key == "W") {
      game.player.up = true
    }
    if(key == "s" || key == "S") {
      game.player.down = true
    }
    if(key == "a" || key == "A") {
      game.player.left = true
    }
    if(key == "d" || key == "D") {
      game.player.right = true
    }
  }
  if(key == "f11" || key == "p" || key == "P")
    toggleFullscreen()
  if(key == " " && !game.started) {
    game.start()
    game.started = true
  }
  else if(key == " ")
      new Projectile()
})

function toggleFullscreen() {
  if(!document.fullscreenElement)
    element.requestFullscreen()
  else if(document.exitFullscreen)
    document.exitFullscreen()
}

document.addEventListener('keyup', function(event) {
  var key = event.key
  if(game.started) {
    if(key == "w" || key == "W") {
      game.player.up = false
    }
    if(key == "s" || key == "S") {
      game.player.down = false
    }
    if(key == "a" || key == "A") {
      game.player.left = false
    }
    if(key == "d" || key == "D") {
      game.player.right = false
    }
  }
})

var mouse = {
  setPos : function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
      this.x = Math.floor(evt.clientX - rect.left)
      this.y = Math.floor(evt.clientY - rect.top)
  }
}
element.addEventListener('mousemove', function(evt) {
    mouse.setPos(canvas, evt)
  })

element.addEventListener('click', function() {
    if(game.started)
      new Projectile()
  })

class Component {
  constructor(width, height, color, x, y){
    this.width = width * game.width / scale
    this.height = height * game.height / scale
    this.x = x * game.width / scale
    this.y = y * game.height / scale
    this.color = color
    this.alive = true
    game.components.push(this)
  }
  remove() {
    for(let i=0; i<game.components.length; i++)
      if(game.components[i] == this)
        game.components.splice(i, 1)
  }
  update() {
    game.canvas.fillStyle = this.color
    game.canvas.fillRect(this.x, this.y, this.width, this.height)
  }
  isCollide(c) {
    return !(
        ((this.y + this.height) < (c.y)) ||
        (this.y > (c.y + c.height)) ||
        ((this.x + this.width) < c.x) ||
        (this.x > (c.x + c.width))
      );
  }
  isCollideSpeed(c) {
    return !(
        ((this.y + (this.ySpeed * this.speed)+ this.height) < (c.y)) ||
        (this.y + (this.ySpeed * this.speed)> (c.y + c.height)) ||
        ((this.x + this.width + (this.xSpeed * this.speed)) < c.x) ||
        (this.x + (this.xSpeed * this.speed) > (c.x + c.width))
    );
  }
  isCollideDir(c) {
    if(this.isCollideSpeed(c)) {
        if((this.y + this.height) < (c.y))
          return 1;
        if(this.y > (c.y + c.height))
          return 2;
        if(this.x + this.width < c.x + c.width)
          return 3;
        if(this.x > (c.x + c.width))
          return 4;
    }
    return "";
  }
  isCollideAll(c) {
    return (
        (this.isCollide(c) ||
        this.x > game.width-this.width ||
        this.x < 0 ||
        this.y > game.height-this.height ||
        this.y < 0)
    );
  }
}
class Cell extends Component {
  constructor(width, height, color, x, y) {
    super(width, height, color, x, y)
    game.spawnList.push(this)
  }
}
class Character extends Component {
  constructor(width, height, color, x, y, speed) {
    super(width, height, color, x, y)
    this.speed = speed * game.width / 1000
    this.xSpeed = 0
    this.ySpeed = 0
    this.up = false
    this.down = false
    this.left = false
    this.right = false
  }
  update(){
    if(Math.abs(this.xSpeed)==1 && Math.abs(this.ySpeed)==1)
      this.diag = Math.sqrt(2,2)/2
    else
      this.diag = 1
    if((this.x<element.width-this.width || this.xSpeed<0) && (this.x>0 || this.xSpeed>0))
      this.x += this.xSpeed * this.speed * this.diag
    else if(this.constructor.name == "Projectile")
      this.remove()
    if((this.y<element.height-this.height || this.ySpeed<0) && (this.y>0 || this.ySpeed>0))
      this.y += this.ySpeed * this.speed * this.diag
    else if(this.constructor.name == "Projectile")
      this.remove()
    super.update()
  }
}
class PowerUp extends Component {
  constructor(width, height, color, x, y) {
    super(width, height, color, x, y)
  }
  update(){
    if(this.isCollide(game.player)) {
      game.player.damage++
      super.remove()
    }
    super.update()
  }
}
class Player extends Character {
  constructor(width, height, color, x, y, speed, health) {
    super(width, height, color, x, y, speed)
    this.health = health
    this.maxHealth = health
    this.damage = 1
  }
  update(){
    if(this.up) {
      this.ySpeed = -1
    } else {
      this.ySpeed = 0
    }
    if(this.down) {
      this.ySpeed = 1
    } else if(!this.up) {
      this.ySpeed = 0
    }
    if(this.left) {
      this.xSpeed = -1
    } else {
      this.xSpeed = 0
    }
    if(this.right) {
      this.xSpeed = 1
    } else if(!this.left) {
      this.xSpeed = 0
    }
    if(!(this.x<element.width-this.width || this.xSpeed<0) && !(this.x>0 || this.xSpeed>0))
        this.xSpeed = 0
    if(!(this.y<element.height-this.height || this.ySpeed<0) && !(this.y>0 || this.ySpeed>0))
      this.ySpeed = 0
    for(let i=0; i<game.components.length; i++) {
      let x = game.components[i]
        if(x.constructor.name == "Enemy") {
          if(this.isCollide(x)){
           if(this.health <= 0) {
              this.remove()
             return
           } else {
             this.health--
            }
          }
        }
        else if(x.constructor.name == "Component") {
        if(this.isCollideDir(x) == 1)
          this.ySpeed = 0
        if(this.isCollideDir(x) == 2)
          this.ySpeed = 0
        if(this.isCollideDir(x) == 3)
          this.xSpeed = 0
        if(this.isCollideDir(x) == 4)
          this.xSpeed = 0
      }
    }
    super.update()
    game.canvas.fillStyle = "#097969"
    game.canvas.fillRect(this.x, this.y-20, this.width*this.health/this.maxHealth, this.height/6)
  }
}
class Enemy extends Character {
  constructor(width, height, color, x, y, speed, health) {
    super(width, height, color, x, y, speed)
    this.health = health
    this.maxHealth = health
  }
  update() {
    this.mapX = (this.x+this.width/2)/game.width*(bigMap[0].length-1)
    this.mapX = this.xSpeed==0?Math.round(this.mapX):this.xSpeed>0?Math.floor(this.mapX):Math.ceil(this.mapX)
    this.mapY = (this.y+this.height/2)/game.height*(bigMap.length-1)
    this.mapY = this.ySpeed==0?Math.round(this.mapY):this.ySpeed>0?Math.floor(this.mapY):Math.ceil(this.mapY)
    let path = pathFinder(bigMap,this.mapY, this.mapX, Math.round((game.player.y+game.player.height/2)/game.height*(bigMap.length-1)), Math.round((game.player.x+game.player.width/2)/game.width*(bigMap[0].length-1)))
    if(path.length>1){
      this.xSpeed = path[1][1]-this.mapX
      this.ySpeed = path[1][0]-this.mapY
    }
    else{
      this.xSpeed = 0
      this.ySpeed = 0
    }
    for(let i=0; i<game.components.length; i++) {
      let x = game.components[i]
        if(x.constructor.name == "Projectile")
          if(this.isCollide(x)){
            x.remove()
            this.health= this.health - game.player.damage
           if(this.health <= 0) {
             game.score++
             game.points++
              this.remove()
              return
           }
          }
        if(x.constructor.name == "Component" || x.constructor.name == "Enemy") {
        if(this.isCollideDir(x) == 1)
          this.ySpeed = 0
        if(this.isCollideDir(x) == 2)
          this.ySpeed = 0
        if(this.isCollideDir(x) == 3)
          this.xSpeed = 0
        if(this.isCollideDir(x) == 4)
          this.xSpeed = 0
      }
    }
    super.update()
    game.canvas.fillStyle = "#097969"
    game.canvas.fillRect(this.x, this.y-20, this.width*this.health/this.maxHealth, this.height/6)
  }
}

function scaleArray(arr, scale) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let row = [];
        for (let j = 0; j < arr[i].length; j++) {
            for (let k = 0; k < scale; k++) {
                row.push(arr[i][j]);
            }
        }
        for (let k = 0; k < scale; k++) {
            result.push(row);
        }
   }
    return result;
}
function checkAllCells(arr) {
  let result = []
  for(let i=0; i<arr.length; i++) {
    let row = []
    for(let j = 0; j<arr[i].length; j++) {
      var setOne = false
      for(let k=i-1; k<=i+1; k++)
        for(let l=j-1;l<=j+1;l++)
          if(k>0&&l>0&&k<arr.length&&l<arr[k].length&&arr[k][l]==1)
            setOne = true
      if(setOne)
        row.push(1)
      else
        row.push(0)
    }
    result.push(row)
  }
  return result
}

class Projectile extends Character {
  constructor() {
    super(2, 2, '#71797E', (game.player.x+game.player.width/2) / game.width * scale, (game.player.y+game.player.height/2) / game.height * scale, 2.5)
    //super(width, height, color, x, y, speed)
    let player = game.player
    let deltaY=(player.y-mouse.y)
    let deltaX=(player.x-mouse.x)
    let theta = Math.atan(deltaY/deltaX)
    if (deltaX<0) {
      this.xSpeed = Math.cos(theta) * this.speed
      this.ySpeed = Math.sin(theta) * this.speed
    } else {
      this.xSpeed = Math.cos(theta) * this.speed*-1
      this.ySpeed = Math.sin(theta) * this.speed*-1
    }
  }
  update() {
    for(let x of game.components) {
      if(x.constructor.name == "Component" && this.isCollideAll(x)) {
        this.remove()
        return
      }
    }  
    super.update()
  }
}

function pathFinder(grid, startX, startY, endX, endY) {
    // Helper function to get neighbors of a cell
    function getNeighbors(x, y) {
        let neighbors = [];
        if (y > 0 && grid[x][y - 1] == 0) {
            neighbors.push([x, y-1]);
        }
        if (y+1 < grid[0].length && grid[x][y + 1] == 0) {
            neighbors.push([x, y+1]);
        }
        if (x > 0 && grid[x - 1][y] == 0) {
            neighbors.push([x-1, y]);
        }
        if (x+1 < grid.length && grid[x + 1][y] == 0) {
            neighbors.push([x + 1, y]);
        }
        if (x+1 < grid.length && grid[x + 1][y] == 0&&y+1 < grid[0].length && grid[x][y + 1] == 0) {
            neighbors.push([x + 1, y+1]);
        }
      if(x > 0 && grid[x - 1][y] == 0&&y+1 < grid[0].length && grid[x][y + 1] == 0) {
        neighbors.push([x-1, y+1]);
      }
      if(x > 0 && grid[x - 1][y] == 0&&y > 0 && grid[x][y - 1] == 0) {
        neighbors.push([x-1, y-1]);
      }
      if(x > 0 && grid[x - 1][y] == 0&&y > 0 && grid[x][y - 1] == 0) {
        neighbors.push([x+1, y-1]);
      }
        return neighbors;
    }

    // Helper function to calculate heuristic distance
    function heuristic(a, b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }

    // Initialize variables 
    let openSet = [[startX, startY]];
    let cameFrom = {};
    let gScore = {};
    let fScore = {};
    gScore[startX + ',' + startY] = 0;
    fScore[startX + ',' + startY] = heuristic([startX, startY], [endX, endY]);

    // A* algorithm
    while (openSet.length > 0) {
        // Find cell in openSet with lowest fScore
        let current = openSet.reduce((acc, val) => fScore[val[0] + ',' + val[1]] < fScore[acc[0] + ',' + acc[1]] ? val : acc);
        if (current[0] === endX && current[1] === endY) {
            // Reconstruct path
            let path = [current];
            while (cameFrom[current]) {
                current = cameFrom[current];
                path.unshift(current);
            }
            return path;
        }

        // Remove current from openSet
        openSet = openSet.filter(cell => cell[0] !== current[0] || cell[1] !== current[1]);

        // For each neighbor of current
        for (let neighbor of getNeighbors(current[0], current[1])) {
            let tentativeGScore = gScore[current[0] + ',' + current[1]] + 1;
            if (!gScore.hasOwnProperty(neighbor[0] + ',' + neighbor[1]) || tentativeGScore < gScore[neighbor[0] + ',' + neighbor[1]]) {
                cameFrom[neighbor] = current;
                gScore[neighbor[0] + ',' + neighbor[1]] = tentativeGScore;
                fScore[neighbor[0] + ',' + neighbor[1]] = gScore[neighbor[0] + ',' + neighbor[1]] + heuristic(neighbor, [endX, endY]);
                if (!openSet.some(cell => cell[0] === neighbor[0] && cell[1] === neighbor[1])) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    // No path found
    return [];
}
