// Home.js
import React from "react";
import PageComponent from "./PageComponent.js";
import Link from "next/link";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center p-24'>
			<h1 className='text-9xl font-bold text-gray-800 mb-4'>Tempo!</h1>
			<div className='login-container mt-20'>
				<p className='text-lg text-center text-gray-600 mb-8'>
					Please login to continue
				</p>
				<PageComponent />
			</div>
			<div className='mt-4'>
				Don’t have an account?
				<Link href='/signup'>
					<span className='text-blue-500'>Sign Up</span>
				</Link>
			</div>
		</main>
	);
}
