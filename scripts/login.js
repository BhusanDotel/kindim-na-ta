const authToken = localStorage.getItem('authToken');
if (authToken) {
    window.location.href = './home.html';
}
let credential = JSON.parse(localStorage.getItem("credential")) || [];

const register = document.querySelector(".login-button");
register.addEventListener('click', () => {
    const input_email = document.querySelector(".email-input").value;
    const input_password = document.querySelector(".password-input").value;
    if(input_email==="" || input_password===""){
        alert("Please! fill all fields")
    }else{
        if(credential.length===0){
            document.querySelector(".login-fail-div").innerHTML=`<p class="login-fail-text">I couldn't recognize you. Try again!</p>`;

            startShake();

            document.querySelector(".email-input").value="";
            document.querySelector(".password-input").value="";
        }else{
            credential.forEach((items) =>{
                const saved_email = items.userEmail;
                const saved_password = items.userPassword;
                if(input_email===saved_email && input_password===saved_password){
                    localStorage.setItem('authToken', `${Math.random()}`);
                    const newURL = './home.html';
                    window.location.href = newURL;
                }else{
                    document.querySelector(".login-fail-div").innerHTML=`<p class="login-fail-text">I couldn't recognize you. Try again!</p>`;

                    startShake();

                    document.querySelector(".email-input").value="";
                    document.querySelector(".password-input").value="";
                }                   
            });
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