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
            
            this.$formAddEvent.onsubmit = (event) =>{    
                    event.preventDefault();
                        this.handle();
            }
        }
   async handle(){
        let timeIn = this.$timeIn.value;
        let timeOut = this.$timeOut.value;

    }
        
    }