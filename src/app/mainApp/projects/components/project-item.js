"use client";

import React, { useState, useEffect } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import axios from "axios";

const ProjectItem = ({ projectName, description, status, projectId }) => {
	const [expanded, setExpanded] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [users, setUsers] = useState([]);
	const [assignedUsers, setAssignedUsers] = useState([]);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	const handleOpenEditModal = () => {
		setShowEditModal(true);
	};

	const handleCloseEditModal = () => {
		setShowEditModal(false);
	};

	const handleOpenDeleteModal = () => {
		setShowDeleteModal(true);
	};

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false);
	};

	const handleDelete = async () => {
		await axios({
			method: "DELETE",
			url: "http://localhost:5000/delete-project",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				projectName: projectName,
			}),
		}).then((response) => {
			console.log("Project deleted");
			window.location.reload();
		});
		await axios({
			method: "DELETE",
			url: "http://localhost:5000/delete-project-assigned",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				projectId: projectId,
			}),
		}).then((response) => {
			console.log("Assigned users deleted");
		});

		setShowDeleteModal(false);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("http://localhost:5000/user");
				setUsers(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}

			try {
				const response = await axios({
					method: "POST",
					url: "http://localhost:5000/get-project-assigned",
					data: JSON.stringify({
						projectId: projectId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(projectName, "assigned users:", response.data);
				setAssignedUsers(response.data);
			} catch (error) {
				console.error("Error fetching assigned users:", error);
			}
		};
		fetchUsers();
	}, [projectId]);

	return (
		<>
			<tr className='hover:bg-gray-50 cursor-pointer'>
				<td onClick={toggleExpand} className='self-center pl-4'>
					{expanded ? <MdExpandLess /> : <MdExpandMore />}
				</td>
				<td onClick={toggleExpand} className='p-4'>
					{projectName}
				</td>
				<td onClick={toggleExpand} className='p-4'>
					<div className='rounded p-1'>{description}</div>
				</td>
				<td onClick={toggleExpand}>
					<span
						className={`p-2 border rounded-lg ${
							status === "Not Started"
								? "bg-[#FEF2F2] text-[#B91C1C]"
								: status === "Completed"
								? "bg-green-300 text-green-700"
								: "bg-yellow-100 text-yellow-700"
						}`}>
						{status}
					</span>
				</td>
				<td>
					<button
						onClick={handleOpenEditModal}
						className='bg-blue-500 text-white px-3 py-1 rounded'>
						Edit
					</button>
					<button
						onClick={handleOpenDeleteModal}
						className='bg-red-500 text-white px-3 py-1 rounded ml-4'>
						Delete
					</button>
				</td>
			</tr>
			{expanded && (
				<tr>
					<td colSpan='5' className='p-4'>
						<div>
							<h3 className='text-lg font-semibold'>Users Assigned:</h3>
							<ul>
								{assignedUsers.map((user, idx) => (
									<li key={idx}>{user[3]}</li>
								))}
							</ul>
						</div>
					</td>
				</tr>
			)}
			<EditProjectModal
				show={showEditModal}
				onClose={handleCloseEditModal}
				projectName={projectName}
				description={description}
				status={status}
				users={users}
				assignedUsers={assignedUsers}
				projectId={projectId}
			/>
			<DeleteProjectModal
				show={showDeleteModal}
				onClose={handleCloseDeleteModal}
				onDelete={handleDelete}
			/>
		</>
	);
};

export default ProjectItem;
