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
		fetch("https://playground.4geeks.com/todo/users/Roger1984")
			.then(response => {
				if (response.status == 404){
					createUser()
					throw "el usuario no existe"
				}
				
				return response.json()

			})
			.then(data => {
				console.log(data)
				setUser(data.name)
				setTasks(data.todos)

			})
			.catch(error => console.log(error))
	}
	// metodo POST para agregar una tarea nueva 
	const addTask = () => {
		fetch('https://playground.4geeks.com/todo/todos/Roger1984', {
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
			if (response.status == 204){
				getUsers()
			}

		  })
		  .catch(error => console.error('Error al eliminar la tarea:', error));
	  };
	  
	//   Metodo POST para crear un usuario
	  const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			"username": "Roger1984" // Ajusta esto según tus necesidades
		  })
		})
		  .then(response => response.json())
		  .then(data => {
			console.log('Usuario creado:', data);
			getUsers(); // Volver a obtener los datos del usuario para actualizar la lista
		  })
		  .catch(error => console.error('Error al crear el usuario:', error));
	  };
	  
	  

	useEffect(() => {
		getUsers()

	}, [])

	return (
		<div className="container-fluid row-flex justify-content-center w-75 mb-5 mt-5">
			<form onSubmit={createUser} className="mb-4"></form>
			<h1>Lista de tareas: {user}</h1>
			<input
				type="text"
				placeholder="addtask"
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						addTask("");
					}
				}}
			/>
			

			<button type="submit" className="btn btn-success" onClick={addTask}>AddTask</button>
			{tasks.map(task => (
				<div key={task.id}>
					<p>{task.label}</p>
					<button type="submit" className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default Home;
