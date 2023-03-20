import React from 'react';
import { Typography, Container, Stack, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "../components/calendarEvents/events"

const locales = {
    "en-US": require("date-fns/locale/en-US")
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  })

// const events = [
//   {
//     title: "Big Meeting",
//     allDay: true,
//     start: new Date(2023, 2, 20),
//     end: new Date(2023, 2, 20)
//   },
//   {
//     title: "Vacation",
//     allDay: true,
//     start: new Date(2023, 2, 20),
//     end: new Date(2023, 2, 20)
//   },
//   {
//     title: "Conference",
//     allDay: true,
//     start: new Date(2023, 2, 20),
//     end: new Date(2023, 2, 20)
//   },

// ]

const CalendarPage = () => {

    return (
        <>
            <Helmet>
                <title> Calendar | Guardian Portal </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Calendar
                    </Typography>
                </Stack>
            <Card>
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
            </Card>
            </Container>
        </>
    )
};

export default CalendarPage;