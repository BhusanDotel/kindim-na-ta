let credential = JSON.parse(localStorage.getItem("credential")) || [];

const register = document.querySelector(".register-button");
register.addEventListener('click', () => {
    const email = document.querySelector(".email-input").value;
    const password = document.querySelector(".password-input").value;

    const text1 = document.querySelector(".fname-input").value;
    const text2 = document.querySelector(".lname-input").value;
    const text3 = document.querySelector(".address-input").value;

    if (email === '' || password === '' || text1==='' || text2==="" || text3==="") {
        alert('Please, fill all fields!');
    } else {
        const emailExists = credential.some(item => item.userEmail === email);
        if (emailExists) {
            // alert('Email already exists!');

            startShake();

            document.querySelector(".email-already-use-div").innerHTML=`<p class="email-already-use-text">Email already in use!</p>`;
        } else {
            credential.push({
                userEmail: email,
                userPassword: password
            });

            document.querySelector(".email-input").value="";
            document.querySelector(".password-input").value="";
            document.querySelector(".fname-input").value="";
            document.querySelector(".lname-input").value="";
            document.querySelector(".address-input").value="";

            localStorage.setItem("credential",(JSON.stringify(credential)));

            document.querySelector(".registration-complete-div").innerHTML=`<p class="registration-complete-text">Registration Successfull <span class="tick">✓</span>`;

            document.querySelector(".redirecting-to-login-div").innerHTML=`<p class="redirecting-to-login-text">Redirecting to Login</p>
            <img class="loading-icon" src="images/loading-gif.gif">`;

            redirectToLogin();
        }
    }
});

function startShake(){
    const shake_div = document.querySelector(".main");
    shake_div.classList.add("shake");
    setTimeout(() => {
        shake_div.classList.remove('shake')
    },100);

    console.log(shake_div);
}

function redirectToLogin() {
    setTimeout(function() {
        window.location.href = "./index.html";
    }, 2000);
}