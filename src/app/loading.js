import React from "react";

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className='flex min-h-screen flex-col items-end absolute right-0 w-[calc(100%-15rem)]'>
			<div className='projects-select flex row basis-20 items-center justify-start pl-10 w-full bg-neutral-50 opacity-50 shadow-md'>
				<div className='font-bold text-lg'>
					<h1 className=''></h1>
				</div>
			</div>
			<div className='w-[calc(100vw-16rem)] self-center opacity-50'></div>
		</div>
	);
}
