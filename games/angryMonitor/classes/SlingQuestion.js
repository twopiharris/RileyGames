function SlingQuestion(bs, time, details, correct, answers) {
	tq = new Question(details, correct, answers);
	tq.bs = bs;
	tq.time = time;
	return tq;
}