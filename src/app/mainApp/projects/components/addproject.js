"use client";

import React, { useState } from "react";
import AddProjectModal from "./addProjectModal";
import axios from "axios";

const Addproject = () => {
	const [showModal, setShowModal] = useState(false);

	const handleAdd = ({ projectName, description, status, assignedTo }) => {};
	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div className='fixed bottom-0 right-0'>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 font-semibold rounded m-10'
				onClick={handleOpenModal}>
				Add Project
			</button>
			<AddProjectModal
				show={showModal}
				onAdd={handleAdd}
				onClose={handleCloseModal}
			/>
		</div>
	);
};

export default Addproject;
