// importacao da url base para este arquivo
import { baseUrl } from "./urlBase.js";

// configuracao dos headers obrigatorios para request
const requestHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}


// função para redirecionar para página de login
function loginPage() {


  setTimeout(function() {
    window.location.href = '../index.html';
}, 1500);  
  

}

// funcao para autenticacao do cadastro.
export function authRegister() {


  //Objeto com os valores atualizados dos inputs enviados
  var userInfo = {
    firstName: document.querySelector('#userName').value,
    lastName: document.querySelector('#userSurname').value,
    email: document.querySelector('#userEmail').value,
    password: document.querySelector('#userPassword').value
  }


  // configuracao para envio da resquest para a API
  var requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(userInfo)
  }

  //envio de request com os dados de cadastro para a API
  fetch(`${baseUrl}/users`, requestConfig).then(
    response => {
      if (response.ok) {
        response.json().then(
          token => {
            console.log(token)
            localStorage.setItem('authToken', token.jwt)
          })

          Swal.fire({
            icon: 'success',
            title: `Usuário cadastrado com sucesso!`,
            showConfirmButton: false,
            timer: 1000
        })

        loginPage()

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro ao cadastrar, tente novamente!',
          timer: 1000
      })
       

       setTimeout(function() {
        window.location.href = '../pages/signup.html';
       }, 1500);  

        localStorage.clear()
      }
    }
  )
}


//Funcao com  as configuracoes para autenticacao do login
export function authLogin() {

  //Objeto com os valores dos inputs para validar
  var userInfo = {
    email: document.querySelector('#inputEmail').value,
    password: document.querySelector('#inputPassword').value
  }

  // configuracao para envio da resquest para a API
  var requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(userInfo)
  }


  // Envio da Request com os dados de login para a API
  fetch(`${baseUrl}/users/login`, requestConfig).then(
    response => {
      if (response.ok) {
        response.json().then(
          token => {

            console.log(token)
            localStorage.setItem('authToken', token.jwt)
          }
        )

        window.location.href = './pages/tarefas.html'

      } else {
     
          Swal.fire({
            title: 'Atenção!',
            text: 'O seu usuário ou senha está incorreto',
            icon: 'error'
          
          })
 
      }
    }
  )
}






