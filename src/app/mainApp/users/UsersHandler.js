"use client";

import React, { useState, useEffect } from "react";
import UserItem from "./components/UserItem";
import axios from "axios";

const UsersHandler = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await axios.get("http://localhost:5000/user");
				const data = res.data;
				setUsers(data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};
		fetchUsers();
	}, []);

	return (
		<>
			{users.map((user, index) => (
				<UserItem
					key={index}
					userId={user[0]}
					name={user[3]}
					username={user[1]}
				/>
			))}
		</>
	);
};

export default UsersHandler;
