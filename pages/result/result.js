import { checkUser } from '../../utils/utils.js';
import { showUserData } from '../../utils/utils.js';
import { logOut } from '../../utils/utils.js';


// check user
checkUser("../register/index.html");

// get user data
let user = JSON.parse(localStorage.getItem('userData'));
let logoutBtn = document.getElementById("logoutBtn")

// add log out event
logoutBtn.onclick = ()=>{logOut('../register/index.html')}

// show user name and photo
showUserData(`../../images/${user.image}`,user.username);



// localStorage.setItem('userData','{"username":"mona"}')
// لو صح خلاص نعملها و نضيف اسم المستخدم لو غلط خلاص بلاش
let username = localStorage.getItem('userData');
username = JSON.parse(username)
let user_name = document.getElementById('user_name')
user_name.textContent = username.username;


// '?correctAnswer=5&totalAnswer=10&pointValue=5;'
let qData = decodeURIComponent(location.search.split('?')[1])
let array = qData.split('&')
let obj = {};

for (let i = 0; i < array.length; i++) {
    let splitedArr = array[i].split('=');
    obj[splitedArr[0]] = parseFloat(splitedArr[1])
}

console.log(obj);
// Object { correctAnswer: "5", totalAnswer: "10", pointValue: "5" }
//put percentage into circle scall
let percentage = (obj.correctAnswer / obj.totalAnswer)*100; // دي النسبة اللي هتتضعرض في circle meter
console.log(percentage);
let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");
let progressValue = 0;
let speed = 50;
console.log(percentage);
let progress = setInterval(() => {
valueContainer.textContent = `${progressValue}% Test score`;
progressBar.style.background = `conic-gradient(
      #4d5bf9 ${progressValue * 3.6}deg,
      #cadcff ${progressValue * 3.6}deg
)`;
if (!percentage || (progressValue >= percentage)) {   //put here percentage
    clearInterval(progress);
}
progressValue++;
}, speed);

//show user result message
// اعرضي لليوزر لو الاسكور اكبر من درجة النجاح رسالة انه نجح لو اقل رسالة انه فشل وبعد كده الميتر وبعد كده القيم اللي تحت
let score = obj.correctAnswer * obj.pointValue;
let totalScore = obj.totalAnswer * obj.pointValue;
let passedScore = obj.totalAnswer/2 * obj.pointValue; // دي درجة النجاح
let falseAnswer = obj.totalAnswer - obj.correctAnswer;
console.log(falseAnswer);
// اعرضي ال3 قيم دول في مربعات جمب بعض
if(score >= passedScore){
    let result = document.getElementById("result")
    result.innerHTML = `Congratulation, you passed! <i class="fa-regular fa-face-smile"></i>`
    result.style.color="green"
}else{
    result.innerHTML = `sorry, you failed! <i class="fa-regular fa-face-frown"></i>`
    result.style.color="red"
}
//show 3 icons degrees (Score,Total Score,Passed Score)
let flexBox = document.getElementsByClassName('flexBox')[0];
flexBox.innerHTML = `
<div><span><i class="fa-solid fa-circle"></i>&nbsp; ${score} </span> <br><br> Score</div>
<div><span><i class="fa-solid fa-circle"></i>&nbsp; ${totalScore} </span> <br><br> Total Score</div>
<div><span><i class="fa-solid fa-circle"></i>&nbsp; ${passedScore} </span> <br><br> Passed Score</div>
`
//show user scores in progress bar 
//  اعرضي عدد الاسئلة الصح والغلط والعدد الكلي في 3 مربعات جمب بعض
let scoreDetial = document.getElementById("scoreDetial");
scoreDetial.innerHTML = `
<h4>Correct ${obj.correctAnswer}/${obj.totalAnswer} </h4>
<meter value="${obj.correctAnswer}" min="0" max="${obj.totalAnswer}" optimum="${passedScore}" low="0"></meter> <br><br>
<h4>Wrong ${falseAnswer}/${obj.totalAnswer}</h4>
<meter value="${falseAnswer}" min="0" max="${obj.totalAnswer}" optimum="${passedScore}" low="${obj.totalAnswer}"></meter> <br><br>
`
console.log(score,totalScore,passedScore)















