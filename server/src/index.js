const express =  require('express')

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const todos = [
    {id:0, name: "Comer", checked: false},
    {id:1, name: "Dormir", checked: false},
    {id:2, name: "Acordar", checked: false}
];

app.get('/', (req,res)=>{
    res.send({
        message: "hello world!"
    });
});

app.get('/todos', (req,res)=>{
    res.send(todos);
});

app.post('/todo', (req,res)=>{
    todos.push({id: todos.length,...req.body,checked:false});
    res.sendStatus(201);
});

app.put('/atttodo/:id', (req,res) => {
    
    const {id} = req.params;
    const index = todos.findIndex(todo => todo.id == id);
    if(index === -1){
        res.sendStatus(404);
    }else{
        todos[index].checked = !todos[index].checked;
        console.log(todos[index])
        res.sendStatus(202);
    }
    
});
app.delete('/deleteTodo/:id', (req,res) => {
    const {id} = req.params;
    const index = todos.findIndex(todo => todo.id == id);
    if(index === -1){
        res.sendStatus(404);
    }else{
        todos.splice(index, 1);
        res.sendStatus(202);
    }
});

app.listen(3030, ()=>{
    console.log('api on');
});