let $template = document.getElementById('check-in-template');

class CheckIn extends HTMLElement{
        endWork = false;
    constructor(){
            super();
            this.attachShadow({ mode: 'open' });// Có cũng được mà không cũng được
            this.shadowRoot.appendChild($template.content.cloneNode(true));
            this.$checkIn = this.shadowRoot.getElementById('check-in');
            this.$timeWork = this.shadowRoot.getElementById('time-work');
            this.$checkIn.onclick = () =>{
                    
            }
        }
        static get observedAttributes(){
            return ['time-work'];
            
        }
        attributeChangedCallback(name,old,newVal){
            if(name == 'time-work'){
                this.$timeWork = newVal;
            }
        }
        render(){
            this.$timeWork.innerHTML = this.$timeWork;

        }
    getTimeCheckIn(){
        localStorage.setItem('timeIn',)
    }
    renderWork(){
        this.$checkIn != this.$checkIn;
        this.render();
    }
   
     
}
window.customElements.define('check-in',CheckIn)