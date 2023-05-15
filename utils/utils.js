export function checkUser(path){
    // debugger
    let user = localStorage.getItem('userData');

    if (!user) {
       window.location.href = path
    }
    
};

// get image and name from userData
export function showUserData(image,name){
    let userPhoto = document.getElementById('user-photo');
    let userName = document.getElementById('user-name');

    userPhoto.src = image; // concatenate image path with image name
    userName.innerText = name;
};


export function logOut(path){
    localStorage.removeItem("userData");
    window.location.href = path //"./pages/register/index.html";
};