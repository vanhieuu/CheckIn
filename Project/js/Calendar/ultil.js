export function saveTime(time){
    localStorage.setItem('timeWork',JSON.stringify(time))
}
export function getTime(){
    return JSON.parse(localStorage.getItem('timeWork'));
}
export function timeWork(time){
    var Intime = moment("07:05:53", "HH:mm:ss");
    var Outtime = moment("12:30:31", "HH:mm:ss");
     let numWork = (Outtime.diff(Math.ceil(Intime),"hours","minutes"))
    console.log( (Outtime.diff( Intime, "hours", "minutes")) );    
    let workingHours = Math.round(numWork * 100) / 100;
          console.log(workingHours);
        
}