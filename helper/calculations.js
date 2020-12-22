const calculateBoxWhiskerData = (numbers) => {
    // coded as https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch12/5214889-eng.htm
    numbers.sort(function (a, b) {
        return a - b;
    });
    let length = numbers.length;
    let firstHalf = numbers.slice(0, Math.floor(length / 2));
    let secondHalf = numbers.slice(Math.floor(length / 2), length);

    const firstObservation = numbers[0];
    const secondObservation = median(firstHalf);
    const thirdObservation = median(numbers);
    const fourthObservation = median(secondHalf);
    const fifthObservation = numbers[length - 1];

    return [
        firstObservation,
        secondObservation,
        thirdObservation,
        fourthObservation,
        fifthObservation
    ];
}

const median = (values) => {
    if (values.length === 0) return 0;
    values.sort(function (a, b) {
        return a - b;
    });
    var half = Math.floor(values.length / 2);
    if (values.length % 2)
        return values[half];
    return (values[half - 1] + values[half]) / 2.0;
}

const average = (values) => {
    let sum = 0;
    let average = 0;
    let valueCount = values.length;
    for (let i = 0; i < values.length; i++) {
        sum += parseInt(values[i]);
    }
    average = (sum / valueCount).toFixed(2);
    return parseFloat(average);
}

module.exports = {
    calculateBoxWhiskerData: calculateBoxWhiskerData,
    median: median,
    average: average
}
