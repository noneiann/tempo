import React from "react";
import dynamic from "next/dynamic";
import AddTask from "./components/AddTask";
import TasksHandler from "./TasksHandler";
const TaskItem = dynamic(() => import("./components/task-item"), {
	ssr: false,
});

const tasks = () => {
	return (
		<div className='flex min-h-screen'>
			<div className='flex flex-col items-end absolute right-0 w-[calc(100%-15rem)]'>
				<div className='projects-select flex row basis-20 items-center justify-start pl-10 w-full bg-neutral-50 shadow-md'>
					<div className='font-bold text-lg'>
						<h1>List of tasks</h1>
					</div>
				</div>
				<TasksHandler />
			</div>

			<AddTask />
		</div>
	);
};

export default tasks;
