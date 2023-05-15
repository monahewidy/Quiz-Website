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



/*test*/
// let data = {
//     username:"mona",
//     email:"ddd@gmail.com",
//     score: 100,
//     image: "1.png",
// }
// localStorage.setItem("num1", JSON.stringify(data));

let num1 = JSON.parse(localStorage.getItem('num1'));
let num2 = JSON.parse(localStorage.getItem('num2'));
let num3 = JSON.parse(localStorage.getItem('num3'));

let highScoresList = document.getElementById('highScoresList');
//save items in array
let dataItem = [num1,num2,num3];
let arr = ['1st','2nd','3rd'];
function showDate(){
    for(let i = 0; i < dataItem.length; i++){
        //we use for loop to use data
        // we make it += to save the old data & add new one to it
        // to start from no. 1 add 1 like i+1
        if (!dataItem[i]) {
            continue;
        }
        highScoresList.innerHTML += `
        <li>
            <span style="font-weight: 900;color:#0093E9;">${arr[i]}</span>&nbsp;
            <img src="../../images/${dataItem[i].image}" style="font-size: 2rem;border-radius: 50%;width: 50px;height: 50px;" > &nbsp;
            <span style="text-transform: uppercase;font-weight: bold;">${dataItem[i].username}</span> 
            <span style="margin-left: 10vw;background: -webkit-linear-gradient(89.9deg, rgb(255, 90, 109) 2.6%, rgb(119, 76, 231) 97.9%); -webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: 900;">        ${dataItem[i].score}           </span><br>
            <span style="margin-left : 7vw;">${dataItem[i].email}</span>
        </li>
        `
    }
}
showDate()
// console.log(dataItem)






























