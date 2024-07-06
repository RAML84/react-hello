import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [users,setUsers]= useState([])
	const getUsers= () => {
		fetch("https://playground.4geeks.com/todo/users")
		.then(response=> response.json())
		.then(data=> {
			setUsers(data.users)
			console.log(data)

		})
		.catch(error=> console.log(error))
	}

	const [Task,setTask]= useState([])
	const getTask= () => {
		fetch("https://playground.4geeks.com/todo/task")
		.then(response=> response.json())
		.then(data=>setTask(data.Task))
		.catch(error=> console.log(error))
	}

	useEffect(()=>{
		getUsers()
		getTask()

	}, [])

	return (
		<div className="text-center">
			{users.map(user=>(
				<p>
					{user.name}
				</p>
			))}
		</div>
	);
};

export default Home;
