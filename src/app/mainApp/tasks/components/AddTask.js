"use client";

import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import axios from "axios";

const AddTask = () => {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleAddTask = async (newTask) => {
		try {
			await axios.post("http://localhost:5000/add-task", newTask, {
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) =>{
				console.log("Adding new task:", newTask);
				window.location.reload();
			})
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	return (
		<div className='fixed bottom-0 right-0'>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 font-semibold rounded m-10'
				onClick={handleOpenModal}>
				Add Task
			</button>
			<AddTaskModal
				show={showModal}
				onClose={handleCloseModal}
				onAdd={handleAddTask}
			/>
		</div>
	);
};

export default AddTask;
