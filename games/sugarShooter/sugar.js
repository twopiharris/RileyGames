function Sugar(scene, shooter, image, accel, width, height, x, y, z)
{
    tSugar = new Sprite(scene, image, width, height, z);
    tSugar.setPosition(x, y);
    tSugar.boundAction = DIE;
    tSugar.setAngle(180);
    tSugar.setSpeed(5);
    
    tSugar.update = function()
    {
        tSugar.checkCollisions();
        
        this.x += this.dx;
        this.y += this.dy;
        this.checkBounds();
        if (this.visible) {
            this.draw();
        } // end if
    }
    
    tSugar.checkCollisions = function() {
        //check collide with shooter
        
        /*if(tSugar.y > (shooter.y - (shooter.height/2)) && tSugar.y < (shooter.y + (shooter.height/2)))
        {
            console.log("within y interval");
        }
        
        if(tSugar.x > (shooter.x - (shooter.width/2)) && tSugar.x < (shooter.x + (shooter.width/2)))
        {
            console.log("within x interval");
        }
        
        if((tSugar.y > (shooter.y - (shooter.height/2)) && tSugar.y < (shooter.y + (shooter.height/2))) && (tSugar.x > (shooter.x - (shooter.width/2)) && tSugar.x < (shooter.x + (shooter.width/2))))
        {
            console.log("sugar hit shooter");
            tSugar.visible = false;
        }*/
        
        if(tSugar.collidesWith(shooter))
        {
            console.log("sugar hit shooter");
            tSugar.visible = false;
        }
        
        //check collide with all bullets
        for(var i = 0; i < shooter.bullets.length; i++)
        {
            if(tSugar.collidesWith(shooter.bullets[i]))
            {
                console.log("bullet hit sugar");
                tSugar.visible = false;
                shooter.bullets[i].visible = false;
            }
        }
    }
      
    
    return tSugar;
}