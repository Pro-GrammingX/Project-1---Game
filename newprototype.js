// window.onload = function() {
// //the Map Generator Constructor function
var map = [
  [3,3,0,0,0],
  [0,1,1,0,0],
  [0,2,2,2,3],
  [1,4,0,1,0],
  [2,0,0,0,3],
];

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
function BattleField(){
  this.army = [];
  this.enemy = [];
  this.theDead = [];
}

BattleField.prototype.addSoldier = function (soldier){
  this.army.push(soldier);
};

BattleField.prototype.addEnemy = function (enemy){
  this.enemy.push(enemy);
};


BattleField.prototype.attackEnemy = function () {
  var armyIndex = Math.floor(Math.random() * this.army.length); //
  var enemyIndex = Math.floor(Math.random() * this.enemy.length);
  var armyUnit = this.army[armyIndex];
  var enemyUnit = this.enemy[enemyIndex]; //this.orcArmy[orcIndex].idTile === [2,1] id
  var that = this;
  var battleResult = enemyUnit.receiveDamage(armyUnit.attack());
  for (var r = 0; r < map.length; r++) {
    for (var c = 0; c < map[r].length; c++) {

    }
  }
  if(enemyUnit.health <= 0){
    that.theDead.push(enemyUnit);
    that.enemy.splice(enemyIndex, 1);
  }
    return battleResult;
};

BattleField.prototype.enemyAttack = function () {
  var armyIndex = Math.floor(Math.random() * this.army.length); //
  var enemyIndex = Math.floor(Math.random() * this.enemy.length);

  var armyUnit = this.army[armyIndex];
  var enemyUnit = this.enemy[enemyIndex]; //this.orcArmy[orcIndex].idTile === [2,1] id
  var that = this;
  var battleResult = armyUnit.receiveDamage(enemyUnit.attack());
  for (var r = 0; r < map.length; r++) {
    for (var c = 0; c < map[r].length; c++) {

    }
  }
  if(armyUnit.health <= 0){

    // THIS AT ONE POINT WAS ANIMATING_____________________________________________________________________________________
    //animation code will go here
    // $('td > IMG').eq(map[Orc.idTile]).addClass('dead').removeClass('orc');
    // $('td > IMG').eq(orcIndex).prop('src', "dead.png");
    // $('td > IMG').eq(orcIndex).prop('width', '45px');
    // $('td > IMG').eq(orcIndex).prop('height', '45px');

    that.theDead.push(armyUnit);
    that.army.splice(armyIndex, 1);
    //dom selector here to toggle a tombstone at place in index of orcArmy;
    //we can add class tombstone and toggle it with orc css selector. will need to work on this.
  }

  //this at one point was highlighting and dehighlighting------------------------------------------------------------
  // var attacking = $('.soldier').eq(friendlyIndex);
  // attackerUnit.addClass("engager-indicator");
  // setTimeout(function(){
  //   attackerUnit.removeClass('engager-indicator');
  // }, 1000);
  // var woundedOrc = $('.orc').eq(orcIndex);
  // woundedOrc.addClass('combat-indicator');
  // setTimeout(function(){
  //   woundedOrc.removeClass('combat-indicator');
  // },1000);

    return battleResult;
  };


BattleField.prototype.combatStatus = function() {
  if (this.army.length === 0){
    return "The Soldier's have died, the enemies win";
  } else if (this.enemy.length === 0) {
    return "The enemies have all died, the Soldier's win";
  } else{
    return false;
  }
};

var theBattleField = new BattleField();

var Soldier1 = new Soldier("Soldier1", 100, 20, 1, 1);
var Soldier2 = new Soldier("Soldier2", 100, 20, 1, 2);
var Soldier3 = new Soldier("Soldier3", 100, 20, 3, 0);
var Soldier4 = new Soldier("Soldier4", 100, 20, 2, 3);

var Enemy1 = new Enemy("Enemy1", 100, 20, 2, 1);
var Enemy2 = new Enemy("Enemy2", 100, 20, 2, 2);
var Enemy3 = new Enemy("Enemy3", 100, 20, 2, 3);
var Enemy4 = new Enemy("Enemy4", 100, 20, 4, 0);

theBattleField.addSoldier(Soldier1);
theBattleField.addSoldier(Soldier2);
theBattleField.addSoldier(Soldier3);
theBattleField.addSoldier(Soldier4);

theBattleField.addEnemy(Enemy1);
theBattleField.addEnemy(Enemy2);
theBattleField.addEnemy(Enemy3);
theBattleField.addEnemy(Enemy4);


// };
