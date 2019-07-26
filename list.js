Vue.component('todo-item', {
    props: ['todo'],
    template: `<li>
        <div class="contentlist">
            <div>
            <input type="checkbox" id="checkbox" v-on:change="finish(todo)" :checked="todo.isfinished" >
            <label for="checkbox"></label>
                <span v-if="!todo.isedit" :class="{finished:todo.isfinished}">{{todo.title}}</span>
                <input type="text" v-model="todo.title" v-if="todo.isedit">
            </div>
            <div class="contentlist-right">
                <a href="#" v-on:click="edit(todo)">
                <svg t="1564029386314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3872" width="15" height="15">
                <path d="M801.792 55.296c-47.104 0-90.112 17.408-119.808 47.104L123.904 665.6 55.296 972.8l307.2-68.608L921.6 336.896c29.696-29.696 47.104-72.704 47.104-119.808C968.704 128 896 55.296 801.792 55.296zM324.608 862.208l-145.408 33.792 0-51.2-51.2 0 33.792-145.408 161.792 0L323.584 862.208zM362.496 836.608 362.496 678.912c0-13.312-8.192-21.504-21.504-21.504l-153.6 0 447.488-448.512 179.2 175.104L362.496 836.608zM891.904 307.2l-47.104 47.104L669.696 179.2l47.104-47.104c0 0 33.792-38.912 90.112-38.912 68.608 0 123.904 55.296 123.904 123.904C925.696 256 913.408 285.696 891.904 307.2z" p-id="3873">
                </path>
                </svg>
                </a>
                <a href="#" @click="$emit('remove')" >
                    <svg t="1563960973502" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3481" width="15" height="15">
                        <path d="M707 992H317c-51.3 0-93.5-40.2-95.9-91.4l-29.1-611c-0.8-17.7 12.8-32.7 30.4-33.5 17.5-1.1 32.7 12.8 33.5 30.4l29.1 611c0.8 17.1 14.8 30.5 32 30.5h390c17.1 0 31.2-13.4 32-30.5l29.1-611c0.8-17.7 16.4-31.2 33.5-30.4 17.7 0.8 31.3 15.8 30.4 33.5l-29.1 611c-2.5 51.2-44.6 91.4-95.9 91.4zM864 192H160c-17.7 0-32-14.3-32-32s14.3-32 32-32h704c17.7 0 32 14.3 32 32s-14.3 32-32 32zM576 96H448c-17.7 0-32-14.3-32-32s14.3-32 32-32h128c17.7 0 32 14.3 32 32s-14.3 32-32 32z" fill="#243154" p-id="3482">
                        </path>
                        <path d="M448 768c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32s32 14.3 32 32v352c0 17.7-14.3 32-32 32zM576 768c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32s32 14.3 32 32v352c0 17.7-14.3 32-32 32z" fill="#243154" p-id="3483"></path>
                    </svg>
                </a>
            </div>
        </div>
    </li>`,
    methods: {
        finish: function (todo) {
            todo.isfinished = !todo.isfinished;
        },
        edit: function (todo) {
            todo.isedit = !todo.isedit;
        }
    }
})
new Vue({
    el: '#content',
    data: {
        newTodoText: '',
        todos: [
            {
                id: 1,
                title: '去买柠檬🍋',
                isfinished: false,
                isedit: false
            },
            {
                id: 2,
                title: '去学习📖',
                isfinished: false,
                isedit: false
            }
        ],
        filter: 'show_all',
        nextTodoId: 3
    },
    computed: {
        tdlist: function () {
            if (this.filter === 'show_all') { return this.todos; }
            else if (this.filter === 'show_finished') {
                return this.gettodos(true);
            }
            else {
                return this.gettodos(false);
            }
        },
        allcount: function(){
            return Object.keys(this.todos).length;
        },
        finishedcount: function(){
            var thiss=this;
           return Object.keys(this.todos).filter(function(value) {
                return thiss.todos[value].isfinished
              }).length;
        },
        unfinishedcount: function(){
            var thiss=this;
            return Object.keys(this.todos).filter(function(value) {
                 return !thiss.todos[value].isfinished
               }).length;
        }
    },
    methods: {
        addTodo: function () {
            this.newTodoText = this.newTodoText.trim();
            if (this.newTodoText < 1) {
                return;
            }
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText,
                isfinished: false,
                isedit: false
            })
            this.newTodoText = ''
        },
        setfilter: function (filter) {
            this.filter = filter;
        },
        gettodos: function(isfinished) {
            var list = {};
            for(var index in this.todos) {
              if(this.todos[index].isfinished === isfinished) {
                list[index] = this.todos[index];
              }
            }
            return list;
          }
    }
})