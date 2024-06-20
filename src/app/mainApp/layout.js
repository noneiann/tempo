import { use } from "react";
import Sidebar from "../components/Sidebar";

export default function MainAppLayout({ children }) {
	return (
		<div className='flex'>
			<Sidebar />
			<main className='flex-1'>{children}</main>
		</div>
	);
}
