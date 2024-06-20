"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssignedtoModal = ({ show, onClose, taskId }) => {
	const [assignedTo, setAssignedTo] = useState([]);
	useEffect(() => {
		const getAssignedUsers = async () => {
			try {
				const response = await axios({
					method: "POST",
					url: "http://localhost:5000/get-task-assigned-users",
					data: JSON.stringify({ taskId }),
					headers: {
						"Content-Type": "application/json",
					},
				});
				setAssignedTo(response.data);
			} catch (error) {
				console.error("Error fetching assigned users:", error);
			}
		};
	});

	console.log(assignedTo);
	if (!show) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
			<div className='bg-white p-8 rounded shadow-lg'>
				<h2 className='text-2xl mb-4'>Assigned To</h2>
				<ul className='mb-4'>
					{assignedTo.map((user, index) => (
						<li key={index} className='py-2'>
							{user[2]} ({user[1]})
						</li>
					))}
				</ul>
				<button
					onClick={onClose}
					className='bg-blue-500 text-white px-4 py-2 rounded'>
					Close
				</button>
			</div>
		</div>
	);
};

export default AssignedtoModal;
