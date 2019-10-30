<template>
	<div class="ani-slideInDown row justify-content-center">
		<div class="col-lg-6">
			<ToDoInput @eventAddNewTask="onAddNewTask"/>

			<ul class="list mt-3">
				<ListItem 
                    v-for="item in itemList" 
                    :key="getRefid(item)" 
                    :id="getRefid(item)" 
                    :text="item.data.text" 
                    :isDone="item.data.isDone" 
                    @eventTaskStatusChange="onTaskStatusChange" 
                    @eventTaskDelete="onTaskDelete" 
                />
			</ul>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import ToDoInput from "@/components/ToDoInput.vue"
    import ListItem from "@/components/ListItem.vue"
    import todosService from "@/_services/todos.service"

	export default {
		name: "home",
		components: {
			ToDoInput,
			ListItem
		},
		data() {
            return {
                itemList: []
            }
        },
        methods: {
            /**
             * Event: getTodRefId
             */
            getRefid(todo) {
                if(!todo.ref) {
                    return null
                }
                return todo.ref['@ref'].id;
            },
			/**
			 * Event: add new task
			 */
			onAddNewTask(taskName) {
				const task = {
					// id: (new Date()).getTime(),
					text: taskName,
					isDone: false
                }
                todosService.create(task).then(res => {
                    // console.log('API create response', res)
                    this.itemList.push(res)
                })

			},

            /**
             * Event: on task status changed
             */
            onTaskStatusChange(id, checked) {
                // console.log(id, checked)

                let item = this.itemList.find(e => this.getRefid(e) == id)
                if (item) {
                    item.data.isDone = checked
                    todosService.update(id, item.data)
                }
                
                // console.log(this.itemList)
            },

            /**
             * Event: on task deleted
             */
            onTaskDelete(id) {
                let index = this.itemList.findIndex(e => this.getRefid(e) == id)
                if (index > -1) {
                    this.itemList.splice(index, 1)
                    todosService.delete(id);
                }
            },

            /**
             * Load item list from local storage
             */
            loadItemList() {
                // this.itemList = JSON.parse(localStorage.getItem("VuejsTodo")) || []

                todosService.readAll().then((todos) => {
                    if (todos.message === 'unauthorized') {
                        if (this.isLocalHost()) {
                        alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
                        } else {
                        alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
                        }
                        return false
                    }

                    // console.log('all todos', todos)
                    this.itemList = todos;
                })
            },
            isLocalHost() {
                const isLocalhostName = window.location.hostname === 'localhost';
                const isLocalhostIPv6 = window.location.hostname === '[::1]';
                const isLocalhostIPv4 = window.location.hostname.match(
                    // 127.0.0.1/8
                    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
                );

                return isLocalhostName || isLocalhostIPv6 || isLocalhostIPv4;
            }
        },
        mounted() {
            // Load item list from local storage
            this.loadItemList()
        }
	}
</script>
