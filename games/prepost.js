function Question(q1, correct, answers) {
/* The question class is more like a struct that holds a string question and then an array of string 
** answers with the correct question's index saved in another variable.
*/
	this.questionLine1 = q1;
	this.correct = correct;
	this.answers = answers;

	
	this.isCorrect = function(answer) {
		if(answer == correct) {
			return true;
		} else {
			return false;
		} // end if
	} // end isCorrect
	
	this.convertAnswers = function() {
		html = '';
		for(i = 0; i < this.answers.length; i ++) {
			html = html + '<p>' + i + '. ' + this.answers[i] + '</p>';
		} // end for
		return html;
	} // end convertAnswers
	return this;
} // End Question def

function QuestionModule() {
	
} // end QuestionModule def

