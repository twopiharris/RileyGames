function Level(scene){
    this.enemies = new Array();
    this.numEnemies = 0;
    
    this.addEnemy = function(enemy){
        this.enemies.push(enemy);
        this.numEnemies++;
    }
}