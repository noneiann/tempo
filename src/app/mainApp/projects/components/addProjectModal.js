"use client";

import React, { useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/react";
import axios from "axios";
import { useEffect } from "react";
const AddProjectModal = ({ show, onClose }) => {
	const [projectName, setProjectName] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("Not Started");
	const [assignedTo, setAssignedTo] = useState([]);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			await axios
				.get("http://localhost:5000/user")
				.then((response) => {
					setUsers(response.data);
					console.log(response.data);
				})
				.catch((error) => {
					console.error("There was an error fetching the users!", error);
				});
		};
		fetchUsers();
	}, []);
	const handleAdd = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		const projectData = {
			ProjectName: projectName,
			description: description,
			projectStatus: status,
		};

		const assignedData = {
			ProjectName: projectName,
			AssignedTo: assignedTo,
		};

		axios({
			method: "POST",
			url: "http://localhost:5000/add-project",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(projectData),
		})
			.then((response) => {
				console.log("Project added successfully!" + response.data);
			})
			.catch((error) => {
				console.error("There was an error adding the project!", error);
			});

		axios({
			method: "POST",
			url: "http://localhost:5000/add-project-assigned",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(assignedData),
		})
			.then((response) => {
				console.log(response);
				// Reload the page on success
				window.location.reload();
			})
			.catch((error) => {
				console.error(
					"There was an error assigning users to the project!!",
					error
				);
			});

		onClose();
	};

	const toggleUserSelection = (user) => {
		setAssignedTo((prev) =>
			prev.includes(user)
				? prev.filter((u) => u !== user[3])
				: [...prev, user[3]]
		);
	};

	if (!show) {
		return null;
	}

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 rounded shadow-lg w-1/2'>
				<h2 className='text-2xl mb-4'>Add New Project</h2>
				<form onSubmit={handleAdd}>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Project Name
						</label>
						<input
							type='text'
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'
							placeholder='Enter project name'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'
							placeholder='Enter project description'
							required></textarea>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Status
						</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'>
							<option value='Not Started' defaultValue>
								Not Started
							</option>
							<option value='In Progress'>In Progress</option>
							<option value='Completed'>Completed</option>
						</select>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Assigned To
						</label>
						<Listbox value={assignedTo} onChange={setAssignedTo} multiple>
							<div className='relative mt-1'>
								<ListboxButton className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md border border-gray-300'>
									<span className='block truncate'>
										{assignedTo.length > 0
											? assignedTo.map((user) => user[3]).join(", ")
											: "Select users"}
									</span>
									<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
										<SelectorIcon className='w-5 h-5 text-gray-400' />
									</span>
								</ListboxButton>
								<ListboxOptions className='absolute mt-1 w-full py-1 bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-base z-10'>
									{users.map((user) => (
										<ListboxOption
											key={user[0]}
											className={({ active }) =>
												`${active ? "text-white bg-blue-600" : "text-gray-900"}
												cursor-default select-none relative py-2 pl-10 pr-4`
											}
											value={user}
											onClick={() => toggleUserSelection(user)}>
											{({ selected }) => (
												<>
													<span
														className={`${
															selected ? "font-semibold" : "font-normal"
														} block truncate`}>
														{user[3]}
													</span>
													{selected && (
														<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
															<CheckIcon className='w-5 h-5' />
														</span>
													)}
												</>
											)}
										</ListboxOption>
									))}
								</ListboxOptions>
							</div>
						</Listbox>
					</div>
					<div className='flex justify-between'>
						<button
							type='button'
							className='bg-gray-500 text-white px-3 py-2 rounded mr-2'
							onClick={onClose}>
							Cancel
						</button>
						<button
							type='submit'
							className='bg-blue-500 text-white px-3 py-2 rounded'>
							Add Project
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddProjectModal;
