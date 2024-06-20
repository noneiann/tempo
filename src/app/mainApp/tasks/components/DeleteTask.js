'use client'
import React from "react";

const DeleteTaskModal = ({ show, onClose, onDelete }) => {
	if (!show) {
		return null;
	}

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 rounded shadow-lg w-1/3'>
				<h2 className='text-2xl mb-4'>Delete Task</h2>
				<p className='mb-4'>Are you sure you want to delete this task?</p>
				<div className='flex justify-between'>
					<button
						type='button'
						className='bg-gray-500 text-white px-3 py-2 rounded mr-2'
						onClick={onClose}>
						Cancel
					</button>
					<button
						type='button'
						className='bg-red-500 text-white px-3 py-2 rounded'
						onClick={onDelete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteTaskModal;
