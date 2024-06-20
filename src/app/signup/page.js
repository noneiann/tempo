"use client";
import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

const SignUp = () => {
	const [formData, setFormData] = useState({
		Name: "",
		Username: "",
		Password: "",
	});
	const [showModal, setShowModal] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		axios({
			method: "post",
			url: "http://localhost:5000/user",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(formData),
		})
			.then((response) => {
				console.log(response.data);
				setShowModal(true); // Show the modal on successful sign up
			})
			.catch((error) => {
				console.error("There was an error signing up!", error.response.data);
			});
	};

	return (
		<main className='flex min-h-screen flex-col items-center p-24'>
			<h1 className=' text-9xl font-bold text-gray-800 mb-4'>Tempo!</h1>
			<div className='login-container mt-12'>
				<p className='text-lg text-center text-gray-600 mb-8'>
					Please fill in the details to sign up
				</p>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<div className='form-control'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							name='Name'
							placeholder='Enter your name'
							className='p-2 text-lg border border-gray-200 rounded-md'
							value={formData.Name}
							onChange={handleChange}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='Username'
							placeholder='Enter your username'
							className='p-2 text-lg border border-gray-200 rounded-md'
							value={formData.Username}
							onChange={handleChange}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='Password'
							placeholder='Enter your password'
							className='p-2 text-lg border border-gray-200 rounded-md'
							value={formData.Password}
							onChange={handleChange}
						/>
					</div>
					<button
						type='submit'
						className='bg-blue-900 text-white p-4 text-lg rounded-md'>
						Sign Up
					</button>
				</form>
			</div>
			<p>
				Already have an account?{" "}
				<a href='/' className='text-blue-500'>
					Login
				</a>
			</p>

			{showModal && (
				<div className='modal'>
					<div className='modal-content'>
						<p>Registration successful!</p>
					</div>
				</div>
			)}
		</main>
	);
};

export default SignUp;
