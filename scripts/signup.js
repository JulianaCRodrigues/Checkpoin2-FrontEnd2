// importacao das função para autentilcação do cadastro do usuário e verificação dos requisitos de segurança.
import { authRegister } from './auth.js'

const userNameRef = document.querySelector('#userName')
const userSurnameRef = document.querySelector('#userSurname')
const userEmailRef = document.querySelector('#userEmail')
const userPasswordRef = document.querySelector('#userPassword')
const confirmPasswordRef = document.querySelector('#confirmPassword')
const bntRegisterRef = document.querySelector('#bntRegister')
const openEyeRef = document.querySelector('#openPassword')
const closeEyeRef = document.querySelector('#closePassword')
const confirmOpenRef = document.querySelector('#confirmOpen')
const confirmCloseRef = document.querySelector('#confirmClose')

//Objeto com os valores atualizados dos inputs enviados
var formErrors = {
  userName: true,
  userSurname: true,
  userEmail: true,
  userPassword: true,
  confirmPassword: true
};


//Função que verifica se os valores do formulário estão correto para efetuar o cadastro
function checkFormValidity() {
  const formErrorsArray = Object.values(formErrors)
  const formValidity = formErrorsArray.every(item => item === false)

  bntRegisterRef.disabled = !formValidity;

}

//Função que valida os valores inseridos nos inputs nome e sobrenome conforme requisitos exigidos.
function validateInput(inputRef) {

  const inputValid = inputRef.checkValidity()
  const elementFatherRef = inputRef.parentElement

  if (inputValid) {
    elementFatherRef.classList.remove('error')

  } else {
    elementFatherRef.classList.add('error')
  }

  formErrors[inputRef.id] = !inputValid

  checkFormValidity()
}


//Função que valida o e-mail do usuário como um endereço válido conforme requisitos exigidos.
function validateEmail() {
  const emailValid = userEmailRef.checkValidity();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValid && regex.test(userEmailRef.value)) {
    userEmailRef.parentElement.classList.remove('error');
    formErrors.userEmail = false;
  } else {
    userEmailRef.parentElement.classList.add('error');
    formErrors.userEmail = true;
  }
  checkFormValidity();
}

//Função que valida a senha do usuário conforme requisitos exigidos.
/*
• Mínimo de oito caracteres.
• Letra maiúscula
• Letra minúscula 
• Números
*/
function validatePassword() {
  const passwordValid = userPasswordRef.checkValidity();
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
  if (passwordValid && regex.test(userPasswordRef.value)) {
    userPasswordRef.parentElement.classList.remove('error');
    formErrors.userPassword = false;
  } else {
    userPasswordRef.parentElement.classList.add('error');
    formErrors.userPassword = true;
  }
  checkFormValidity();
}


//Função para validar a confirmação da senha e a mesma estar igual ao valor difitado no input senha
function validateConfirmPassword(senha, confirm) {
  senha = userPasswordRef.value
  confirm = confirmPasswordRef.value

  if (senha === confirm) {
    confirmPasswordRef.parentElement.classList.remove('error');
    formErrors.confirmPassword = false;
  } else {
    confirmPasswordRef.parentElement.classList.add('error');
    formErrors.confirmPassword = true;
  }
  checkFormValidity()
}
function seePassword () {
  var input = userPasswordRef


  input.type = input.type == 'text' ? 'password' : 'text';


  if (input.type == 'text') {
    openEyeRef.classList.add('hide')
    closeEyeRef.classList.remove('hide')
  } else {
    openEyeRef.classList.remove('hide')
    closeEyeRef.classList.add('hide')

  }

}

function seeConfirmPassword (){
 
  var inputConfirm = confirmPasswordRef

 inputConfirm.type = inputConfirm.type == 'text' ? 'password' : 'text';

  if (inputConfirm.type == 'text') {
    confirmOpenRef.classList.add('hide')
    confirmCloseRef.classList.remove('hide')
  } else {
    confirmOpenRef.classList.remove('hide')
    confirmCloseRef.classList.add('hide')

  }
}

//Função que limpa s informações digitadas no campo dos formulários
function resetForm() {
  userNameRef.value = ''
  userSurnameRef.value = ''
  userEmailRef.value = ''
  userPasswordRef.value = ''
  confirmPasswordRef.value = ''
}


function checkRegister(e) {
  e.preventDefault();
  authRegister()
  resetForm()
}


userNameRef.addEventListener('keyup', () => validateInput(userNameRef))
userSurnameRef.addEventListener('keyup', () => validateInput(userSurnameRef))
userEmailRef.addEventListener('keyup', validateEmail)
userPasswordRef.addEventListener('keyup', validatePassword)
confirmPasswordRef.addEventListener('keyup', () => validateConfirmPassword(confirmPasswordRef))
bntRegisterRef.addEventListener('click', checkRegister)
openEyeRef.addEventListener('click', seePassword);
closeEyeRef.addEventListener('click', seePassword)
confirmCloseRef.addEventListener('click', seeConfirmPassword)
confirmOpenRef.addEventListener('click', seeConfirmPassword)