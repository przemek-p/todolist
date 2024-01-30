let toDoInput //miejsce gdzie wpisujemy treść zadania
let errorInfo //info o braku zadań oraz o konieczności wpisania tekstu
let addBtn // przycisk ADD dodaje nowe elementy do listy 
let ulList // listazadań oraz tagi ul
let newTodo // nowo dodane li
let popup // popup
let popupInfo // tekst w popupie jak się doda pusty tekst
let todoToEdit // edytowany Todo
let popupInput //input w popupie
let popupAddBtn // przycisk zatwierdź w popupie
let popupCloseBtn // przycisk anuluj w popupie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	toDoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}


const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', CheckClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	toDoInput.addEventListener('keyup', enterKeyCheck)
}


const addNewTodo = () => {
	if (toDoInput.value !== '') {
		newTodo = document.createElement ('li')
		newTodo.textContent = toDoInput.value
		createToolsArea ()		
		ulList.append(newTodo)

		toDoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania...'
	}
}

const createToolsArea = () => {
	const newDiv = document.createElement('div')
	newDiv.classList.add ('tools')
	newTodo.append(newDiv)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add ('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add ('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add ('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	newDiv.append(completeBtn, editBtn, deleteBtn)
}



const CheckClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteToDo(e)
	}
}

const editTodo = e => {
	todoToEdit = e.target.closest('li')

	popupInput.value = todoToEdit.firstChild.textContent

	console.log(todoToEdit.firstChild);
	popup.style.display = 'flex'
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}


const changeTodoText = () => {
	if(popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'wprowadź treść'
	}
}

const deleteToDo = e => {
	e.target.closest('li').remove()

	const allTodos = ulList.querySelectorAll('li')

	if(allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.'
	}
}
const enterKeyCheck = e => {
	if(e.key === 'Enter') {
		addNewTodo();
	}
	
}

document.addEventListener('DOMContentLoaded', main)