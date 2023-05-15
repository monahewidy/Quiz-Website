function Question(_questions,qPointsValue) {
    // create property
    this.questions = _questions;
    this.curr = 1;
    this.questionsDiv = document.getElementById('questionsDiv');
    this.prog_label = document.getElementById('prog_label');
    this.prog = document.getElementById('prog');
    this.score_value = document.getElementById('score_value');
    this.err = document.getElementById('err');
    this.load = document.getElementById('load');
    this.start_quiz = document.getElementById('start_quiz');
    this.timer = document.getElementById('timer');
    this.backBtn = document.getElementById('back');
    this.nextBtn = document.getElementById('next');
    this.submitBtn = document.getElementById('submit');
  

    // create private property
    const qPoints = qPointsValue;
    let qCount=_questions.length;
    let score = 0;
    let ansQ = 0;
    let correctQ = 0;
  
  
    // create geter and seter
    this.getQPoints = ()=>qPoints;
    this.getQCount = ()=>qCount;
  
    this.getScore = ()=>score;
    this.increaseScore = (v)=>{score += v>0?v:0;};
  
    this.getAnsQ = ()=>ansQ;
    this.increaseAnsQ = ()=>{ansQ++;};
  
    this.getCorrectQ = ()=>correctQ;
    this.increaseCorrectQ = ()=>{correctQ++;};
  
  
    // add onclick events for buttons
    this.backBtn.onclick = ()=>{this.back();};
    this.nextBtn.onclick = ()=>{this.next();};
    this.submitBtn.onclick = ()=>{this.submit();};;
  
  }
  
  
