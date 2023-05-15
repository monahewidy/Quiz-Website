// Register User

let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let sp_image = document.querySelector("#sp_image");
let divForImage = document.querySelector("#div_image")
let choicedImage = document.querySelectorAll("img");
let span = document.getElementsByClassName("span_validation")
let registerBtn = document.querySelector(".btn");
var storedImage

var userData = {
    username: "",
    email: "",
    password: "",
    image: ""
}



registerBtn.addEventListener("click", register);

function register(e) {
    e.preventDefault();
    if (username.value === "" || email.value === "" || password.value === "") {
        alert("Please Fill Data");
    } else {
        var namePattern = /^[a-zA-Z]{5,20}[0-9]*$/
        var emailPattern = /^[a-zA-Z]{1,}(.|_)*[0-9]*(@)(gmail|hotmail|outlock|yahoo)(.com)$/
        var passwordPattern = /[A-Z]+[a-z]*[0-9]+\W|_/
        var validName, validPassword, validEmail
        if (!namePattern.test(username.value)) {
            span[0].style.display = "block"
            span[0].innerText = "*Please enter a valid name "

        }
        else {
            validName = username.value
        }
        if (!emailPattern.test(email.value)) {
            span[1].style.display = "block"
            span[1].innerText = "*Please enter a valid mail address"
        }
        else {
            validEmail = email.value
        }
        if (!passwordPattern.test(password.value)) {
            // alert()
            span[2].style.display = "block"
            span[2].innerText = "*a valid password should contain at least one capetal character, special character and number"
        }
        else {
            validPassword = password.value
        }

        if (validEmail && validName && validPassword) {
            userData.username = validName
            userData.email = validEmail
            userData.password = validPassword
            localStorage.setItem("userData", JSON.stringify(userData));
            span[3].style.display = "block"
            span[3].style.color = "lightgreen"
            span[3].innerText = "*Sign up successfully"
            window.open("../../index2.html", "_self");

            if (storedImage) {
                userData.image =storedImage.split("images/")[1]
                localStorage.setItem("userData", JSON.stringify(userData));
            }
            else {
                userData.image = "defualt.jpg"
                localStorage.setItem("userData", JSON.stringify(userData));

            }
        }
        else {
            // alert("can't sign up please try again with valid data")
            span[3].style.display = "block"
            span[3].innerText = "*can't sign up please try again with valid data"
        }

    }

}

sp_image.addEventListener("click", function (evt) {
    divForImage.style.display = "block";
    for (let choiced of choicedImage) {


        choiced.addEventListener("click", function (evt) {
            storedImage = choiced.src
        })
    }

})





