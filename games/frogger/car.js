function Car(game, image, width, height, x, y, z)
{
    car = new Sprite(game, image, width, height, z);
    car.setPosition(x, y);
    car.setAngle(90);
    car.setImgAngle(0);
    car.boundAction = DIE;
    
    car.setSpeed(5);
    
    this.update = function () {
        this.checkCars();
        console.log("update");
        
        this.x += this.dx;
        this.y += this.dy;
        this.checkBounds();
        if (this.visible) {
            this.draw();
        } // end if
    } // end update
    
    return car;
}