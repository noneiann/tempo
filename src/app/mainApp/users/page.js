import React from "react";
import Layout from "../layout";
import dynamic from "next/dynamic";
import UsersHandler from "./UsersHandler";

const UserItem = dynamic(() => import("./components/UserItem"), { ssr: false });

const Users = () => {
	return (
		<Layout>
			<div className='flex min-h-screen'>
				<div className='flex flex-col items-end absolute right-0 w-[calc(100%-15rem)]'>
					<div className='users-select sticky top-0 flex row basis-20 items-center justify-start pl-10 w-full bg-neutral-50 shadow-md'>
						<div className='font-bold text-lg'>
							<h1>List of Users</h1>
						</div>
					</div>
					<div className='w-[calc(100vw-15rem)] self-center'>
						<table className='w-full text-left bg-white shadow-lg rounded-lg'>
							<thead>
								<tr className='bg-gray-100'>
									<th className=''></th>
									<th className=''>User ID</th>
									<th className='p-4'>Name</th>
									<th className='p-4'>Username</th>
								</tr>
							</thead>
							<tbody>
								<UsersHandler />
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Users;
