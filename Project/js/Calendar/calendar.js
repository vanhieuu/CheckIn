

let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
let currenMonth = today.getMonth();
let currentYears = today.getFullYear();
let modal = document.getElementById('popup');
let closeIcon = document.querySelector(".close")
let current = null;
let months = ["Jan"
    , "Feb"
    , "Mar"
    , "Apr"
    , "May"
    , "Jun"
    , "July"
    , "Aug"
    , "Sep"
    , "Oct"
    , "Nov"
    , "Dec"];

let monthAndYear = document.getElementById('montAndYear');

showCalendar(currenMonth, currentYears)

function showCalendar(month, year) {
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById('calendar-body');
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
                console.log(cellText);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                let cell = document.createElement("td")
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                    // cell.classList.add('timeWork')
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }

        }
        let work = JSON.stringify(localStorage.getItem('timeWork'));
        // console.log(row);
        [...row.querySelectorAll("tr td")].forEach(el => {
                    
                    let smallTime  = work.split(['timeIn', '\\'],3)
                    // let smallTime  = work.split(["timeIn","timeOut","\\"]);
                  
                    //         if(work != ""){
                    //             el.innerHTML = work;
                            // }
            el.onclick = (e) => {
                if (current) {
                    current.style.backgroundColor = "white";

                } 
                // console.log(current);
                current = e.target;
                modal.setAttribute("show", "true")
                e.target.style.backgroundColor = e.target.style.backgroundColor === 'yellow' ? 'white' : "yellow";
                // Hiển thị giờ làm lên lịch 
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    e.target.innerHTML = `${dd} - ${smallTime} `;
                }
                else{
                    e.target.innerHTML = `${el.innerHTML} - ${smallTime}`
                }
            }
        })
        tbl.appendChild(row)
    }

}
// function closeModel() {
//     closeIcon.addEventListener("click", function (e) {
//         modal.classList.remove("show");
        
//     })
// }
//Ham nay` k chay trong template

function Next() {
    currentYears = (currenMonth === 11) ? currentYears + 1 : currentYears;
    currenMonth = (currenMonth + 1) % 12;
    showCalendar(currenMonth, currentYears);
}
function Previous() {
    currentYears = (currenMonth === 0) ? currentYears - 1 : currentYears;
    currenMonth = (currenMonth === 0) ? 11 : currenMonth - 1
    showCalendar(currenMonth, currentYears)
}

