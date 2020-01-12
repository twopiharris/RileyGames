//Skill Object
function Skill(text, effect) {
    
	//Sets the Skills Text and How Effective it is.
	this.text = text;
	this.effect = effect
	this.used = false;
	this.current = false;

    return this;
}