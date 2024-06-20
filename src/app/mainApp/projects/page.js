import React from "react";
import Addproject from "./components/addproject";
import ProjectsHandler from "./ProjectsHandler";
const Projects = () => {
	return (
		<div className='flex min-h-screen'>
			<div className='flex flex-col items-end absolute right-0 w-[calc(100%-15rem)]'>
				<div className='projects-select sticky top-0 flex row basis-20 items-center justify-start pl-10 w-full bg-neutral-50 shadow-md'>
					<div className='font-bold text-lg'>
						<h1>List of Projects</h1>
					</div>
				</div>
				<div className='w-[calc(100vw-15rem)] self-center'>
					<table className='w-full text-left bg-white shadow-lg rounded-lg'>
						<thead>
							<tr className='bg-gray-100'>
								<th className=''></th>
								<th className='p-4'>Project Name</th>
								<th className='p-4'>Project Description</th>
								<th className='p-4'>Project Status</th>
								<th className='p-4'>Actions</th>
							</tr>
						</thead>
						<ProjectsHandler />
					</table>
				</div>
			</div>
			<Addproject />
		</div>
	);
};

export default Projects;
