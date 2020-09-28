import React from 'react';
import axios from 'axios';
import './index.css'

//elemento
const Form = (props)=>(
    <form onSubmit={e=>{props.action(e)}} id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input type="text" name="todo" id="myInput" placeholder="Title..."/>
        <button type="submit" className="addBtn">Add</button>
    </form>
)
//componente
class List extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }

    render(){
        return(
            <ul>
                {this.props.todos.map(todo=>
                    <li key={todo.id} onClick={this.props.action} id={String(todo.id)} className={todo.checked?"checked":""}>{todo.name}
                    <span id={todo.id} onClick={this.props.delete} className="close">X</span></li>
                )}
            </ul>
        )
    }
}
// componente 2
class Main extends React.Component {
    constructor(props){
        super(props)
        this.state={
            todos:[]
        }
       
    }
    load(){
        axios.get("http://localhost:3030/todos")
        .then(res => {
            if(res.data) {
                this.setState({todos: res.data});
            }
        });
    }
    componentDidMount(){
        this.load()
    }

    handleCheck(e){
        axios.put(`http://localhost:3030/atttodo/${e.target.id}`)
        this.load();    
    }
    
    handleAdd(e){
        e.preventDefault();
        axios.post("http://localhost:3030/todo",{name: e.target.todo.value});
        this.load();
    }
    handleDelete(e){
        axios.delete(`http://localhost:3030/atttodo/${e.target.id}`)
        this.load();
    }

    render(){
        return(
            <div className="body">
                <Form action={this.handleAdd.bind(this)}/>
                <List todos={this.state.todos} action={this.handleCheck.bind(this)} delete={this.handleDelete.bind(this)}/>
            </div>
        )
    }
}

export default Main;