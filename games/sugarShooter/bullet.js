function Bullet(scene, image, accel, width, height, x, y, z)
{
    tBullet = new Sprite(scene, image, width, height, z);
    tBullet.setPosition(x, y);
    tBullet.boundAction = DIE;
    
    tBullet.setAngle(0);
    tBullet.setSpeed(20);
    
    tBullet.update = function() {
        tBullet.checkBounds();
        
        this.x += this.dx;
        this.y += this.dy;
        this.checkBounds();
        if (this.visible) {
            this.draw();
        } // end if
    }
    
    tBullet.checkBounds = function() {
        if(tBullet.x < 0)
        {
            this.visible = false;
            tShooter.curBullets--;
        }
    }
    
    return tBullet;
}