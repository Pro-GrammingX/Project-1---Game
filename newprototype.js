/* jshint esversion:6 */

var lastClicked;


var map = [
  [3,3,0,0,3],
  [0,1,1,0,3],
  [0,2,2,2,3],
  [1,4,0,1,0],
  [2,0,0,0,3],
];

//just change to 5 incase something dies

// var grid = clickableGrid(5, 5, function(el, row, col, i) {
// //  console.log("You clicked on element:", el);
// //  console.log("You clicked on row:", row);
// //  console.log("You clicked on col:", col);
// //  console.log("You clicked on item #:", row, col);
// //  el.className = 'clicked';
// //  if (lastClicked)
// //    lastClicked.className = idTile;
// //  lastClicked = el;
// });

//this basically makes the tiles
var grid = clickableGrid(5,5, map);
// classes are grid for table and tiles for td
function clickableGrid(rows, cols, map) {
 var i = 0;
 var grid = document.createElement('table');
 grid.className = 'grid';
 for (var r = 0; r < rows; ++r) {
   var tr = grid.appendChild(document.createElement('tr'));
   for (var c = 0; c < cols; ++c) {
     var cell = tr.appendChild(document.createElement('td')); cell.classList.add("tiles");
    switch(map[r][c]) {
      case 1: {cell.appendChild(soldierTileMaker());}
      // cell.classList.add('hero');}
      break;
      case 2: {cell.appendChild(orcTileMaker());}
      // cell.classList.add('orc');}
      break;
      case 3: {cell.appendChild(treeTileMaker());}
      break;
      case 4: {cell.appendChild(geyserTileMaker());}
      break;
      case 5: {cell.appendChild(deadTileMaker());}
      break;
    }
    //  hey Chad, learn to implement this function
    //  cell.addEventListener('click', (function(el, r, c, i) {
    //    return function() {
    //      callback(el, r, c, i);
    //    };
    //  })(cell, r, c, i), false);
   }
 }
 return grid;
}

// all hail Nick!
// map maker
  document.getElementById("screen");
  document.getElementById("screen").appendChild(grid);

// document.body.div[2].appendChild(grid);

// tile maker

function treeTileMaker(){
var x = document.createElement("IMG");
x.setAttribute("src", "tree.gif");
x.setAttribute("width", "75px");
x.setAttribute("height", "75px");
x.setAttribute("alt", "tree tile");
return (x);
}

function deadTileMaker(){
  var x = document.createElement("IMG");
  x.setAttribute("src", "dead.png");
  x.setAttribute("width", "100px");
  x.setAttribute("height", "100px");
  x.setAttribute("alt", "tree tile");
  return (x);
  }

function geyserTileMaker() {
var x = document.createElement("IMG");
x.setAttribute("src", "geyser.gif");
x.setAttribute("width", "100px");
x.setAttribute("height", "100px");
x.setAttribute("alt", "geyser tile");
// var geysTiles = document.getElementsByClassName('geyser');
return (x);
}

function soldierTileMaker() {
var x = document.createElement("IMG");
x.setAttribute("src", "Hero.gif");
x.setAttribute("class", "soldier");
x.setAttribute("width", "45px");
x.setAttribute("height", "45px");
x.setAttribute("alt", "dirt tile");
// var dirtTiles = document.getElementsByClassName('dirt');
return (x);
}

function stoneTileMaker() {
var x = document.createElement("IMG");
x.setAttribute("src", "stone.gif");
x.setAttribute("width", "75px");
x.setAttribute("height", "75px");
x.setAttribute("alt", "stone tile");
// var stoneTiles = document.getElementsByClassName('stone');
return (x);
}

function orcTileMaker() {
  var x = document.createElement("IMG");
  x.setAttribute("src", "orc.gif");
  x.setAttribute("class", "enemy");
  x.setAttribute("width", "50px");
  x.setAttribute("height", "50px");
  x.setAttribute("alt", "shrekt");
  // var stoneTiles = document.getElementsByClassName('porcy');
  return (x);
  }
// GAME LOGIC Tricky part starts now ================================================================

// var map = [
//   [3,3,0,0,0],
//   [0,1,1,0,0],
//   [0,2,2,2,3],
//   [1,4,0,1,0],
//   [2,0,0,0,3],
// ];

var r = 0;
var c = 0;

Map.prototype = Object.create(Array.prototype);
Map.prototype.constructor = Map;

