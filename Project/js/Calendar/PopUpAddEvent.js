let $template = document.getElementById("popup-template");
class AddEvent extends HTMLElement {
    index = 1;
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
        this.$list = this.shadowRoot.getElementById('list')
      
        this.$formAddEvent.addEventListener('submit', (e) => {
            e.preventDefault();

            if (e.target.timeIn.value === "") return;
            if (e.target.timeOut.value === "") return;

        })
        this.$formAddEvent.onsubmit = (event) => {
            event.preventDefault();
            const timeIn = this.$timeIn.value;
            const timeOut = this.$timeOut.value;
            const workTime = JSON.parse(localStorage.getItem('workTime')) || [];
            const timeWork = {
                timeIn: timeIn,
                timeOut: timeOut
            };

            workTime.push(timeWork);
            localStorage.setItem('timeWork', JSON.stringify(workTime));
            this.render();
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
    render() {
        if (JSON.parse(localStorage.getItem('timeWork')).length > 0) {
            let data = JSON.parse(localStorage.getItem('timeWork'));
            
            let htmlParse = data.sort((time1, time2) => time1 - time2).map((element) => {
                return `<li>Ca ${this.index++} : ${element.timeIn}-${element.timeOut}</li>`
            }).join("");
            this.$list.appendChild(htmlParse);
        }
    }
    convertMoment(time){
        return moment(time)
    }
}
window.customElements.define('show-pop-up', AddEvent)