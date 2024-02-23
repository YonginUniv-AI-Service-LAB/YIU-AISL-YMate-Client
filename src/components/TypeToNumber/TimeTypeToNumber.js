const timeToNumber = (time) => {
    const timeTypeMap = {
        '15분 후': 15,
        '30분 후': 30,
        '1시간 후': 60,
        '2시간 후': 120,
        '3시간 후': 180,
        '6시간 후': 360,
        '9시간 후': 540,
        '12시간 후': 720,
        '24시간 후': 1440
    }
    return timeTypeMap[time] || -1;
}

export default timeToNumber;