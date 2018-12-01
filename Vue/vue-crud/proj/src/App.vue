<!-- ./src/App.vue -->
<template>
  <div id="app">
    <h1> {{ title }} </h1>
    <h3>New Book</h3>
    <form v-on:submit.prevent="onSubmit">
      <div>
        <input name="title" type="text" placeholder="title" v-model="book.title" />
      </div>
      <div>
        <input name="year" type="text" placeholder="year" v-model="book.year" />
      </div>
      <div>
        <input name="author" type="text" placeholder="author" v-model="book.author" />
      </div>
      <div>
        <label for="read">Read?</label>
        <input type="checkbox" v-model="book.read" id="read" name="read" style="width:20px;" />
      </div>
      <button v-if="updating">Update</button>
      <button v-else>Add</button>
    </form>

    <h3>All books</h3>
    <table >
        <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Author</th>
            <th>Read</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
        <tr v-for="(b, index) in books">
            <td>{{b.title}}</td>
            <td>{{b.year}}</td>
            <td>{{b.author}}</td>
            <td v-if="b.read">✓</td>
            <td v-else>x</td>
            <td v-on:click.prevent="onEdit(index)"><a>✎</a></td>
            <td v-on:click.prevent="onDelete(index)"><a>✗</a></td>
        </tr>
    </table>
  </div>
</template>

<script>

export default {
    name: 'app',
    data () {
        return {
            title: 'My Books Manager',
            updating: false,
            updateIndex:0,
            book: {
                title: '',
                year: '',
                author: '',
                read: false
            },
            books: []
        }
    },
    methods: {
        onSubmit (){
            if(this.updating){
                this.onUpdate();
                return
            }
            this.books.push(this.book);
            localStorage.setItem(this.book.title, JSON.stringify(this.book))
            this.book = {
                title: '',
                year: '',
                author: '',
                read: false
            }
        },
        onEdit(index){
            this.updating = true;
            this.updateIndex = index;
            this.book = this.books[index]
        },
        onUpdate(){
            this.updating = false;
            this.book[this.updateIndex] = this.book;
            this.book = {
                title: '',
                year: '',
                author: '',
                read: false
            }
        },
        onDelete(index){
            this.book.splice(index, 1)
        }
    }
}
</script>
<style media="screen" scoped>
    #app{

        width: 500px;
        border:2px solid #058;
        margin: 0 auto;
        padding:10px;
        text-align: center;
        margin-top: 50px;
    }
    form input{
        text-align: left;
        padding:4px 10px;
        font-size: 16px;
        margin-bottom: 10px;
        width: 440px;

    }
    form button{
        display: block;
        padding: 4px 10px;
        font-size: 18px;
        background: #188fff;
        color: #fff;
        border-radius: 4px;
        border:none;
        width: 90%;
        margin-left: 20px;
        margin-right: 20px;
    }
    table{
        width: 100%;
        border:1px solid #ddd;
    }
    tr,th,td{
        border:1px solid #ddd;
    }
</style>
