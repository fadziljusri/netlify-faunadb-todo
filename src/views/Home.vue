<template>
	<div class="ani-slideInDown row justify-content-center">
		<div class="col-lg-6">
			<ToDoInput @eventAddNewTask="onAddNewTask"/>

			<ul class="list mt-3">
				<ListItem v-for="item in itemList" :key="item.id" :text="item.text" :id="item.id" :isDone="item.isDone" @eventTaskStatusChange="onTaskStatusChange" @eventTaskDelete="onTaskDelete" />
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
			 * Event: add new task
			 */
			onAddNewTask(taskName) {
				const task = {
					id: (new Date()).getTime(),
					text: taskName,
					isDone: false
                }

               
                this.itemList.push(task)
                
                // todosService.create(task).then(res => {
                //     console.log('API create response', res)
                // })

			},

            /**
             * Event: on task status changed
             */
            onTaskStatusChange(id, checked) {
                console.log(id, checked)

                let item = this.itemList.find(i => i.id == id)
                if (item) {
                    item.isDone = checked
                }
                
                console.log(this.itemList)
            },

            /**
             * Event: on task deleted
             */
            onTaskDelete(id) {
                console.log(id)

                let index = this.itemList.findIndex(i => i.id == id)
                if (index > -1) {
                    this.itemList.splice(index, 1)
                }

                console.log(this.itemList)
            },

            /**
             * Load item list from local storage
             */
            loadItemList() {
                this.itemList = JSON.parse(localStorage.getItem("VuejsTodo")) || []

                console.log("this.itemList =", this.itemList)

                // todosService.readAll().then((todos) => {
                //     if (todos.message === 'unauthorized') {
                //         if (isLocalHost()) {
                //         alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
                //         } else {
                //         alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
                //         }
                //         return false
                //     }

                //     console.log('all todos', todos)
                //     // this.itemList = todos;
                // })
            },

            /**
             * Update the item list to local storage
             */
            updateItemList() {
                localStorage.setItem("VuejsTodo", JSON.stringify(this.itemList))
            }
        },
        mounted() {
            // Load item list from local storage
            this.loadItemList()
        },
        watch: {
            itemList: {
                handler(value) {
                    console.log("item changed")

                    // save to localStorage
                    this.updateItemList()
                },
                deep: true
            }
        }
	}
</script>
