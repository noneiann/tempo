"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }) {
	const pathname = usePathname();

	return (
		<div className='flex'>
			{pathname.startsWith("/mainApp") && <Sidebar />}
			<main className='flex-1'>{children}</main>
		</div>
	);
}
