let $template = document.getElementById("popup-template");
import { getDataDoc } from "./ultil.js";
class AddEvent extends HTMLElement {
    index = 1;
    current = null;
    list = [];
    newDay = new Date();
    currentDay = String(this.newDay.getDate()).padStart(2, '0');
    currentMonth = String(this.newDay.getMonth() + 1).padStart(2, '0');
    currentYear = this.newDay.getFullYear();
    toDay = this.currentDay + '/' + this.currentMonth + '/' + this.currentYear;
    constructor() {
        super()
        if (!localStorage.getItem('timeWork')) {
            localStorage.setItem('timeWork', "[]")
        }
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
            this.$getTime.style.display = 'block'
            this.addEvent();
        })
        this.$formAddEvent.onsubmit = (event) => {
            event.preventDefault();
            const timeIn = this.$timeIn.value;
            const timeOut = this.$timeOut.value;
            const timeWork = {

                timeIn: timeIn,
                timeOut: timeOut,
            };
            localStorage.setItem('timeWork',JSON.stringify(timeWork));
            // const workTime = JSON.parse(localStorage.getItem('timeWork')) || [];
            // this.addEvent();
            this.render();
            // let time = localStorage.setItem('timeWork', JSON.stringify(workTime));
        }

    }

    static get observedAttributes() {
        return ['show'];
    }
    attributeChangedCallback(name, old, newVal) {
        if (name == 'show') {

            if (newVal == 'false') {
                this.$modal.style.display = 'none';
            } else {
                this.$modal.style.display = 'block';
            }
        }
        console.log(name, old, newVal);

    }
    set List(list){
        this.$list = this.list
        this.render();
            }

       async  addEvent(list) {
        let  Month = this.currentMonth
        let timeWork = JSON.stringify(localStorage.getItem('timeWork'));
        let result = await firebase
                                .firestore()
                                .collection('WorkCalendar')
                                .where('Month' ,'==', Month)
                                .get()
                    if(result.empty){
                        let newMonthWork = await firebase.firestore().collection('WorkCalendar').add({
                                        Month:this.currentMonth,
                                        Time:list,
                                        Year: this.currentYear
                        })
                        await firebase.firestore()
                                        .collection('Time-Tables')
                                        .add({
                                                Time:[],
                                                Month:this.currenMonth,
                                                Year:this.currentYear
                                        })
                    }
    
    }
    update(){
        
    }
    render() {
        if (JSON.parse(localStorage.getItem('timeWork')).length > 0) {
            let data = JSON.parse(localStorage.getItem('timeWork'));
            this.$list.innerHTML = data
                .map(time => {
                    return `<li>Ca ${this.index++} : ${time.timeIn}-${time.timeOut}</li>`
                }).join("");

            localStorage.setItem('timeWork', JSON.stringify(data));
            if (this.$list) {
                alert('Bạn đã tạo ca thành công')
            }

        }
        
    }
    setWork(list){
        this.$list = list
        this.render()
    }
    addWork(list){
            this.list.push(list);
            this.render();
            firebase.firestore()
                    .collection("WorkCalendar")
                    .doc(this.getAttribute("Day"))
                    .update({
                            Time: this.list
                    });
                    
    }
    totalTimeWork(Intime,Outtime) {

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
    // updateFireBase(){
    //     let result = await firebase
    //                         .firestore()
    //                         .collection('TimeTable')
    //                         .doc(this.getAttribute('TimeWork'))
    //                         .get();
    // }
}
window.customElements.define('show-pop-up', AddEvent)