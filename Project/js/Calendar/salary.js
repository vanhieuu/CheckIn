let salary = document.getElementById("salary");

firebase
  .firestore()
  .collection("TimeTables")
  .get()
  .then((result) => {
    let results = result.docs;
    localStorage.len = results.length;

    results.forEach((e, i) => {
      let html = `
    <div>
        <h1 id=header-${i + 1} class="header">${e.data().Month}/${e.data().Year}</h1>
        <table id="item-${i + 1}" class="slideShow">
           <tr>
              <th>Day</th>
              <th>Work Hour</th>
           </tr>
        </table> 
    </div>
        `;
      salary.innerHTML += html;
    });
    return results;
  })
  .then((metadata) => {
    let len = localStorage.getItem("len");
    for (let i = 1; i <= len; i++) {
      let tag = document.getElementById(`item-${i}`);
      //data item thứ i
      let data = metadata[i - 1].data().Time;
      data.sort(function (day1, day2) {
        return day1.Day - day2.Day;
      });
      data.forEach((e) => {
        let html = `
        <tr>
           <td>${e.Day}</td>
           <td>${e.timeIn}-${e.timeOut}</td>
        </tr>
      `;
        tag.insertAdjacentHTML("beforeend", html);
      });
    }
    //add event when hover to h1 
    $('.header').click(function(){
        $('.slideShow').slideDown('slow')
    })
  });

