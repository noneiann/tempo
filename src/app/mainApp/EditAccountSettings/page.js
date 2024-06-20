"use client";
import React, { useState } from "react";
import FormComponent from "./FormComponent"; // Adjust the path as per your project structure

const EditAccountSettings = () => {
	const [editMode, setEditMode] = useState(null);

	const handleEdit = (field) => {
		setEditMode(field);
	};

	const handleCancel = () => {
		setEditMode(null);
	};

	return (
		<main className='flex min-h-screen flex-col items-center p-24'>
			<h1 className='text-4xl font-bold text-gray-800 mb-4'>
				Edit Account Settings
			</h1>
			<div className='flex gap-4 mb-8'>
				<button
					className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300'
					onClick={() => handleEdit("username")}>
					Edit Username
				</button>
				<button
					className='bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300'
					onClick={() => handleEdit("password")}>
					Edit Password
				</button>
				<button
					className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300'
					onClick={() => handleEdit("name")}>
					Edit Name
				</button>
				{editMode && (
					<button
						className='bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-colors duration-300'
						onClick={handleCancel}>
						Cancel
					</button>
				)}
			</div>
			{editMode && (
				<FormComponent editMode={editMode} onCancel={handleCancel} />
			)}
		</main>
	);
};

export default EditAccountSettings;
