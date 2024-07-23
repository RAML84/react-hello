import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component arrow function
const Home = () => {
	const [user, setUser] = useState("");
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	// metodo GET para ver las tareas del usuario
	const getUsers = () => {
		fetch("https://playground.4geeks.com/todo/users/Roger84")
			.then(response => {
				if (response.status == 404) {
					createUser();
					throw "el usuario no existe";
				}

				return response.json();
			})
			.then(data => {
				console.log(data);
				setUser(data.name);
				setTasks(data.todos);
			})
			.catch(error => console.log(error));
	};

	// metodo POST para agregar una tarea nueva 
	const addTask = () => {
		fetch('https://playground.4geeks.com/todo/todos/Roger84', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"label": input,
				"is_done": false
			})
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setInput(""); // Limpiar el input después de agregar la tarea
				getUsers(); // Volver a obtener las tareas para asegurarse de que la lista esté actualizada
			})
			.catch(error => console.error('Error:', error));
	};

	const deleteTask = (task) => {
		fetch(`https://playground.4geeks.com/todo/todos/${task}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (response.status == 204) {
					getUsers();
				}
			})
			.catch(error => console.error('Error al eliminar la tarea:', error));
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className="container-fluid row-flex justify-content-center w-75 mb-5 mt-5">
			<h1>Lista de tareas: {user}</h1>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					value={input}
					placeholder="add task"
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							addTask();
						}
					}}
				/>

				<button type="submit" className="btn btn-success" onClick={addTask}>Add Task</button>
			</div>
			{tasks.map(task => (
				<div key={task.id} className="d-flex justify-content-between align-items-center">
					<p className="mb-0">{task.label}</p>
					<button type="submit" className="btn btn-danger sm mt-1" onClick={() => deleteTask(task.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default Home;

