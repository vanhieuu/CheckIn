let $template = document.getElementById("popup-template");
    class AddEvent extends HTMLElement{
       
        constructor(){
           
            super()
            this.attachShadow({ mode: 'open' });// Có cũng được mà không cũng được
            this.shadowRoot.appendChild($template.content.cloneNode(true));
            this.$modal = this.shadowRoot.getElementById('popup1')
            this.$formAddEvent = this.shadowRoot.getElementById('.add-event');
            this.$timeIn = this.shadowRoot.getElementById('#check-in-time');
            this.$timeOut = this.shadowRoot.getElementById('#check-out-time');
            this.$getTime = this.shadowRoot.getElementById('btn-get-time');
            
            this.$formAddEvent.addEventListener('keyup',()=>{
                this.$getTime.disable = !this.$timeIn.value;
            })
            this.$formAddEvent.onsubmit = (event) =>{    
                    event.preventDefault();
                    const workTime = JSON.parse(localStorage.getItem('workTime')) || [];
                    const timeWork = {
                        timeIn: this.$timeIn,
                        timeOut: this.$timeOut
                    };
                    workTime.push(timeWork);
                    localStorage.setItem('timeWork',workTime);
            }
        }
    }
    window.customElements.define('overlay',AddEvent)