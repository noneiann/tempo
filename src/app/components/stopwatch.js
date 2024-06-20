"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Stopwatch = () => {
	moment.locale("en-GB");

	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [timer, setTimer] = useState(0);
	const [startTime, setStartTime] = useState(null);
	const [stopTime, setStopTime] = useState(null);
	const [duration, setDuration] = useState(null);
	const [projects, setProjects] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [selectedProject, setSelectedProject] = useState("");
	const [selectedTask, setSelectedTask] = useState("");
	const [projectName, setProjectName] = useState("");
	const [taskName, setTaskName] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [sessionName, setSessionName] = useState("");
	const [errorModal, setErrorModal] = useState(false);


	const closeModal = () => {
		setShowModal(false)
		window.location.reload();
	}
	const formatTime = (time) => {
		const getSeconds = `0${time % 60}`.slice(-2);
		const minutes = Math.floor(time / 60);
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

		return `${getHours}:${getMinutes}:${getSeconds}`;
	};

	const handleStartStop = () => {
		if (isActive) {
			const stopMoment = moment.utc(); // Use moment.utc() for UTC time
			setIsActive(false);
			setStopTime(stopMoment.format("YYYY-MM-DD HH:mm:ss"));
			const duration = moment.duration(stopMoment.diff(moment(startTime)));
			setDuration(duration);
			setTimer(0);
			console.log("Duration:", duration.as("seconds"));
			console.log("Stop Time:", stopMoment.format("YYYY-MM-DD HH:mm:ss"));

			// Make API call to save session data
			axios
				.post("http://localhost:5000/add-session", {
					session_name: sessionName,
					duration: duration.as("seconds"),
					start_time: startTime,
					stop_time: stopMoment.format("YYYY-MM-DD HH:mm:ss"),
					project_id: selectedProject,
					task_id: selectedTask,
				})
				.then((response) => {
					console.log("Session saved successfully:", response.data);
					setShowModal(true);
				})
				.catch((error) => {
					console.error("Error saving session:", error);
				});
		} else {
			const project = projects.find(
				(proj) => proj[0] === parseInt(selectedProject)
			);
			const task = tasks.find((task) => task[0] === parseInt(selectedTask));

			if (!project || !task) {
				setErrorModal(true); // Display error modal if project or task is not selected
				return;
			}

			if (project) setProjectName(project[1]);
			if (task) setTaskName(task[1]);

			setIsActive(true);
			setIsPaused(false);
			setStartTime(moment.utc().format("YYYY-MM-DD HH:mm:ss"));
			setDuration(null);
			console.log("Start Time:", moment.utc().format("YYYY-MM-DD HH:mm:ss"));

			setSessionName(sessionName.trim());
		}
	};

	const handlePauseResume = () => {
		setIsPaused(!isPaused);
	};

	useEffect(() => {
		let interval = null;

		if (isActive && !isPaused) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer + 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isActive, isPaused]);

	useEffect(() => {
		// Fetch projects on component mount
		axios
			.get("http://localhost:5000/project")
			.then((response) => setProjects(response.data))
			.catch((error) => console.error("Error fetching projects:", error));
	}, []);

	useEffect(() => {
		// Fetch tasks when a project is selected
		if (selectedProject) {
			axios
				.post("http://localhost:5000/tasks-by-project", {
					projectId: selectedProject,
				})
				.then((response) => setTasks(response.data))
				.catch((error) => console.error("Error fetching tasks:", error));
		} else {
			setTasks([]);
		}
	}, [selectedProject]);

	return (
		<div className='projects-select flex row basis-20 items-center justify-start px-7 w-full bg-neutral-50 shadow-md focus:border-none'>
			{!isActive && (
				<>
					<input
						className='h-full w-full'
						type='text'
						placeholder='What are you working on?...'
						value={sessionName}
						onChange={(e) => setSessionName(e.target.value)}
					/>
					<select
						className='ml-2 p-2 border border-gray-300 rounded bg-white'
						name='projectSelect'
						value={selectedProject}
						onChange={(e) => {
							setSelectedProject(e.target.value);
							setSelectedTask("");
						}}>
						<option value=''>Select Project</option>
						{projects.map((project) => (
							<option key={project[0]} value={project[0]}>
								{project[1]}
							</option>
						))}
					</select>
					<select
						className='ml-2 mr-4 p-2 border border-gray-300 rounded bg-white'
						name='taskSelect'
						value={selectedTask}
						onChange={(e) => setSelectedTask(e.target.value)}>
						<option value=''>Select Task</option>
						{tasks.map((task) => (
							<option key={task[0]} value={task[0]}>
								{task[1]}
							</option>
						))}
					</select>
					{errorModal && (
						<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
							<div className='bg-white p-6 rounded shadow-lg'>
								<h2 className='text-xl font-bold mb-4'>Error</h2>
								<p>
									Please select both a project and a task before starting the
									session.
								</p>
								<button
									onClick={() => setErrorModal(false)}
									className='mt-4 bg-blue-500 text-white p-2 rounded'>
									OK
								</button>
							</div>
						</div>
					)}
				</>
			)}
			<span className='text-lg font-semibold'>{formatTime(timer)}</span>
			<button
				onClick={handleStartStop}
				className={`ml-4 p-2 ${
					isActive ? "bg-red-500" : "bg-green-500"
				} text-white rounded`}>
				{isActive ? "Stop" : "Start"}
			</button>
			{isActive && (
				<button
					onClick={handlePauseResume}
					className={`ml-4 p-2 ${
						isPaused ? "bg-green-500" : "bg-yellow-500"
					} text-white rounded`}>
					{isPaused ? "Resume" : "Pause"}
				</button>
			)}
			{showModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
					<div className='bg-white p-6 rounded shadow-lg'>
						<h2 className='text-xl font-bold mb-4'>Session Summary</h2>
						<p>
							<strong>Session Name:</strong> {sessionName}
						</p>
						<p>
							<strong>Project:</strong> {projectName}
						</p>
						<p>
							<strong>Task:</strong> {taskName}
						</p>
						<p>
							<strong>Start Time:</strong> {startTime}
						</p>
						<p>
							<strong>Stop Time:</strong> {stopTime}
						</p>
						<p>
							<strong>Duration:</strong> {duration && duration.humanize()}
						</p>
						<button
							onClick={() => window.location.reload()}
							className='mt-4 bg-blue-500 text-white p-2 rounded'>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Stopwatch;
