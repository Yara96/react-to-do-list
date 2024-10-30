import { Add, CheckBox, PlusOne } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Input,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const ToDoList: FC<{ title: string }> = ({ title }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editableTodoId, setEditableTodoId] = useState<string>();
  const [editTodoText, setEditTodoText] = useState<string>("");

  const addTodo = () => {
    if (newTodo !== "") {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const saveTodo = (todo: TodoItem) => {
    if (editTodoText !== "") {
      const newTodo = { ...todo, text: editTodoText };
      const updatedTodos = todos.map((oldTodo) =>
        oldTodo.id === editableTodoId ? newTodo : oldTodo
      );

      setTodos(updatedTodos);
      setEditableTodoId(undefined);
      setEditTodoText("");
    } else {
      alert("cannot save empty todo");
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>{title}</h1>
      <TextField
        type="text"
        size="small"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />
      <Button
        sx={{ m: 1 }}
        startIcon={<Add />}
        variant="contained"
        size="small"
        onClick={addTodo}
      >
        Add Todo
      </Button>
      <div className="todo-list">
        <List sx={{ margin: "auto" }}>
          {todos.map((todo) => (
            <ListItem key={todo.id} className="list-item">
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {todo.id === editableTodoId ? (
                <Input
                  style={{
                    flexGrow: 2,
                    marginRight: 12,
                  }}
                  value={editTodoText}
                  onChange={(event) => {
                    setEditTodoText(event.target.value);
                  }}
                />
              ) : (
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    flexGrow: 2,
                    marginRight: 12,
                  }}
                >
                  {todo.text}
                </span>
              )}
              {todo.id === editableTodoId ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => saveTodo(todo)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setEditableTodoId(todo.id);
                    setEditTodoText(todo.text);
                  }}
                >
                  Edit
                </Button>
              )}

              <Button
                variant="contained"
                size="small"
                onClick={() => removeTodo(todo.id)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ToDoList;
