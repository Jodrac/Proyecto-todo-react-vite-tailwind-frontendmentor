import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import ToDoList from "./components/TodoList";

//Ejemplos sin localStorage
// const initialStateTodos = [
//     {
//         id: 1,
//         title: "Do the curse",
//         completed: true,
//     },
//     {
//         id: 2,
//         title: "Buy the food",
//         completed: false,
//     },
//     {
//         id: 3,
//         title: "Go to the gym",
//         completed: false,
//     },
//     {
//         id: 4,
//         title: "Do the streach",
//         completed: false,
//     },
//     {
//         id: 5,
//         title: "Complete todo app with Frontend Mentor",
//         completed: false,
//     },
// ];

const initialStateTodos = JSON.parse(localStorage.getItem("todos") || []);
const App = () => {
    const [todos, setTodos] = useState(initialStateTodos);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const createTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title: title.trim(),
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const updateTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          completed: !todo.completed,
                      }
                    : todo
            )
        );
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const computedItemsLeft = todos.filter((todo) => !todo.completed).length;

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };
    const [filter, setFilter] = useState("all");

    const filteredTodos = () => {
        switch (filter) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.completed);
            case "completed":
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    };
    const changeFilter = (filter) => setFilter(filter);

    return (
        <div
            className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat transition-all duration-1000
         dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] 
          md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]"
        >
            <Header></Header>

            <main className="container mx-auto mt-8 max-w-xl px-4 ">
                <TodoCreate createTodo={createTodo}></TodoCreate>

                <ToDoList
                    todos={filteredTodos()}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                ></ToDoList>

                <TodoComputed
                    computedItemsLeft={computedItemsLeft}
                    clearCompleted={clearCompleted}
                ></TodoComputed>

                <TodoFilter
                    changeFilter={changeFilter}
                    filter={filter}
                ></TodoFilter>
            </main>

            <footer className="mt-8 text-center dark:text-gray-400">
                Drag and drop to reorder list
            </footer>
        </div>
    );
};
export default App;
