// window.addEventListener('scroll', function() {
//   var header = document.getElementById('header');
//   var headerHeight = header.offsetHeight;
//   var scrollPosition = window.scrollY;

//   if (scrollPosition > headerHeight) {
//     header.classList.add('sticky');
//   } else {
//     header.classList.remove('sticky');
//   }
// });


const apiUrl = "https://landing-page-backend-ju8i.onrender.com";

document.getElementById('menuBtn').addEventListener('click', function() {
  document.getElementById('menu').classList.toggle('open');
});


let formElement = document.getElementById('formElement');

let fullnameInput = document.getElementById('fullnameInput');
let emailInput = document.getElementById('emailInput');
let messageInput = document.getElementById('messageInput');

let errMsg = document.getElementById('errMsg');



formElement.addEventListener('submit', async function(event) {
    console.log("form submit")
    event.preventDefault();


    if (fullnameInput.value === "" && emailInput.value === "" && messageInput.value === "") {
        errMsg.textContent = "*Please Enter All Fields";
        errMsg.classList.remove('hide-error-msg');

        setTimeout(() => {
            errMsg.classList.add('hide-error-msg');
        }, 1500);
    }    
    else {
        errMsg.classList.add('hide-error-msg');


        const body = {
            fullname: fullnameInput.value,
            email: emailInput.value,
            message: messageInput.value,
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        const response = await fetch(`${apiUrl}/user`, options);
        const data = await response.json();

        if (!response.ok) {
            errMsg.textContent = "Failed to send message!";

            setTimeout(() => {
                errMsg.classList.add('hide-error-msg');
            }, 1500);
        }
        else {
            errMsg.classList.remove('hide-error-msg');
            errMsg.textContent = "Message sent successfully!";
            errMsg.style.color = "green";

            setTimeout(() => {
                errMsg.classList.add('hide-error-msg');
            }, 1500);

            fullnameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";
        }
    }


})