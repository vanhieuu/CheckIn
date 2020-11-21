let $template = document.getElementById("popup-template");
import { getDataDoc, timeWork } from "./ultil.js";
class AddEvent extends HTMLElement {
    index = 1;
    current = null;
    timeIn = [];
    timeOut = [];
    newDay = new Date();
    currentDay = String(this.newDay.getDate()).padStart(2, '0');
    currentMonth = String(this.newDay.getMonth() + 1).padStart(2, '0');
    currentYear = this.newDay.getFullYear();
    toDay = this.currentDay + '/' + this.currentMonth + '/' + this.currentYear;
    constructor() {
        super()
        // if (!localStorage.getItem('timeWork')) {
        //     localStorage.setItem('timeWork', "[]")
        // }
        this.attachShadow({ mode: 'open' });// Có cũng được mà không cũng được
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$modal = this.shadowRoot.getElementById('popup1')
        this.$formAddEvent = this.shadowRoot.getElementById('add-event');
        this.$timeIn = this.shadowRoot.getElementById('check-in-time');
        this.$timeOut = this.shadowRoot.getElementById('check-out-time');
        this.$getTime = this.shadowRoot.getElementById('btn-get-time');
        this.$list = this.shadowRoot.getElementById('list');
        this.$close = this.shadowRoot.getElementById('close');
        
        this.$close.addEventListener("click", () => {
            this.$modal.style.display = "none";
        })

        this.$formAddEvent.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.target.timeIn.value === "") return;
            if (e.target.timeOut.value === "") return;
            this.$getTime.style.display = 'block';

        })
        this.$formAddEvent.onsubmit = (event) => {
            event.preventDefault();
            const timeIn = this.$timeIn.value;
            const timeOut = this.$timeOut.value;
            const timeWork = {
                Day: this.toDay,
                timeIn: timeIn,
                timeOut: timeOut,
            };
            // const workTime = JSON.parse(localStorage.getItem('timeWork')) || [];
            this.addEvent(timeWork);
            alert('Tạo ca làm thành công')
            setTimeout(()=>{
                location.reload();
              },1000)
            // this.$formAddEvent.onsubmit = (event) => {
                this.render();
            //     event.preventDefault();
            //     // this.addWork();
            //     this.addEvent();

            // }
            // let time = localStorage.setItem('timeWork', JSON.stringify(workTime));
        }

    }

    static get observedAttributes() {
        return ['show', 'day','timework']
    }
    attributeChangedCallback(name, old, newVal) {
        if (name == 'show') {

            if (newVal == 'false') {
                this.$modal.style.display = 'none';
            } else {
                this.$modal.style.display = 'block';
            }

        }
        if (name == 'day') {
            this.currentDay = newVal
            this.toDay = this.currentDay;
        }
        if(name == 'timework'){
            this.$list.innerHTML = newVal
        }
        // console.log(name, old, newVal);


    }
    // set List(list){
    //     this.list = list
    //     this.render();
    // }
    
    setTimeIn(timeIn){
        this.$timeIn = timeIn;
    }    
    setTimeOut(timeOut){
        this.timeOut = timeOut;
    }
    
    async addEvent(timeWork) {
        console.log(this.toDay);
        let month = this.currentMonth
        let year = this.currentYear;
        // let timeWork = JSON.parse(JSON.stringify(localStorage.getItem('timeWork')));
        let result = await firebase
            .firestore()
            .collection('WorkCalendar')
            .where('Month', '==', month)
            .get()
        if (result.empty) {
            await firebase.firestore().collection('WorkCalendar').add({
                Month: month,
                Year: year
            })

            await firebase.firestore()
                .collection('TimeTables')
                .add({
                    Time: [timeWork],
                    Month: month,
                    Year: year
                })
        } else {
            let result = await firebase
                .firestore()
                .collection('TimeTables')
                .where('Month', '==', month)
                .get()
            let data = result.docs[0]
            await firebase.firestore()
                .collection('TimeTables').doc(data.id)
                .update({
                    Time: [...data.data().Time, timeWork]
                })
        }
        alert('Tạo ca làm thành công')

    }
    // update(list){
    //     this.list.push(list)
    //     this.render()
    //         firebase.firestore()
    //                             .collection('TimeTables')
    //                             .doc(this.getAttribute('Month'))
    //                             .update({
    //                                 Time:this.list
    //                             });

    
   
    totalTimeWork(Intime, Outtime) {

        const totalTimeWork = JSON.parse(localStorage.getItem('timeWork'));
        for (const key in totalTimeWork) {
            if (totalTimeWork.hasOwnProperty(key)) {
                const time = totalTimeWork[key];
                //         console.log(time);


                let getTimeIn = time[0].timeIn;
                let getTimeOut = time[0].timeOut
                Intime = moment(getTimeIn, "HH:mm:ss");
                Outtime = moment(getTimeOut, "HH:mm:ss");
                let numWork = (Outtime.diff(Math.ceil(Intime), "hours", "minutes"))
                // console.log((Outtime.diff(Intime, "hours", "minutes")));
                let workingHours = Math.round(numWork * 100) / 100;
                return range = workingHours;
            }
        }
    }
    validate(timeIn, timeOut) {
        let isPassed = true
        if (timeIn == "") {
            this.$timeIn.error = "Chọn thời gian"
            alert('Vui lòng chọn thời gian ');
            isPassed = false;
        } else if (timeOut == "") {
            this.$timeOut.error = "Chọn thời gian"
        }
        return isPassed
    }

    // updateFireBase(){
    //     let result = await firebase
    //                         .firestore()
    //                         .collection('TimeTable')
    //                         .doc(this.getAttribute('TimeWork'))
    //                         .get();
    // }
}

window.customElements.define('show-pop-up', AddEvent)