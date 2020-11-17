export function saveTime(time) {
    localStorage.setItem('timeWork', JSON.stringify(time))
}
export function getTime() {
    return JSON.parse(localStorage.getItem('timeWork'));
}
export function timeWork(time) {
    var Intime = moment(time.timeIn, "HH:mm:ss");
    var Outtime = moment(time.timeOut, "HH:mm:ss");
    let numWork = (Outtime.diff(Math.ceil(Intime), "hours", "minutes"))
    console.log((Outtime.diff(Intime, "hours", "minutes")));
    let workingHours = Math.round(numWork * 100) / 100;
    console.log(workingHours);

}
export function getDataDoc(doc, excepts = []) {
    let data = doc.data();
    data.Time = doc.Time;
    data.DayWork = doc.DayWork;
    for (let except of excepts) {
        delete data[except];
    }
    return data;
}

