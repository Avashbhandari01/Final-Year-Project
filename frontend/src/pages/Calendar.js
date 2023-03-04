import React from 'react';
import { Calendar } from 'antd';
import { Typography, Container, Stack, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const CalendarPage = () => {

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

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
            <Calendar onPanelChange={onPanelChange} />
            </Card>
            </Container>
        </>
    )
};

export default CalendarPage;