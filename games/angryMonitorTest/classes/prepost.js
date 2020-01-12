function Question(q1, correct, answers) {
	this.questionLine1 = q1;
	this.correct = correct;
	this.answers = answers;

	this.isCorrect = function(answer) {
		if(answer == correct) {
			return true;
		} else {
			return false;
		}
	}
	
	this.convertAnswers = function() {
		html = '';
		for(i = 0; i < this.answers.length; i ++) {
			html = html + '<p>' + i + '. ' + this.answers[i] + '</p>';
		} // end for
		return html;
	}
	return this;
}

function QuestionModule() {
	
}