//ENEMY CONSTRUCTOR-----------------------------------------------------------------------------------
function Enemy(name, healthPoints, damagePoints, row, column) {
  this.name = name;
  this.health = healthPoints;
  this.damage = damagePoints;
  this.row = row;
  this.column = column;

  Enemy.prototype.attack = function() {
    return this.damage;
  };

  Enemy.prototype.receiveDamage = function(damage) {
    this.health -= damage;
    if (this.health > 0){
      return this.name + " was attacked and has received " + damage + " points of damage.";
    } else {
      return this.name + " has succumbed to his wounds";
    }
  };
}

//SOLDIER CONSTRUCTOR----------------------------------------------------------------------------------------
function Soldier(name, health, damage, row, column) {
  this.name = name;
  this.health = health;
  this.damage = damage;
  this.row = row;
  this.column = column;


  Soldier.prototype.attack = function() {
    return this.damage;
  };


  Soldier.prototype.receiveDamage = function(damage){
    this.health -= damage;
    if (this.health > 0){
      return this.name + " has received " + damage + " points of damage.";
    } else {
      return this.name + "has succumbed to its wounds.";
    }
  };

}

//LOGIC AND BATTLEFIELD ARRAYS----------------------------------------------------------
function BattleField() {
  this.army = [];
  this.enemy = [];
  this.theDead = []  ;

  BattleField.prototype.addSoldier = function(soldier) {
    this.army.push(soldier);

    BattleField.prototype.addEnemy = function(enemy) {
      this.enemy.push(enemy);
    };
  };
}

BattleField.prototype.attackEnemy = function () {
  var armyIndex = Math.floor(Math.random() * this.army.length); //
  var enemyIndex = Math.floor(Math.random() * this.enemy.length);
  var armyUnit = this.army[armyIndex];
  var enemyUnit = this.enemy[enemyIndex]; //this.orcArmy[orcIndex].idTile === [2,1] id
  var battleResult = enemyUnit.receiveDamage(armyUnit.attack());
  var attacking = $(".soldier").eq(armyIndex);
  attacking.addClass("engager-indicator");
  setTimeout(function(){
    attacking.removeClass('engager-indicator');
  }, 1000);

  var defending = $(".enemy").eq(enemyIndex);
  defending.addClass("combat-indicator");
  defending.addClass("damage-sprite");
  setTimeout(function(){
    defending.removeClass("combat-indicator");
    defending.removeClass("damage-sprite");
  }, 1000);
  for (var r = 0; r < map.length; r++) {

    for (var c = 0; c < map[r].length; c++) {
      var that = this;
      if(enemyUnit.health <= 0){
        $(".enemy").eq(enemyIndex).toggleClass('dead');
        $(".enemy").eq(enemyIndex).prop("src", "dead.png");
        that.enemy.splice(enemyIndex, 1);
        that.theDead.push($(enemyUnit));
      // } else if (armyUnit.health <= 0){
      //   $(".soldier").eq(enemyIndex).toggleClass('dead');
      //   $(".soldier").eq(enemyIndex).prop("src", "dead.png");
      //   that.theDead.push(armyUnit);
      //   that.army.splice(armyIndex, 1);

      }
    }

  }

    return battleResult;
};

BattleField.prototype.enemyAttack = function() {
  var armyIndex = Math.floor(Math.random() * this.army.length); //
  var enemyIndex = Math.floor(Math.random() * this.enemy.length);
  var armyUnit = this.army[armyIndex];
  var enemyUnit = this.enemy[enemyIndex]; //this.orcArmy[orcIndex].idTile === [2,1] id
  var that = this;
  var battleResult = armyUnit.receiveDamage(enemyUnit.attack());
  var attacking = $(".enemy").eq(armyIndex);
  attacking.addClass("engager-indicator");
  setTimeout(function(){
    attacking.removeClass('engager-indicator');
  }, 1500);

  var defending = $(".soldier").eq(enemyIndex);
  defending.addClass("combat-indicator");
  defending.addClass("damage-sprite");
  setTimeout(function(){
    defending.removeClass("combat-indicator");
    defending.removeClass("damage-sprite");
  }, 1500);
  for (var r = 0; r < map.length; r++) {
    for (var c = 0; c < map[r].length; c++) {
      if (armyUnit.health <= 0) {
        $(".soldier").eq(enemyIndex).toggleClass('dead');
        $(".soldier").eq(enemyIndex).prop("src", "dead.png");
        that.theDead += 1;
      } else if (enemyUnit.health <= 0) {
        $(".enemy").eq(enemyIndex).toggleClass('dead');
        $(".enemy").eq(enemyIndex).prop("src", "dead.png");
        that.theDead += 1;
        that.enemy.splice(enemyIndex, 1);
      }

    }
  }
};

  BattleField.prototype.combatStatus = function() {
    if (this.army.length === 0) {
      return "The Soldier's have died, the enemies win";
    } else if (this.enemy.length === 0) {
      return "The enemies have all died, the Soldier's win";
    } else {
      return false;
    }

  return battleResult;
};


