let today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
let currenMonth = today.getMonth();
let currentYears = today.getFullYear();
let modal = document.getElementById("popup");
let closeIcon = document.querySelector(".close");
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
        let result =  await firebase
        .firestore()
        .collection('TimeTables')
        .get()
        .then((snap)=>{
          snap.docs.forEach((data) =>{
            data = snap.docs[0].data().Time;
              for(let i = 0; i < data.length; i++){
                const time = data[i];
                  for(const key in time){
                    const val = time[key]
                    let getDay = time['Day']
                    let timeIn = time['timeIn']
                    let timeOut = time['timeOut']
                    if (el.innerHTML == getDay) {
                      var node = document.createElement("p");
                      var textnode = document.createTextNode(`${timeIn} - ${timeOut}`);
                      node.appendChild(textnode);
                      el.appendChild(node);
                    }
                  }
              }
         
          })
        })
       
          


    


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
// [...row]

// function closeModel() {
//     closeIcon.addEventListener("click", function (e) {
//         modal.classList.remove("show");

//     })
// }
//Ham nay` k chay trong template

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
let $vaoCa = document.getElementById('vaoCa');
let $ketCa = document.getElementById('ketCa');
console.log(today.getHours() + " " + today.getMinutes());
function a(){
  console.log('step1');
  //
  $vaoCa.style.display = 'none'
  $ketCa.style.display = 'block'
}
function b(){
  console.log("step2");
  alert("ket thuc ca lam")
  $ketCa.style.display ="none"
}

