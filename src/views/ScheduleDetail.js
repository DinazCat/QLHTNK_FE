import { Scheduler } from 'devextreme-react/scheduler';

const data = [
    {
        text: 'Khám bệnh với bác sĩ Tường',
        startDate: new Date('2023-12-19T16:30:00.000Z'),
        endDate: new Date('2023-12-19T18:30:00.000Z'),
    },
    {
        text: 'Khám bệnh với bác sĩ Đức',
        startDate: new Date('2023-12-19T19:00:00.000Z'),
        endDate: new Date('2023-12-19T20:00:00.000Z'),
        allDay: true,
    },
    {
        text: 'Khám bệnh với bác sĩ Tường',
        startDate: new Date('2023-12-19T21:30:00.000Z'),
        endDate: new Date('2023-12-19T22:30:00.000Z'),
    },
    {
        text: 'Khám bệnh với bác sĩ Nga',
        startDate: new Date('2023-12-19T17:00:00.000Z'),
        endDate: new Date('2023-12-19T18:00:00.000Z'),
    },
    {
        text: 'Khám bệnh với bác sĩ Nghĩa',
        startDate: new Date('2023-12-19T19:00:00.000Z'),
        endDate: new Date('2023-12-19T20:35:00.000Z'),
    },
];

const ScheduleDetail = () => {
    const views = ["day", "week", "agenda"]
    return (
        <div>
            <Scheduler
                timeZone="America/Los_Angeles"
                views={views}
                dataSource={data}
                showCurrentTimeIndicator={false}
                startDayHour={7}
                endDayHour={19}
                defaultCurrentView='day'
                cellDuration={30}
            >
            </Scheduler>
        </div >
    )
};

export default ScheduleDetail