// BattleField.prototype.combatStatus = function() {
//   if (this.army.length === 0){
//     return "The Soldier's have died, the enemies win";
//   } else if (this.enemy.length === 0) {
//     return "The enemies have all died, the Soldier's win";
//   } else{
//     return false;
//   }
// };

var theBattleField = new BattleField();

var Soldier1 = new Soldier("Lucius IV", 100, 20, 1, 1);
var Soldier2 = new Soldier("Anton II", 100, 20, 1, 2);
var Soldier3 = new Soldier("Ramza III", 100, 20, 3, 0);
var Soldier4 = new Soldier("Cloud I", 100, 20, 3, 3);

var Enemy1 = new Enemy("Gritty", 100, 20, 2, 1);
var Enemy2 = new Enemy("Watsanupdog", 100, 20, 2, 2);
var Enemy3 = new Enemy("Inamaw", 100, 20, 2, 3);
var Enemy4 = new Enemy("Panuway", 100, 20, 4, 0);

theBattleField.addSoldier(Soldier1);
theBattleField.addSoldier(Soldier2);
theBattleField.addSoldier(Soldier3);
theBattleField.addSoldier(Soldier4);

theBattleField.addEnemy(Enemy1);
theBattleField.addEnemy(Enemy2);
theBattleField.addEnemy(Enemy3);
theBattleField.addEnemy(Enemy4);


function updateDOM() {
    for(var i = 0; i < theBattleField.army.length; i++){
      $('.sol-box .name').eq(i).html(`<span class ='soldier-text-status'></span> `+theBattleField.army[i].name);
      $('.sol-box .health').eq(i).html(`<span class ='soldier-text-status'></span> `+"HP: " +theBattleField.army[i].health);
      $('.sol-box .strength').eq(i).html(`<span class ='soldier-text-status'></span> `+"DMG: "+theBattleField.army[i].damage);
    }
    for(var k = 0; k < theBattleField.enemy.length; k++){
      $('.orc-stat .name').eq(k).html(`<span class ='soldier-text-status'></span> `+theBattleField.enemy[k].name);
      $('.orc-stat .health').eq(k).html(`<span class ='soldier-text-status'></span> `+"HP: " +theBattleField.enemy[k].health);
      $('.orc-stat .strength').eq(k).html(`<span class ='soldier-text-status'></span> `+"DMG: " +theBattleField.enemy[k].damage);
    }
    // for(var i = 0; i < theBattleField.deadBodies; i++){
    //   $('.death-box .health').eq(i).text('RIP');
    //   $('.death-box .health').eq(i).text('RIP');
    //   $('.death-box .strength').eq(i).text('RIP');
    // }
    if(theBattleField.combatStatus()){
      $('.text').text(theBattleField.combatStatus());
    }
}

$(document).ready(function(e){
  updateDOM();
  $('.qbtn').on('keydown', function(e){ $('.text').text(theBattleField.attackEnemy()); setTimeout(function(){ updateDOM();}, 1000);});
  $('.pbtn').on('keydown', function(e){ $('.text').text(theBattleField.enemyAttack()); setTimeout(function(){ updateDOM();}, 1000);});
},1000);


$(document).ready(function(){
  updateDOM();
  window.addEventListener('keydown',function(e){
    var keys = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!keys) return;
//     // console.log(e);
    $('.qbtn').on('keydown', function(e){ $(`.solder-stat`).text(theBattleField.attackEnemy());
    setTimeout(function(){ updateDOM();}, 1000);});
    $('.pbtn').on('keydown', function(a){ $(`.orc-stat`).text(theBattleField.attackEnemy());
    setTimeout(function(){ updateDOM();}, 1000);});
    });

//
// window.addEventListener('keydown',function(e){
//   var keys = document.querySelector("#qb");
//   if (keys.which === "81") {console.log("hello");} //{theBattleField.attackEnemy();}
//     else if (keys.which === "80") {console.log(e);} //{theBattleField.enemyAttack();}
//
});
//
