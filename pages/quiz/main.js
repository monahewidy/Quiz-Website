import Setting from '../../objects/setting.js';
import Question from '../../objects/question.js';
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

// get elements from dom
const startBtn  = document.getElementById('start');
const settingDiv  = document.getElementById('settings');
const loader  = document.getElementById('load');
const error_msg  = document.getElementById('error_msg');



// create object from Setting
const setting = new Setting();



// add click event when user start
startBtn.addEventListener('click',fetchQuestion)



// create function to fetch data from API
function fetchQuestion(){
    try{
        let url = setting.geturl();
        settingDiv.style.display = 'none';
        loader.style.display = 'block';

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            // get questions
            const response = this.responseText;
            const questions = JSON.parse(response);
            // console.log(questions);

            // check if questions error display msg to user
            if (questions.error) {
               error_msg.innerText = questions.error;
                loader.style.display = 'none';
            }
            else // if exist questions create object from Question
            {
                let q = new Question(questions,5);
                // display questions
                q.display();
            }
            
        }
        xhttp.open("GET", url);
        xhttp.send();       
    } catch (error) {
        error_msg.innerText = error;
        setTimeout(()=>{error_msg.innerText = '';},2000)
    }
}