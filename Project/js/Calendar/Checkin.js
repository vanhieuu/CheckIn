// let $template = document.getElementById('check-in-template');

// class CheckIn extends HTMLElement {
//     currentTime = '';
//     endWork = false;
//     newDay = new Date();
//     currentDay = String(newDay.getDate()).padStart(2, '0');
//     currentMonth = String(newDay.getMonth() + 1).padStart(2, '0');
//     currentYear = newDay.getFullYear();
//     toDay = currentDay + '/' + currentMonth + '/' + currentYear;
//     timeWork = JSON.stringify(localStorage.getItem('timeWork'));
//     time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });// Có cũng được mà không cũng được
//         this.shadowRoot.appendChild($template.content.cloneNode(true));
//         this.$checkIn = this.shadowRoot.getElementById('btn-check-in');
//         this.$formCheckIn = this.shadowRoot.querySelectorAll('.check-in-form')
//         this.$time = this.shadowRoot.getElementById('time');
     
    
      
     
//     }
//     static get observedAttributes(){
//         return ['time-in','time-out'];
//     }
    
//     // Gán lại giá trị cho thuộc tính
//     attributeChangedCallback(name,old,newVal){
//                 switch(name){
//                     case 'time-in':{
//                         this.$timeIn = newVal
//                     }
//                     break;

//                     case 'time-out':{
//                         this.$timeOut= newVal
//                     }
//                         break;
                   
//                 }
//                 this.render();

//         }
// async Display(){

//     let result = await firebase.firestore()
//                                 .collection('TimeTables')
//                                 .where('Month','==',this.currentMonth)
//                                 .get()
//              let data = result.docs[0]
//         this.$time.innerHTML = `${data.data().timeIn} - ${data.data().timeIn}`

// }
   

//     }
//     getTimeCheckIn() {
//        this.$checkIn.onsubmit = (event) =>{
//                 this.$timeIn = today.getHours() + ':' + today.getMinutes()
//        }
//     }
//     renderWork() {
//         this.$checkIn != this.$checkIn;
//         this.render();
//     }
//     setTime(time) {
//         let today = new Date();
//         time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     }
//     inWork(task) {
//         this.$checkIn
//     }
// }
// window.customElements.define('check-in', CheckIn)