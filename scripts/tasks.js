// importacao da url base para este arquivo
import { baseUrl } from "./urlBase.js";

const nameUserRef = document.querySelector('#userName')
const taskRef = document.querySelector('.nova-tarefa')
const btnCreateTaskRef = document.querySelector('#btnCreateTask')
const pendingTasksRef = document.querySelector('.tarefas-pendentes')
const finishedTasksRef = document.querySelector('.tarefas-terminadas')
const newTaskRef = document.querySelector('#novaTarefa')
const btnLogoutRef = document.querySelector('#buttonLogout')

// Pegar o token de autorização no localStorage
const authToken = localStorage.getItem('authToken')

// variáveis para inserir os dados
var tasksPendentes = []
var tasksConcluidas = []

// configuracao dos headers obrigatorios para as request
const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
}

// Objetos com os dados sobre as tarefas para base de envio pra API
const taskData = {
    description: '',
    completed: false
}


// Função para deslogar usário e limpar os dados aramazenados no localStorage
function logout(e) {
    e.preventDefault()
    localStorage.clear()
    window.location.href = '../index.html'

}


// Função que armazena o valor digitado na descrição da tarefa
function valueTasks(task) {

    taskData.description = task;
}


// Função que irá limpar zerar os dados da tela para recolocar ao ser chamado o getTask e reiniciar a organização
function resetSplitedTasks() {
    tasksPendentes = []
    tasksConcluidas = []

}


// Função para a criação de uma tarefa
function creatTask() {

    // configuracao para envio da resquest para a API
    var requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(taskData)
    }

    fetch(`${baseUrl}/tasks`, requestConfig).then(
        response => {
            if (response.ok) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Tarefa criada com sucesso!'
                  })

                resetSplitedTasks()
                getTasks()

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocorreu um erro, tente novamente!',
                })
            }
        }

    )
    // limpa o input ao enviar a tarefa criada
    newTaskRef.value = ''
}


// Função para validar e liberar uma nova tarefa
function inputTask(event) {
    event.preventDefault()
    let inputTask = newTaskRef.value
    if (inputTask.length >= 4) {
        creatTask()
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Atenção!',
            text: `Erro ao criar a tarefa.
            O texto precisa ter no mínimo 4 caracteres. 
            Tente novamente!`,
        })
    }
}


// Função para atualização da tarefa para concluída.
function updateTask(id, description) {

    // Objetos com os dados sobre as tarefas para base de envio pra API   
    const completeTask = {
        description: description,
        completed: true
    }

    // configuracao para envio da resquest para a API
    var requestConfig = {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(completeTask),
    }

    fetch(`${baseUrl}/tasks/${id}`, requestConfig).then(
        response => {
            if (response.ok) {

                resetSplitedTasks()
                getTasks()

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocorreu um erro, tente novamente!',
                })
            }
        }

    )
}


// Função para deletar uma tarefa da aplicação.
function deleteTask(id) {


    // configuracao para envio da resquest para a API
    var requestConfig = {
        method: 'DELETE',
        headers: requestHeaders,
    }

    fetch(`${baseUrl}/tasks/${id}`, requestConfig).then(
        response => {
            if (response.ok) {
                resetSplitedTasks()
                getTasks()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocorreu um erro, tente novamente!',
                })
            }
        }

    )
}


// Função para determinar qual o botão de qual tarefa está sendo clicado no momento para realizar a ação.
function addEventListenersToButtons() {
    const tasksPendingRef = document.querySelectorAll('.tarefas-pendentes .tarefa');
    const peddingTask = Array.from(tasksPendingRef)

    peddingTask.map(
        (item, index) => {
            const tasksFinish = item.querySelector('.finished-task-button');
            const taskExcluir = item.querySelector('.erase-task-button');
            const currentTaskInArray = tasksPendentes[index];

            if (tasksFinish) {
                tasksFinish.addEventListener('click', () => updateTask(currentTaskInArray.id));
            }
            if (taskExcluir) {
                taskExcluir.addEventListener('click', () => deleteTask(currentTaskInArray.id));
            }
        });

    const tasksCompleteRef = document.querySelectorAll('.tarefas-terminadas .tarefa');
    const completeTask = Array.from(tasksCompleteRef)

    completeTask.map(
        (item, index) => {
            const taskDelete = item.querySelector('.delete-task-button');
            const currentTaskInArray = tasksConcluidas[index];

            taskDelete.addEventListener('click', () => deleteTask(currentTaskInArray.id));
        });
}


