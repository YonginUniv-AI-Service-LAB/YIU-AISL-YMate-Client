const maxPersonToNumber = (maxPerson) => {
    const maxPersonTypeMap ={
        '1명': 1,
        '2명': 2,
        '3명': 3
    }
    return maxPersonTypeMap[maxPerson] || -1;
}

export default maxPersonToNumber;