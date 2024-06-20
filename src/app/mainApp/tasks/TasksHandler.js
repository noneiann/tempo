"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const TaskItem = dynamic(() => import("./components/task-item"), {
	ssr: false,
});

const TasksHandler = () => {
	const [tasks, setTasks] = useState([]);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [assignedProjects, setAssignedProjects] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await fetch("http://localhost:5000/tasks");
				if (!res.ok) {
					throw new Error("Failed to fetch tasks");
				}
				const data = await res.json();
				setTasks(data);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		};

		const fetchProjects = async () => {
			try {
				const res = await fetch("http://localhost:5000/project");
				if (!res.ok) {
					throw new Error("Failed to fetch projects");
				}
				const data = await res.json();
				setProjects(data);
			} catch (error) {
				console.error("Error fetching projects:", error);
			}
		};

		fetchTasks();
		fetchProjects();
		setLoading(false);
	}, []);

	useEffect(() => {
		if (tasks.length > 0 && projects.length > 0) {
			const projectsWithTasks = projects.filter((project) =>
				tasks.some((task) => task[3] === project[0])
			);
			setAssignedProjects(projectsWithTasks);
		}
	}, [tasks, projects]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className='w-[calc(100vw-15rem)] self-center'>
				{assignedProjects.map((project, idx) => (
					<TaskItem key={idx} project={project} tasks={tasks} />
				))}
			</div>
		</>
	);
};

export default TasksHandler;
