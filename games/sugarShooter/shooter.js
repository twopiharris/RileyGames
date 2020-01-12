function Shooter(scene, image, accel, width, height, x, y, z)
{
    tShooter = new Sprite(scene, image, width, height, z);
    tShooter.setPosition(x, y);
    
    tShooter.accel = accel;
    tShooter.fireInterval = 10;
    tShooter.damageCount = 0;
    tShooter.curBullets = 0;
    tShooter.maxBullets = 3;
    tShooter.bullets = [];
    tShooter.lastBullet = 0;
    tShooter.frameCount = 0;
    
    tShooter.update = function() {
        tShooter.checkKeys();
        tShooter.frameCount++;
        
        this.x += this.dx;
        this.y += this.dy;
        this.checkBounds();
        if (this.visible) {
            this.draw();
        } // end if
    } //end update
    
    tShooter.shoot = function() {
        
        if(tShooter.curBullets < tShooter.maxBullets)
        {
            tShooter.lastBullet = tShooter.frameCount;
            
            tShooter.addBullet(new Bullet(scene, "GlucoseMonitor0000.png", accel, 20, 20, this.x, this.y - 50, 0));
            tShooter.curBullets++;
        } else {
            
        }

        //console.log("# bullets: " + tShooter.curBullets);
    }
    
    tShooter.addBullet = function(bullet) {
        tShooter.bullets.push(bullet);
    }
    
    tShooter.removeBullet = function(bullet) {
        
    }
    
    tShooter.checkKeys = function() {
        /*
        if (keysDown[K_UP] || keysDown[K_W]){
            this.setDY(-10);
        } else if (keysDown[K_DOWN] || keysDown[K_S]){
            this.setDY(10);
        } else {
            this.setDY(0);
        } // end if
        */
        
        if (keysDown[32]){
            if((tShooter.lastBullet + tShooter.fireInterval) < tShooter.frameCount)
            {
                tShooter.shoot();
            }
        }
        
        if (keysDown[K_LEFT] || keysDown[K_A]){
            this.setDX(-10);
        } else if (keysDown[K_RIGHT] || keysDown[K_D]){
            this.setDX(10);
        } else {
            this.setDX(0);
        } // end if
    } // end checkKeys
    
    return tShooter;
}