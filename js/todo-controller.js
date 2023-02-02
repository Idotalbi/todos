
function onInit() {
    // console.log('Ready')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
         <li onclick="onToggleTodo('${todo.id}')"
            class="${todo.isDone ? 'done' : ''}">
            ${todo.txt}
            ${todo.createAt}
            ${todo.importance}
            <button onclick="onRemoveTodo(event,'${todo.id}')">X</button> 
         </li> `)

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.total-todos-count').innerText = getTotalTodosCount()
    document.querySelector('.active-todos-count').innerText = getActiveTodosCount()
    document.querySelector('.done-todos-count').innerText = getDoneTodosCount()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('input[name="todo-txt"]')
    const elInputImportance = document.querySelector('input[name="todo-importance"]')

    addTodo(elInput.value, elInputImportance.value)
    // addTodo(elInput.value)
    renderTodos()
    elInput.value = ''
    elInputImportance.value = ''
}

function onSetFilter(filterBy) {
    console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(sortBy) {
    console.log('sortBy', sortBy)
    SetSort(sortBy)
    renderTodos()

}

