/* Frontend code from src/utils/api.js */
/* Api methods to call /functions */

const create = (data) => {
    return fetch('/.netlify/functions/todos-create', {
        body: JSON.stringify(data),
        method: 'POST'
    }).then(response => {
        // console.log("create", response);
        return response.json()
    })
}

const readAll = () => {
    return fetch('/.netlify/functions/todos-read-all').then((response) => {
        // console.log("readAll", response);
        return response.json()
    })
}

const update = (todoId, data) => {
    return fetch(`/.netlify/functions/todos-update/${todoId}`, {
        body: JSON.stringify(data),
        method: 'POST'
    }).then(response => {
        return response.json()
    })
}

const deleteTodo = (todoId) => {
    return fetch(`/.netlify/functions/todos-delete/${todoId}`, {
        method: 'POST',
    }).then(response => {
        return response.json()
    })
}

const batchDeleteTodo = (todoIds) => {
    return fetch(`/.netlify/functions/todos-delete-batch`, {
        body: JSON.stringify({
            ids: todoIds
        }),
        method: 'POST'
    }).then(response => {
        return response.json()
    })
}

export default {
    create: create,
    readAll: readAll,
    update: update,
    delete: deleteTodo,
    batchDelete: batchDeleteTodo
}