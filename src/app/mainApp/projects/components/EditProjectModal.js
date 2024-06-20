import React, { useState, useEffect } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/react";
import axios from "axios";

const EditProjectModal = ({
	projectId,
	show,
	onClose,
	projectName,
	description,
	status,
	users,
	assignedUsers,
}) => {
	const [editedProjectName, setEditedProjectName] = useState(projectName);
	const [editedDescription, setEditedDescription] = useState(description);
	const [editedStatus, setEditedStatus] = useState(status);
	const [assignedTo, setAssignedTo] = useState([]);

	useEffect(() => {
		if (show) {
			setEditedProjectName(projectName);
			setEditedDescription(description);
			setEditedStatus(status);
			setAssignedTo(assignedUsers.map((user) => user[0])); // Store user IDs only
		}
	}, [show, projectName, description, status, assignedUsers]);

	const handleEdit = (e) => {
		e.preventDefault();

		axios({
			method: "POST",
			url: "http://localhost:5000/edit-project",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				projectId: projectId,
				projectName: editedProjectName,
				description: editedDescription,
				projectStatus: editedStatus,
				assignedTo: assignedTo,
			}),
		})
			.then((response) => {
				console.log("Project edited successfully!");
				window.location.reload();
				onClose();
			})
			.catch((error) => {
				console.error("There was an error editing the project!", error);
			});
	};

	const toggleUserSelection = (userId) => {
		setAssignedTo((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId]
		);
		console.log(assignedTo);
	};

	if (!show) {
		return null;
	}

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 rounded shadow-lg w-1/2'>
				<h2 className='text-2xl mb-4'>Edit Project</h2>
				<form onSubmit={handleEdit}>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Project Name
						</label>
						<input
							type='text'
							value={editedProjectName}
							onChange={(e) => setEditedProjectName(e.target.value)}
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
							value={editedDescription}
							onChange={(e) => setEditedDescription(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'
							placeholder='Enter project description'
							required></textarea>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Status
						</label>
						<select
							value={editedStatus}
							onChange={(e) => setEditedStatus(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'>
							<option value='Not Started'>Not Started</option>
							<option value='In Progress'>In Progress</option>
							<option value='Completed'>Completed</option>
						</select>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Assigned To
						</label>
						<Listbox value={assignedTo} multiple>
							<div className='relative mt-1'>
								<ListboxButton className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md border border-gray-300'>
									<span className='block truncate'>
										{assignedTo.length > 0
											? assignedTo
													.map(
														(userId) =>
															users.find((user) => user[0] === userId)[3]
													)
													.join(", ")
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
											value={user[0]}
											onClick={() => toggleUserSelection(user[0])}
											selected={assignedTo.includes(user[0])}>
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
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProjectModal;
