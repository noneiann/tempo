"use client";
import React, { useState } from "react";

const EditUserModal = ({
	show,
	onClose,
	userId,
	name,
	username,
	userType,
	onSave,
}) => {
	const [newName, setNewName] = useState(name);
	const [newUsername, setNewUsername] = useState(username);
	const [newUserType, setNewUserType] = useState(userType);

	const handleSave = () => {
		onSave(userId, newName, newUsername, newUserType);
		onClose();
	};

	if (!show) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 rounded shadow-lg w-1/2'>
				<h2 className='text-2xl mb-4'>Edit User</h2>
				<form>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Name
						</label>
						<input
							type='text'
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'
							placeholder='Enter name'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Username
						</label>
						<input
							type='text'
							value={newUsername}
							onChange={(e) => setNewUsername(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'
							placeholder='Enter username'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							User Type
						</label>
						<select
							value={newUserType}
							onChange={(e) => setNewUserType(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'>
							<option value='admin'>Admin</option>
							<option value='user'>User</option>
						</select>
					</div>
					<div className='flex justify-between'>
						<button
							type='button'
							className='bg-gray-500 text-white px-3 py-2 rounded mr-2'
							onClick={onClose}>
							Cancel
						</button>
						<button
							type='button'
							className='bg-blue-500 text-white px-3 py-2 rounded'
							onClick={handleSave}>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditUserModal;
