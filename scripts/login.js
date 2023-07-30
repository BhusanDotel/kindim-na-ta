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
            document.querySelector(".login-fail").innerHTML=`<p class="login-fail-message">Email and Password unverified! If your aren't a user!<a class="click-here-1" href="./register.html">click here</a> to register</p>`;
        }else{
            credential.forEach((items) =>{
                const saved_email = items.userEmail;
                const saved_password = items.userPassword;
                if(input_email===saved_email && input_password===saved_password){
                    localStorage.setItem('authToken', `${Math.random()}`);
                    const newURL = './home.html';
                    window.location.href = newURL;
                }else{
                    document.querySelector(".login-fail").innerHTML=`<p class="login-fail-message">Email and Password not matched! If your are new !<a class="click-here-1" href="./register.html">click here</a> to register</p>`;
                }                   
            });
        }
    }
});