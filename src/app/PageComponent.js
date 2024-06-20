// PageComponent.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { Router, useRouter } from "next/navigation";
export default function PageComponent() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5000/login", {
				Username: username,
				Password: password,
			});

			if (response.data.success) {
				setIsSuccessModalOpen(true);
				setTimeout(() => {
					setIsSuccessModalOpen(false);
					router.push("/mainApp");
				}, 2000);
			} else {
				setErrorMessage(
					response.data.message || "Login failed. Please try again."
				);
				setIsErrorModalOpen(true);
				setTimeout(() => {
					setIsErrorModalOpen(false);
				}, 2000);
			}
		} catch (error) {
			setErrorMessage("An error occurred. Please try again.");
			setIsErrorModalOpen(true);
			setTimeout(() => {
				setIsErrorModalOpen(false);
			}, 2000);
			console.error("There was an error logging in!", error.response);
		}
	};

	return (
		<form className='flex flex-col gap-6' onSubmit={handleLogin}>
			<input
				type='text'
				placeholder='Username'
				className='p-4 text-lg border border-gray-200 rounded-md'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				className='p-4 text-lg border border-gray-200 rounded-md'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				type='submit'
				className='bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 text-lg rounded-md hover:from-purple-500 hover:to-blue-500 transition-all duration-300'>
				Login
			</button>

			{isSuccessModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-8 rounded shadow-lg'>
						<h2 className='text-2xl mb-4'>Login Successful!</h2>
						<p>Redirecting to the main application...</p>
					</div>
				</div>
			)}

			{isErrorModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-8 rounded shadow-lg'>
						<h2 className='text-2xl mb-4'>Login Failed!</h2>
						<p>{errorMessage}</p>
					</div>
				</div>
			)}
		</form>
	);
}
