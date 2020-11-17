let today = new Date();
let currenMonth = today.getMonth() + 1;
let currentYears = today.getFullYear();
let currentDay = today.getDay()
let modal = document.getElementById("popup");
let closeIcon = document.querySelector(".close");
let time = [];
let current = null;
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let monthAndYear = document.getElementById("montAndYear");

showCalendar(currenMonth, currentYears);

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body");
  tbl.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
        // console.log(cellText);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-info");
          // cell.classList.add('timeWork')
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }

    // console.log(row);
    [...row.querySelectorAll("tr td")].forEach(async (el) => {
      //Hien thi gio lam len lich
      let result = await firebase
        .firestore()
        .collection("TimeTables")
        .get()
        .then((snap) => {
          snap.docs.forEach((data) => {
            data = snap.docs[0].data().Time;
            for (let i = 0; i < data.length; i++) {
              const time = data[i];
              for (const key in time) {
                const val = time[key];
                let getDay = time["Day"];
                let timeIn = time["timeIn"];
                let timeOut = time["timeOut"];
                if (el.innerHTML == getDay && el.innerHTML > today.getDate()) {
                  var node = document.createElement("p");
                  node.style.backgroundColor = "#3d7afc";

                  var textnode = document.createTextNode(
                    `${timeIn} - ${timeOut}`
                  );

                  node.appendChild(textnode);
                  el.appendChild(node);

                } else if (
                  el.innerHTML == getDay &&
                  el.innerHTML < today.getDate()
                ) {
                  var node = document.createElement("p");
                  node.style.backgroundColor = "#8c9197";
                  var textnode = document.createTextNode(
                    `${timeIn} - ${timeOut}`
                  );
                  node.appendChild(textnode);
                  el.appendChild(node);
                } else if (el.innerHTML == getDay && el.innerHTML == today.getDate()) {
                  var node = document.createElement("p");
                  node.style.backgroundColor = "#c54452";
                  var textnode = document.createTextNode(
                    `${timeIn} - ${timeOut}`
                  );
                  node.appendChild(textnode);
                  el.appendChild(node);
                }
              }
            }
          });
        });

      el.onclick = (e) => {
        if (current) {
          current.style.backgroundColor = "white";
        }
        // console.log(current);
        current = e.target;
        modal.setAttribute("show", "true");
        e.target.style.backgroundColor =
          e.target.style.backgroundColor === "#c2d3f2" ? "white" : "#c2d3f2";
        // console.log(e.target.textContent);
        // Lyấ giá trị ngày làm
        modal.setAttribute("day", el.innerHTML);
      };
    });
    tbl.appendChild(row);
  }
}


function Next() {
  currentYears = currenMonth === 11 ? currentYears + 1 : currentYears;
  currenMonth = (currenMonth + 1) % 12;
  showCalendar(currenMonth, currentYears);
}
function Previous() {
  currentYears = currenMonth === 0 ? currentYears - 1 : currentYears;
  currenMonth = currenMonth === 0 ? 11 : currenMonth - 1;
  showCalendar(currenMonth, currentYears);
}
//
//button checkin
let $vaoCa = document.getElementById("vaoCa");
let $ketCa = document.getElementById("ketCa");

function a() {
  $vaoCa.style.display = "none";      
  let timeIn = new Date().toLocaleTimeString();
 let realTimeIn = convertTime12to24(timeIn);
 time.push(realTimeIn);
  $ketCa.style.display = "block";
}

async function b() {

  alert("ket thuc ca lam");
  $ketCa.style.display = "none";
  let timeOut = new Date().toLocaleTimeString();
let realTimeOut = convertTime12to24(timeOut)
time.push(realTimeOut)  
let range = timeWork(time[0],time[1]);
      let result = await firebase.firestore().collection('RealTime')
                                                .add({
                                                  Month:currenMonth,
                                                  Time:{
                                                    Day:currentDay,
                                                    In:time[0],
                                                    Out:time[1], 
                                                    Range:range,
                                                  }
                                                })
}
function timeWork(timeIn,timeOut) {
  var Intime = moment(timeIn, "HH:mm:ss");
  var Outtime = moment(timeOut, "HH:mm:ss");
  let numWork = (Outtime.diff(Math.ceil(Intime), "hours", "minutes"))
  // console.log((Outtime.diff(Intime, "hours", "minutes")));
 return workingHours = Math.round(numWork * 100) / 100;
  // console.log(workingHours);
 
}

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }
  

      
      