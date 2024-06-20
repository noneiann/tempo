import React, { useState } from "react";

const EditTaskModal = ({ show, onClose, task, onSave }) => {
	const [taskName, setTaskName] = useState(task[1]);
	const [description, setDescription] = useState(task[2]);
	const [status, setStatus] = useState(task[4] || "Not Started");
	const handleSave = (e) => {
		e.preventDefault();
		const updatedTask = {
			...task,
			name: taskName,
			description,
			status,
		};
		onSave(updatedTask);
		onClose();
	};

	if (!show) {
		return null;
	}

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 rounded shadow-lg w-1/2'>
				<h2 className='text-2xl mb-4'>Edit Task</h2>
				<form onSubmit={handleSave}>
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

export default EditTaskModal;
