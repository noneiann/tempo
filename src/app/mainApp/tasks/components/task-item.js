"use client";

import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTask";
import AssignedToModal from "./AssignedtoModal";
import axios from "axios";

const TaskItem = ({ project, tasks }) => {
	const [expanded, setExpanded] = useState(false);
	const contentRef = useRef(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAssignedToModal, setShowAssignedToModal] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [assignedToValue, setAssignedToValue] = useState([]);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	const handleOpenEditModal = (task) => {
		setSelectedTask(task);
		setShowEditModal(true);
	};

	const handleCloseEditModal = () => {
		setShowEditModal(false);
		setSelectedTask(null);
	};

	const handleOpenDeleteModal = (task) => {
		setSelectedTask(task);
		setShowDeleteModal(true);
	};

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false);
		setSelectedTask(null);
	};

	const handleDelete = async () => {
		// Add code to delete task
		console.log("Deleting task:", selectedTask);
		axios({
			url: "http://localhost:5000/delete-task",
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			data: { taskId: selectedTask[0] },
		}).then((response) => {
			handleCloseDeleteModal();
			window.location.reload();
		})
	};

	const handleEdit = async (editedTask) => {
		// Add code to edit task
		console.log("Editing task:", editedTask);
		axios({
			url: "http://localhost:5000/edit-task",
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			data: editedTask,
		})
		.then((response) => {
			handleCloseEditModal();
			window.location.reload();
		})

	};

	// Filter tasks by project_ID
	const filteredTasks = tasks.filter((task) => task[3] === project[0]);

	return (
		<>
			<div
				className={`p-4 bg-white shadow-md transition-all duration-300 ${
					expanded ? "shadow-lg" : ""
				}`}>
				<div
					onClick={toggleExpand}
					className='flex justify-between items-center cursor-pointer'>
					<div className='flex items-center'>
						<div className='text-blue-500 mr-4'>
							{expanded ? (
								<MdExpandLess size={24} />
							) : (
								<MdExpandMore size={24} />
							)}
						</div>
						<div>
							<h1 className='text-xl font-semibold text-gray-800'>
								{project[1]}
							</h1>
							<p className='text-gray-600'>{project[4]}</p>
						</div>
					</div>
					<div className='text-right'>
						<p
							className={`text-sm font-medium py-1 px-3 rounded ${
								project[3] === "Completed"
									? "bg-green-100 text-green-700"
									: project[3] === "In Progress"
									? "bg-yellow-100 text-yellow-700"
									: "bg-red-200 text-red-700"
							}`}>
							{project[3]}
						</p>
					</div>
				</div>
			</div>
			<CSSTransition
				in={expanded}
				timeout={300}
				classNames='expand'
				nodeRef={contentRef}
				unmountOnExit>
				<div ref={contentRef} className='expand-content'>
					<table className='w-full text-left bg-white shadow-lg rounded-lg'>
						<thead>
							<tr className='bg-gray-100'>
								<th className=''></th>
								<th className='p-4'>Task Name</th>
								<th className='p-4'>Task Description</th>
								<th className='p-4'>Task Status</th>
								<th className='p-4'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredTasks.map((task, idx) => (
								<tr key={idx}>
									<td className='p-4'></td>
									<td className='p-4'>{task[1]}</td>
									<td className='p-4'>{task[2]}</td>
									<td className='p-4'>{task[4]}</td>
									<td className='p-4'>
										<button
											onClick={() => handleOpenEditModal(task)}
											className='bg-blue-500 text-white px-3 py-1 rounded'>
											Edit
										</button>
										<button
											onClick={() => handleOpenDeleteModal(task)}
											className='bg-red-500 text-white px-3 py-1 rounded ml-4'>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{selectedTask && (
						<EditTaskModal
							show={showEditModal}
							onClose={handleCloseEditModal}
							onSave={handleEdit}
							task={selectedTask}
						/>
					)}
					{selectedTask && (
						<DeleteTaskModal
							show={showDeleteModal}
							onClose={handleCloseDeleteModal}
							onDelete={handleDelete}
							task={selectedTask}
						/>
					)}
				</div>
			</CSSTransition>
		</>
	);
};

export default TaskItem;
