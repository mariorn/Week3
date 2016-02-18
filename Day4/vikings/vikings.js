

var Viking = function(name) {
   this.name = name;
   this.health = Math.floor((Math.random() * 100) + 50);
   this.strength = Math.floor((Math.random() * 50) + 1);
   this.warcrys = "AU!! AU!! AU!!"

   this.shout = function(){
    console.log(this.warcrys);
   };
};
Viking.prototype.injury = function (damage) {
  this.health -= damage;
}


var Saxon = function(){
  this.health = Math.floor((Math.random() * 30) + 10);
  this.strength = Math.floor((Math.random() * 10) + 1);
};
Saxon.prototype.injury = function (damage) {
  this.health -= damage;
}


var Battle = function(vikings, saxons){

  this.saxons = saxons;
  this.vikings = vikings;
  this.battle_turns = Math.floor((Math.random() * 3) + 1) + 4;
  this.saxon_casualties = 0;
  this.vikings_casualties = 0;

  this.vikings_warcrys = function(){
    for(var i = 0; i < this.vikings.length; i++){
      this.vikings[i].shout();
    }
  };

  this.check_alive = function(){
    if(this.saxon_casualties === this.saxons.length || 
      this.vikings_casualties === this.vikings.length ){
      return false;
    }
    return true;
  };

  this.start = function(){
    this.vikings_warcrys();
    while(this.check_alive() && this.battle_turns > 0){
      this.battle();
      this.battle_turns -= 1;
    };

    console.log("Viking deaths: " + this.vikings_casualties + " -> "+ this.vikings_casualties/this.vikings.length*100 + "%");
    console.log("Saxon deaths: " + this.saxon_casualties + " -> "+ this.saxon_casualties/this.saxons.length*100 + "%");

  };

  this.random_viking = function(){
    return Math.floor((Math.random() * this.vikings.length) + 1) - 1;
  };
  this.random_saxon = function(){
    return Math.floor((Math.random() * this.saxons.length) + 1) - 1;
  };

  this.randomFighters = function(){
    var random_fighter = Math.floor((Math.random() * 2) + 1) - 1;
    if(random_fighter === 1){
      return [this.vikings[this.random_viking()], this.saxons[this.random_saxon()]];
    }else{
      return [this.saxons[this.random_saxon()], this.vikings[this.random_viking()]];
    }
  }

  this.checkHealth = function(fighters){

    if(fighters[0].health > 0 && fighters[1].health > 0){
      return true;
    }else{
      if(fighters[0].health <= 0){
        this.vikings_casualties += 1;
      }else{
        this.saxon_casualties += 1;
      }
    }
    return false;
  }

  this.who_attacks = function(fighters){
    var random_fighter = Math.floor((Math.random() * 2) + 1) - 1;
    if(random_fighter === 1){
      return [fighters[1], fighters[0]];
    }else{
      return [fighters[0], fighters[1]];
    }
  };

  this.battle = function () {
    var fighters = this.randomFighters();

    while(this.checkHealth(fighters)){
      fighters = this.who_attacks(fighters);
      fighters[1].injury(fighters[0].strength);
    }
  }
  
};



var numSaxons = (Math.random() * 5) + 1 ;
var saxons = [];
for(var i = 0; i < numSaxons; i++){
  saxons.push(new Saxon());
}

var viking1 = new Viking("Vikingo1");
var viking2 = new Viking("Vikingo2");


var battle = new Battle([viking1, viking2], saxons);
battle.start();

