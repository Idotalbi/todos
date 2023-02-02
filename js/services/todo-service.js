
var gTodos
var gFilterBy = 'all'
var gSortBy = 'txt'
const STORAGE_KEY = 'todosDB'

_createTodos()

function getTodosForDisplay() {
    SortTodos()
    if (gFilterBy === 'all') return gTodos
    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function SortTodos() {
    if (gSortBy === 'txt') return gTodos.sort((a, b) => {
        const txtA = a.txt.toUpperCase()
        const txtB = b.txt.toUpperCase()
        if (txtA < txtB) return -1
        if (txtA > txtB) return 1
        return 0
    })
    else if (gSortBy === 'createAt')
        gTodos.sort((o1, o2) => {
            if (sort_o1_before_o2) return -1;
            else if (sort_o1_after_o2) return 1;
            else return 0;
        });
    else (gSortBy === 'importance')
    return gTodos.sort((a, b) => b.importance - a.importance)

}


function removeTodo(todoId) {
    var sure = confirm('you Sure?')
    if (!sure) return
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)
}

function addTodo(txt, importance) {
    // if(!elInput) return
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}
function SetSort(sortBy) {
    gSortBy = sortBy
}



function getTotalTodosCount() {
    if (!gTodos.length) return 'No Todos'
    return gTodos.length
}

function getActiveTodosCount() {
    var activeTodos = gTodos.filter(todo => !todo.isDone).length
    if (!activeTodos) return 'No Active'
    return activeTodos
}

function getDoneTodosCount() {
    var doneTodos = gTodos.filter(todo => todo.isDone).length
    if (!doneTodos) return 'No Done'
    return doneTodos
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)

    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance) {
    
    saveToStorage(STORAGE_KEY, gTodos)
    return {
        id: _makeId(),
        txt,
        isDone: false,
        createAt: getDate(),
        importance,
    }

}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


// var res = getDate()
// console.log('res:', res)
function getDate() {
    gTodos = loadFromStorage(STORAGE_KEY)
    return new Date().toLocaleTimeString()
}