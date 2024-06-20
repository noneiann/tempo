import React from "react";
import MyCalendar from "../components/Calendar";
import Stopwatch from "../components/stopwatch";
const Projects = () => {
	return (
		<div className='flex min-h-screen'>
			<div className='flex flex-col items-end absolute right-0 w-[calc(100%-15rem)]'>
				<div className='projects-select flex row basis-20 items-center justify-start pl-10 w-full bg-neutral-50 shadow-md'>
					<div className='font-bold text-lg'>
						<h1>Timeline of Sessions</h1>
					</div>
				</div>
				<div className='w-[calc(100vw-15rem)] self-center'>
					<MyCalendar />
				</div>
				<Stopwatch />
			</div>
		</div>
	);
};

export default Projects;
