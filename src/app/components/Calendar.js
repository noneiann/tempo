"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "./calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
	const [events, setEvents] = useState([]);

	const fetchEvents = async () => {
		try {
			const response = await axios.get("http://localhost:5000/sessions");
			const sessions = response.data.map((session) => ({
				id: session.Session_ID,
				title: session.Name,
				start: new Date(moment.utc(session.Start_ID).local()), // Convert UTC to local timezone
				end: new Date(moment.utc(session.Finish_ID).local()), // Convert UTC to local timezone
				project: session.Project_ID,
				task: session.Task_ID,
			}));
			console.log("Sessions:", sessions);
			setEvents(sessions);
		} catch (error) {
			console.error("Error fetching events:", error);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	return (
		<div>
			<Calendar
				events={events}
				localizer={localizer}
				startAccessor='start'
				endAccessor='end'
				components={{
					event: (props) => {
						const eventDuration = moment.duration(
							moment(props.event.end).diff(moment(props.event.start))
						);
						const formattedDuration =
							eventDuration.hours().toString().padStart(2, "0") +
							":" +
							eventDuration.minutes().toString().padStart(2, "0") +
							":" +
							eventDuration.seconds().toString().padStart(2, "0");
						return (
							<div
								className='rbc-eventmf'
								onClick={() => console.log("Event clicked!")}>
								<strong style={{ marginBottom: "5px" }}>
									{props.event.title}
								</strong>
								<strong style={{ marginBottom: "5px" }}>
									{props.event.project}
								</strong>
								<strong style={{ marginBottom: "5px" }}>
									{props.event.task}
								</strong>
								<span>{formattedDuration}</span>
							</div>
						);
					},
				}}
				style={{
					height: "82.2vh",
					backgroundColor: "#fff",
					color: "#333",
					boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
				}}
				defaultView='week'
				views={["week", "day"]}
				dayLayoutAlgorithm='no-overlap'
				step={15} // Set the step to 15 minutes
				timeslots={4} // Set the number of timeslots per hour
			/>
		</div>
	);
};

export default MyCalendar;
