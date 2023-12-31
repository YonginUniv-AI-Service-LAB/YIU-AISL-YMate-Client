const timeToNumber = (time) => {
    const timeTypeMap = {
        '1시간 후': 1,
        '2시간 후': 2,
        '3시간 후': 3,
        '4시간 후': 4,
        '5시간 후': 5,
        '6시간 후': 6,
        '7시간 후': 7,
        '8시간 후': 8,
        '9시간 후': 9,
        '10시간 후': 10,
        '11시간 후': 11,
        '12시간 후': 12,
    }
    return timeTypeMap[time] || -1;
}

export default timeToNumber;