import React, { useState } from "react";
import axios from "axios";

const FormComponent = ({ editMode, onCancel }) => {
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("http://localhost:5000/update-user", {
				...formData,
				fieldToEdit: editMode,
			});
			console.log("Form data submitted successfully:", response.data);
			setSuccessMessage(editMode + " updated successfully");
			setErrorMessage("");
		} catch (error) {
			console.error("Error submitting form data:", error);
			setErrorMessage("An error occurred. Please try again.");
			setSuccessMessage("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
			{editMode === "name" && (
				<input
					type='text'
					placeholder='Name'
					className='p-4 text-lg border border-gray-200 rounded-md'
					name='name'
					value={formData.name}
					onChange={handleChange}
				/>
			)}
			{editMode === "username" && (
				<input
					type='text'
					placeholder='Username'
					className='p-4 text-lg border border-gray-200 rounded-md'
					name='username'
					value={formData.username}
					onChange={handleChange}
				/>
			)}
			{editMode === "password" && (
				<input
					type='password'
					placeholder='Password'
					className='p-4 text-lg border border-gray-200 rounded-md'
					name='password'
					value={formData.password}
					onChange={handleChange}
				/>
			)}
			<button
				type='submit'
				className='bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 text-lg rounded-md hover:from-purple-500 hover:to-blue-500 transition-all duration-300'>
				Update User
			</button>
			{errorMessage && <p className='text-red-500'>{errorMessage}</p>}
			{successMessage && <p className='text-green-500'>{successMessage}</p>}
		</form>
	);
};

export default FormComponent;
