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
                 <i class="iconfont">&#xe624;</i>
                </a>
                <a href="#" @click="$emit('remove')" >
                 <i class="iconfont">&#xe63e;</i>
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