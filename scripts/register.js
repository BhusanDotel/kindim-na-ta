let credential = JSON.parse(localStorage.getItem("credential")) || [];

const register = document.querySelector(".register-button");
register.addEventListener('click', () => {
    const email = document.querySelector(".email-input").value;
    const password = document.querySelector(".password-input").value;

    const text1 = document.querySelector(".text1-input").value;
    const text2 = document.querySelector(".text2-input").value;
    const text3 = document.querySelector(".text3-input").value;

    if (email === '' || password === '' || text1==='' || text2==="" || text3==="") {
        alert('Please, fill all fields!');
    } else {
        const emailExists = credential.some(item => item.userEmail === email);
        if (emailExists) {
            // alert('Email already exists!');
            document.querySelector(".message").textContent="Email already exists!";
        } else {
            credential.push({
                userEmail: email,
                userPassword: password
            });

            document.querySelector(".email-input").value="";
            document.querySelector(".password-input").value="";
            document.querySelector(".text1-input").value="";
            document.querySelector(".text2-input").value="";
            document.querySelector(".text3-input").value="";

            localStorage.setItem("credential",(JSON.stringify(credential)));
            document.querySelector(".registration-success").innerHTML=`<p class="reg-complete">Registration comlpete <a class="click-here" href="./index.html">CLick Here!</a> to login</p>`;
        }
    }
});