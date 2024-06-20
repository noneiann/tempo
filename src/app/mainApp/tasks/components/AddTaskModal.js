import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import axios from "axios";

const AddTaskModal = ({ show, onClose, onAdd }) => {
	const [taskName, setTaskName] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("Not Started");
	const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		if (show) {
			axios
				.get("http://localhost:5000/project")
				.then((response) => {
					setProjects(response.data);
					console.log(response.data);

					setSelectedProject(response.data[0]); // Default to the first project
				})
				.catch((error) => {
					console.error("Error fetching projects:", error);
				});
			console.log(projects);
		}
	}, [show]);

	const handleAdd = (e) => {
		e.preventDefault();
		onAdd({
			taskName,
			description,
			status,
			project: selectedProject[0],
		});
		onClose();
	};

	if (!show) {
		return null;
	}

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 rounded shadow-lg w-1/2'>
				<h2 className='text-2xl mb-4'>Add New Task</h2>
				<form onSubmit={handleAdd}>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Task Name
						</label>
						<input
							type='text'
							value={taskName}
							onChange={(e) => setTaskName(e.target.value)}
							className='mt-1 p-2 border border-gray-300 rounded w-full'
							placeholder='Enter task name'
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
							placeholder='Enter task description'
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
							<option value='Not Started'>Not Started</option>
							<option value='In Progress'>In Progress</option>
							<option value='Completed'>Completed</option>
						</select>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Project
						</label>
						<Listbox value={selectedProject} onChange={setSelectedProject}>
							{({ open }) => (
								<>
									<div className='relative mt-1'>
										<Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md border border-gray-300'>
											<span className='block truncate'>
												{selectedProject
													? selectedProject[1]
													: "Select a project"}
											</span>
											<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
												<SelectorIcon className='w-5 h-5 text-gray-400' />
											</span>
										</Listbox.Button>
										<Transition
											show={open}
											as={React.Fragment}
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'>
											<Listbox.Options className='absolute mt-1 w-full py-1 bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-base z-10'>
												{projects.map((project) => (
													<Listbox.Option
														key={project[0]}
														className={({ active }) =>
															`${
																active
																	? "text-white bg-blue-600"
																	: "text-gray-900"
															} cursor-default select-none relative py-2 pl-10 pr-4`
														}
														value={project}>
														{({ selected, active }) => (
															<>
																<span
																	className={`${
																		selected ? "font-semibold" : "font-normal"
																	} block truncate`}>
																	{project[1]}
																</span>
																{selected ? (
																	<span
																		className={`${
																			active ? "text-white" : "text-blue-600"
																		} absolute inset-y-0 left-0 flex items-center pl-3`}>
																		<CheckIcon className='w-5 h-5' />
																	</span>
																) : null}
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</>
							)}
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
							Add Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddTaskModal;
