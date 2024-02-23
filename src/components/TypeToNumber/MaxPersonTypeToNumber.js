const maxPersonToNumber = (maxPerson) => {
    const maxPersonTypeMap ={
        '1명': 1,
        '2명': 2,
        '3명': 3,
        '4명': 4,
        '5명': 5,
        '6명': 6,
        '7명': 7,
        '8명': 8,
        '9명': 9,
        '10명': 10,
    }
    return maxPersonTypeMap[maxPerson] || -1;
}

export default maxPersonToNumber;