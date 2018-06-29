window.onload = function() {
//the Map Generator Constructor function
var map = [
  [3,3,0,0,0],
  [0,1,1,0,0],
  [0,2,2,2,3],
  [1,4,0,1,0],
  [2,0,0,0,3],
];

var r = 0;
var c = 0;


// Array.prototype.generateMap = function() {
//   for (var r = 0; r < map.length; r++) {
//     for (var c = 0; c < map[r].length; c++) {
//       switch (map[r][c]) {
//         case 0 || 3:
//           {
//             console.log("the generateMap function found an obstacle at [" + map.indexOf(map[r]) + " , " + map.indexOf(map[c]) + "]");
//             break;
//           }
//         case 1:
//           {
//             console.log("The generateMap function found a friendly unit at [" + map.indexOf(map[r]) + " , " + map.indexOf(map[c]) + "]");
//             theHeros = document.getElementsByClassName('hero');
//             break;
//           }
//         case 2:
//           {
//             console.log("The generateMap function found an enemy at [" + map.indexOf(map[r]) + " , " + map.indexOf(map[c]) + "]");
//             break;
//           }
//       }
//     }
//   }
// };

Map.prototype = Object.create(Array.prototype);
Map.prototype.constructor = Map;

// BASELINE KNIGHT CHARACTER TYPE----------------------------------------------------------------------------------------------------------
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
    } else if (this.health < 0){
      return this.name + " has succumbed to his wounds";
    }
  };
}

//Soldier
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
    }else if (this.health <0) {
      return this.name + "has succumbed to its wounds.";
    }
  };

}

function battleField(){
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
    //animation code will go here
    // $('td > IMG').eq(map[Orc.idTile]).addClass('dead').removeClass('orc');
    // $('td > IMG').eq(orcIndex).prop('src', "dead.png");
    // $('td > IMG').eq(orcIndex).prop('width', '45px');
    // $('td > IMG').eq(orcIndex).prop('height', '45px');

    that.theDead.push(enemyUnit);
    that.enemy.splice(enemyIndex, 1);
    //dom selector here to toggle a tombstone at place in index of orcArmy;
    //we can add class tombstone and toggle it with orc css selector. will need to work on this.
  }
  //this at one point was highlighting and dehighlighting
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
  //this at one point was highlighting and dehighlighting
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



//   var friendlyIndex = Math.floor(Math.random() * this.friendlyArmy.length); //
//   var orcIndex = Math.floor(Math.random() * this.orcArmy.length);
//
//   var friendlyUnit = this.friendlyArmy[friendlyIndex];
//   var orcUnit = this.orcArmy[orcIndex];
//   var that = this;
//   var combatResult = friendlyUnit.receiveDamage(orcUnit.attack());
//   var x = this.orcArmy[orcIndex].idTile[0];
//   var y = this.orcArmy[orcIndex].idTile[1];
//   if(orcUnit.health <= 0){
//     //animation code will go here
//     $('IMG').eq().addClass('dead').removeClass('orc');
//     $('IMG').eq().prop('src', "dead.png");
//     that.theDead.push(friendlyUnit);
//     that.friendlyArmy.splice(friendlyIndex, 1);
//     //dom selector here to toggle a tombstone at place in index of orcArmy;
//     //we can add class tombstone and toggle it with orc css selector. will need to work on this.
//   }
//   var attackerUnit = $('.orc').eq(orcIndex);
//   attackerUnit.addClass("engager-indicator");
//   setTimeout(function(){
//     attackerUnit.removeClass('engager-indicator');
//   }, 1000);
//   var woundedHero = $('.hero').eq(friendlyIndex);
//   woundedHero.addClass('combat-indicator');
//   setTimeout(function(){
//     woundedHero.removeClass('combat-indicator');
//   },1000);
//
//     return combatResult;
// };

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

var Enemy1 = new Enemy1("Enemy1", 100, 20, 2, 1);
var Enemy2 = new Enemy2("Enemy2", 100, 20, 2, 2);
var Enemy3 = new Enemy3("Enemy3", 100, 20, 2, 3);
var Enemy4 = new Enemy4("Enemy4", 100, 20, 4, 0);

BattleField.addSoldier(Soldier1);
BattleField.addSoldier(Soldier2);
BattleField.addSoldier(Soldier3);
BattleField.addSoldier(Soldier4);

BattleField.addEnemy(Enemy1);
BattleField.addEnemy(Enemy2);
BattleField.addEnemy(Enemy3);
BattleField.addEnemy(Enemy4);

//function Orc(name, health, damage, savageBiteDamage, idTile, direction)

  //function Orc(name, health, damage, savageBiteDamage, idTile, direction)

  // adding DOM features
  // function updateDOM(){
  //   for(var i = 0; i < theFieldOfBattle.friendlyArmy.length; i++){
  //     $('.soldier-box .health').eq(i).html("<span>health:</span>"+theFieldOfBattle.friendlyArmy[i].health);
  //     $('.soldier-box .strength').eq(i).html("<span>strength:</span>"+theFieldOfBattle.friendlyArmy[i].strength);
  //   }
  //   for(var i = 0; i < theFieldOfBattle.orcArmy.length; i++){
  //     $('.orc-box .health').eq(i).html("<span>health:</span>"+theFieldOfBattle.orcArmy[i].health);
  //     $('.orc-box .strength').eq(i).html("<span>strength:</span>"+theFieldOfBattle.orcArmy[i].strength);
  //   }
  //   for(var i = 0; i < theFieldOfBattle.theDead; i++){
  //     $('.death-box .health').eq(i).html('RIP');
  //     $('.death-box .strength').eq(i).html('RIP');
  //   }
  //
  // if(theFieldOfBattle.combatStatus()){
  //     $('.info scroll-left').text($(theFieldOfBattle.combatResult()));
  // }
  // }
  // $(document).ready(function(){
  //   updateDOM();
  //   $('.attack').on('click', function(){ $('.info').text(theFieldOfBattle.friendlyAttack()); //theFieldOfBattle.friendlyAttack()
  //   setTimeout(function(){ updateDOM();}, 2000);});
  //   $('.attack').on('click', function(){ $('.info').text(theFieldOfBattle.orcAttack()); //theFieldOfBattle.friendlyAttack()
  //   setTimeout(function(){ updateDOM();}, 2000);});
  //   $('.cast').on('click', function(){ $('.info').text(Mage.prototype.castSpell()); //theFieldOfBattle.friendlyAttack()
  //   setTimeout(function(){ updateDOM();}, 2000);});
  //   $('.shoot').on('click', function(){ $('.info').text(Eve.prototype.rangedAttack()); //theFieldOfBattle.friendlyAttack()
  //   setTimeout(function(){ updateDOM();}, 2000);});
  //   $('.bite').on('click', function(){ $('.info').text(Orc.prototype.biteTheBadGuy()); //theFieldOfBattle.friendlyAttack()
  //   setTimeout(function(){ updateDOM();}, 2000);});
  //
  // });

};
  // add the on.load thing to call theFieldOfBattle