// Função que inseres no HTML os dados das tarefas que retornaram da API
function insertTasksHtml() {

    pendingTasksRef.innerHTML = ''
    finishedTasksRef.innerHTML = ''

    tasksPendentes.map(task => {
        const createdAtDate = new Date(task.createdAt)
        const createAtFormted = new Intl.DateTimeFormat('pt-BR').format(createdAtDate)

        pendingTasksRef.innerHTML += `
        <li class="tarefa">
            <div class="not-done"></div>
                <div class="elements">
                    <p class="nome">${task.description}</p>
                    <p class="timestamp">Criada em: ${(createAtFormted)}</p>
                    <button class="finished-task-button">Terminar Tarefa</button>
                    <button class="erase-task-button">Deletar Tarefa  </button>
                </div>
            </div>
        </li>    
        
        `
    }
    )

    tasksConcluidas.map(task => {
        const createdAtDate = new Date(task.createdAt)
        const createAtFormted = new Intl.DateTimeFormat('pt-BR').format(createdAtDate)

        finishedTasksRef.innerHTML += `
        <li class="tarefa">
          <div class="done"></div>
          <div class="elements">
            <p class="nome">${task.description}</p>
            <p class="timestamp">Criada em: ${(createAtFormted)}</p>
            <button class="delete-task-button">Deletar Tarefa  </button>
          </div>
        </li>     
      `
    }
    )

    addEventListenersToButtons()
}


// Função que separa as tarefas obtidas da API conforme status complete TRUE ou FALSE
function splitTasks(tasks) {

    tasks.map(task => {

        if (task.completed) {

            tasksConcluidas.push(task)

        } else {

            tasksPendentes.push(task)
        }
    })

    insertTasksHtml()
}


// Função que faz  a requisição dos dados das tarefas do usuário para a API
function getTasks() {

    var requestConfig = {
        method: 'GET',
        headers: requestHeaders
    }

    fetch(`${baseUrl}/tasks`, requestConfig).then(
        response => {
            if (response.ok) {
                response.json().then(
                    tasks => {
                        setTimeout(() => splitTasks(tasks), 1000)

                    }
                )
            }
        })
}


// Função que faz  a requisição dos dados do usuário para a API
// Caso os dados sejam inválidos o usuário e desconectado e redirecionado a página de login
function getUserData() {

    var requestConfig = {
        method: 'GET',
        headers: requestHeaders
    }

    fetch(`${baseUrl}/users/getMe`, requestConfig).then(
        response => {
            if (response.ok) {
                //preencher HTML
                response.json().then(
                    data => {
                        nameUserRef.innerHTML = `
                   ${data.firstName} ${data.lastName}`

                        Swal.fire({
                            icon: 'success',
                            title: `Seja muito bem-vindo(a) ${data.firstName} ${data.lastName}`,
                            showConfirmButton: false,
                            timer: 1500
                        })

                        getTasks()
                    }
                )
            } else {
                if (response.status === 401) {
                    logout()
                }
            }
        })
}




// funcao para validacao do token do usuário salvo no localStorage
// Caso o token seja inválido o usuário é redirecionado para página de login
function checkIfAuthTokenExist() {
    if (authToken === null) {
        logout()
    } else {
        getUserData()
    }
}

checkIfAuthTokenExist();

// Eventos que irão acionar aslgumas das ações da página
taskRef.addEventListener('keyup', (event) => valueTasks(event.target.value))
btnCreateTaskRef.addEventListener('click', (event) => inputTask(event));
btnLogoutRef.addEventListener('click', (event) => logout(event))



