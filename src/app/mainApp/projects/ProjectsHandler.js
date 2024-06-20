"use client";

import React, { useEffect, useState } from "react";
import ProjectItem from "./components/project-item";
const ProjectsHandler = ({ updateProjects }) => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch("http://localhost:5000/project")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch projects");
				}
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setProjects(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching projects:", error);
				setLoading(false);
			});
	}, []);
	if (!projects || projects.length === 0) {
		return (
			<tbody>
				<tr>
					<td colSpan='5'>No projects found</td>
				</tr>
			</tbody>
		);
	}
	return (
		<tbody>
			{loading ? (
				<tr>
					<td colSpan='5'>Loading...</td>
				</tr>
			) : (
				projects.map((project) => (
					<ProjectItem
						key={project[0]}
						projectName={project[1]}
						description={project[4]}
						status={project[3]}
						projectId={project[0]}
					/>
				))
			)}
		</tbody>
	);
};

export default ProjectsHandler;
