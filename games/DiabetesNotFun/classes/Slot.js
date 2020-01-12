//Skill Object
function Slot(scene, width, height, image, x, y, z) {

	//Creates the Skill Slot Sprite, sets it's position, and hides it.
    slot = new TextBox(scene, image, width/2, height/2, 1);
	slot.setPosition(x, y);
	slot.hide();
	
	//Initialized the skill belonging to the slot to null.
	slot.skill = null;
	
	//Called when a new skill is set to this slot.
	slot.setSkill = function(skill) {
		this.skill = skill;
		this.text = skill.text;
	}
	
	//Called when the slot object is clicked.
	//Applies the slot's skills effectiveness against HP. 
	slot.clicked = function() {
		if(this.skill.effect > 0){
			player.curLevel.enemy.applyHit(this.skill.effect);
			this.skill.used = true;
		} else {
			player.applyHit(this.skill.effect);
			helper.wave();
		}
		for(var i=0;i<4;i++){
			player.curLevel.slot[i].skill.current = false;
			player.curLevel.slot[i].skill = null;
		}
		player.curLevel.populateSkills();
	}

    return slot;
}