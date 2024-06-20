"use client";
import React from "react";

const DeleteUserModal = ({ show, onClose, onConfirm }) => {
	if (!show) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 rounded shadow-lg w-1/2'>
				<h2 className='text-2xl mb-4'>Confirm Delete</h2>
				<p>Are you sure you want to delete this user?</p>
				<div className='flex justify-between mt-4'>
					<button
						type='button'
						className='bg-gray-500 text-white px-3 py-2 rounded mr-2'
						onClick={onClose}>
						Cancel
					</button>
					<button
						type='button'
						className='bg-red-500 text-white px-3 py-2 rounded'
						onClick={onConfirm}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteUserModal;
