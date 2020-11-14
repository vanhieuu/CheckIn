let $template = document.getElementById('check-in-template');

class CheckIn extends HTMLElement {
    endWork = false;
    newDay = new Date();
    currentDay = String(newDay.getDate()).padStart(2, '0');
    currentMonth = String(newDay.getMonth() + 1).padStart(2, '0');
    currentYear = newDay.getFullYear();
    toDay = currentDay + '/' + currentMonth + '/' + currentYear;
    timeWork = JSON.stringify(localStorage.getItem('timeWork'));
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });// Có cũng được mà không cũng được
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$checkIn = this.shadowRoot.getElementById('check-in');
        this.$formCheckIn = this.shadowRoot.querySelectorAll('.check-in-form')
        this.$timeWork = this.shadowRoot.getElementById('time-work');
        this.$checkIn.onsubmit = (event) => {
            event.preventDefault()
            localStorage.setItem('Time-In', JSON.stringify(this.time));
            document.getElementById('time').innerHTML = JSON.parse(localStorage.getItem('Time-In'));

        }
        this.$checkIn.addEventListener('add-work',(event) => {
            this.inWork(event.detail)
        })
    }
    static get observedAttributes() {
        return ['time-work'];

    }
    attributeChangedCallback(name, old, newVal) {
        if (name == 'time-work') {
            this.$timeWork = newVal;
        }
    }
    render() {
        if(this.timeWork){
            this.$checkIn.innerHTML = 
        }

    }
    getTimeCheckIn() {
       this.$checkIn.onsubmit = (event) =>{
                this.time
       }
    }
    renderWork() {
        this.$checkIn != this.$checkIn;
        this.render();
    }
    setTime(time) {
        let today = new Date();
        time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    }
    inWork(task) {
        this.$checkIn
    }
}
window.customElements.define('check-in', CheckIn)