// create function to display quiz
  Question.prototype.display = function (){
        this.showQuestion();
        this.load.style.display = 'none';
        start_quiz.style.display = 'block';
        this.starTimer(this.getQCount());
        this.checkAnswer()
  }
  
  

  // create function to show Questions
  Question.prototype.showQuestion = function (){
    // get count and answerd Questions
    let count = this.getQCount();
    let answeredQ = this.getAnsQ();
  
    // show progress bar
    prog.max = count;
    prog_label.innerText = ` you answered ${answeredQ} of ${count}`;
  
    // loop on Questions count
    for (let i = 0; i < count; i++) {
      this.questionsDiv.innerHTML += `
        <div class="question" id="qu${i+1}" style="display:${i===0?'block':'none'}">
  
        </div>
        `;
  
        // create Question heading
        let questionHead = document.createElement('h1');
        questionHead.setAttribute('id',`question_num${i+1}`)
        questionHead.classList.add('question_h')
        questionHead.innerHTML = `<span id="question_number">${i+1}) </span>`
        questionHead.innerText += this.questions[i].question;
  
  
        // create answers list
        let ul = document.createElement('ul');
          ul.setAttribute('id',`question${i+1}_ans`)
          ul.classList.add('question_ans')
  

        // create list items
        let n = 1;
        for(let k in this.questions[i].answers){
          if (this.questions[i].answers[k]) {
            let li = document.createElement('li');
            li.setAttribute('id',k)
            li.innerText = `${n++} - ${this.questions[i].answers[k]}`;
            ul.appendChild(li);
          }
        }

  
        // append Question heading and answer list in question div
        let questionDiv = document.getElementById(`qu${i+1}`);
        questionDiv.appendChild(questionHead);
        questionDiv.appendChild(ul);
        
    }
  }
  
  
  // create function to show next Questions
  Question.prototype.next = function (){
    if (this.curr < this.getQCount()) {
      let c = document.getElementById(`qu${this.curr}`);
      let n = document.getElementById(`qu${this.curr+1}`);
  
      c.style.display = 'none';
      n.style.display = 'block';
  
      this.curr++;
    }
    else // if curr equal Questions count show error
    {
      this.showError("this is the last question");
    }
  }
  
  
  // create function to show previous Questions
  Question.prototype.back = function (){
    if (this.curr > 1) {
      let c = document.getElementById(`qu${this.curr}`);
      let n = document.getElementById(`qu${this.curr-1}`);
  
      c.style.display = 'none';
      n.style.display = 'block';
  
      this.curr--;
    }
    else // if curr equal 1 show error
    {
      this.showError("this is the first question");
    }
  }
  
  
  // create function to submit
  Question.prototype.submit = function (){
    if (this.getAnsQ() < this.getQCount()) {
      this.showError("you should answer all questions");
    }
    else{
      this.saveScore()
    }
  }
  
  
  // create function to save score in storage and send result to result page
  Question.prototype.saveScore = function (){
    // debugger
      let num1 = localStorage.getItem('num1');
      let num2 = localStorage.getItem('num2');
      let num3 = localStorage.getItem('num3');
  
      // get leader board objects
      num1 = JSON.parse(num1);
      num2 = JSON.parse(num2);
      num3 = JSON.parse(num3);
  
      let userData = JSON.parse(localStorage.getItem('userData'));
      let score = this.getQPoints() * this.getCorrectQ();
  
  
      // compare user score with leader board
      if (score > 0 && (!num1 || score > num1.score)) {
        localStorage.setItem('num3',JSON.stringify(num2))
        localStorage.setItem('num2',JSON.stringify(num1))
        userData.score = score;     
        localStorage.setItem('num1',JSON.stringify(userData));
      }
      else if (score > 0 && (!num2 || score > num2.score)) {
        localStorage.setItem('num3',JSON.stringify(num2))
        userData.score = score;     
        localStorage.setItem('num2',JSON.stringify(userData));
      }
      else if (score > 0 && (!num3 || score > num3.score)) {
        userData.score = score;     
        localStorage.setItem('num3',JSON.stringify(userData));
      }
  
      // send data to result page
      window.open(`../result/result.html?correctAnswer=${this.getCorrectQ()}&totalAnswer=${this.getQCount()}&pointValue=${this.getQPoints()}`,"_self"); 
  }
  
  
  // create function to show error msg
  Question.prototype.showError = function (m){
    this.err.innerText = m;
    setTimeout(()=>{this.err.innerText = ''},2000)
  }
  
  
  // create function to check answer
  Question.prototype.checkAnswer = function (){
    // get all answer list
    let arr = document.getElementsByClassName('question_ans');
          // loop on answer list
          for (let i = 0; i < arr.length; i++) {
            // get answer list item
            const element = arr[i].childNodes;
            // add event onclick to check answer when user choose
            for (let j = 0; j < element.length; j++) {
              element[j].onclick = ()=>{
                
                // debugger
                let id = element[j].id;
                let answersResult = this.questions[i].correct_answers;
                let isCorrect = answersResult[`${id}_correct`];
                let correctAnswerId = Object.keys(answersResult)
                                      .find(key => answersResult[key] === 'true')
                                      .substring(0,8);
                let correctAnswerLi = document.querySelector(`#question${i+1}_ans #${correctAnswerId}`);
                correctAnswerLi.innerHTML += '<i class="ri-check-fill" style="color: green; font-size: 25px"></i>'
                correctAnswerLi.classList.add('correct_ans');
  
                
                if (isCorrect==='true') {
                  this.increaseCorrectQ();
                }
                else{
                  element[j].innerHTML += '<i class="ri-close-line" style="color: red; font-size: 25px"></i>';
                  element[j].classList.add('false_ans');
                }                
  
        
                this.increaseAnsQ();
                
                this.prog_label.innerText = `you answered ${this.getAnsQ()} of ${this.getQCount()}`;
                this.prog.value = this.getAnsQ();
        
        
                arr[i].classList.add('stop_hover');
        
                for (let i = 0; i < element.length; i++) {
                  element[i].onclick = null
                }
              };
              
            }
          }
  }
  
  
  // create function to start time
  Question.prototype.starTimer = function (m){
      let s = '00';
  
      let id = setInterval(() => {
        this.timer.innerText = `${m} : ${s}`;
    
        if (s === '00' && m===0) {
          this.saveScore();
          clearInterval(id);
        }
        else if (s === '00') {
          m--;
          s = 59;
        }
        else
        {
          s = s===1?'00':--s;
        }
    
      }, 1000);
  }
  
  
  export default Question;