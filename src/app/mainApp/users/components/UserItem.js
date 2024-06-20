"use client";
import React, { useState, useEffect } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

const UserItem = ({ userId, name, username, userType }) => {
	const [expanded, setExpanded] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [assignedProjects, setAssignedProjects] = useState([]);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	const handleEdit = (id, newName, newUsername, newUserType) => {
		console.log(
			`Edited user ${id}: ${newName}, ${newUsername}, ${newUserType}`
		);
		// Call an API or update the state with new values
	};

	const handleDelete = () => {
		console.log(`Deleted user ${userId}`);
		// Call an API or update the state to remove the user
		setShowDeleteModal(false);
	};

	useEffect(() => {
		if (expanded) {
			fetch(`http://localhost:5000/get-assigned-projects`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId }),
			})
				.then((response) => response.json())
				.then((data) => setAssignedProjects(data))
				.catch((error) =>
					console.error("Error fetching assigned projects:", error)
				);
		}
	}, [expanded, userId]);

	return (
		<>
			<tr className='hover:bg-gray-50'>
				<td onClick={toggleExpand} className='self-center pl-4'>
					{expanded ? <MdExpandLess /> : <MdExpandMore />}
				</td>
				<td onClick={toggleExpand} className='p-4'>
					{userId}
				</td>
				<td onClick={toggleExpand} className='p-4'>
					{name}
				</td>
				<td onClick={toggleExpand} className='p-4'>
					{username}
				</td>
			</tr>
			{expanded && (
				<tr>
					<td colSpan='6' className='p-4'>
						<div>
							<h3 className='text-lg font-semibold mt-4'>Projects Assigned:</h3>
							<ul>
								{assignedProjects.map((project) => (
									<li key={project.project_ID}>
										{project[1]} - {project[4]}
										{project.projectStatus}
									</li>
								))}
							</ul>
						</div>
					</td>
				</tr>
			)}
			<EditUserModal
				show={showEditModal}
				onClose={() => setShowEditModal(false)}
				userId={userId}
				name={name}
				username={username}
				userType={userType}
				onSave={handleEdit}
			/>
			<DeleteUserModal
				show={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDelete}
			/>
		</>
	);
};

export default UserItem;
