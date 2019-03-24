
$(document).ready(function(){


  $("#start-button").on("click", gameState.startTimer);

});


var gameState = {


  timeRemaining : 60,


  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },


  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },


  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers (Go Birds!): " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers (Uh oh.): " + numIncorrect);
    $("#unanswered").text("Skipped questions (Swoop?): " + numUnanswered);
  }
}


var trivia = {


  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');

    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }


    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },


  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;


    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }


    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}


var questionBank =
[
  {
    question: "'Arkansas' Fred Barnett was drafted in 1990 by the Eagles and played for them through the 1995 season. What number did he wear for the Eagles?",
    answers: ["1", "81", "86"],
    correct: "86"
  },

  {
    question: "What was the first Super Bowl appearance for the Eagles",
    answers: ["Super Bowl X", "Super Bowl XV ", "Super Bowl VX"],
    correct: "Super Bowl XV "
  },
  {
    question: "What number did the Eagles QB known as 'The Polish Rifle' wear?",
    answers: ["7", "18", "85"],
    correct: "7"
  },
  {
    question: "The Philadelphia Eagles franchise began their NFL membership with what team name?",
    answers: ["Philadelphia Eagles ", "Philadelphia Soul ", "Bethleham "],
    correct: "Philadelphia Eagles"
  },
  {
    question: "Who set an Eagle single game rushing record with 205 yards?",
    answers: ["LeSean McCoy", "Brian Westbrook", "Steve Van Buren "],
    correct: "Steve Van Buren "
  },
  {
    question: "How many Super Bowls did the Eagles play in?",
    answers: ["3", "0", "2"],
    correct: "3"
  },
  {
    question: "In what city did the Eagles play the Patriots in Super Bowl XXXIX ?",
    answers: ["Dallas", "Jacksonville", "Miami"],
    correct: "Jacksonville"
  },
  {
    question: "Who was the tallest Eagles player ever, who which stood at 6'8?",
    answers: ["Ricky Watters", "Harold Carmichael", "Zach Ertz"],
    correct: "Harold Carmichael"
  },
  {
    question: "In what Super Bowl did the Eagles win their first ever Super Bowl?",
    answers: ["Super Bowl LII", "Super Bowl 50", "Super Bowl XII"],
    correct: "Super Bowl LII"
  },
  {
    question: "How many championships do the eagles have in total?",
    answers: ["6", "1","4"],
    correct: "4"
  }
]
