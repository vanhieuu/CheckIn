let $template = document.getElementById("popup-template");
    class AddEvent extends HTMLElement{
       
        constructor(){
           console.log('e');
            super()
            this.attachShadow({ mode: 'open' });// Có cũng được mà không cũng được
            this.shadowRoot.appendChild($template.content.cloneNode(true));
            this.$modal = this.shadowRoot.getElementById('popup1')
            this.$formAddEvent = this.shadowRoot.getElementById('add-event');
            this.$timeIn = this.shadowRoot.getElementById('check-in-time');
            this.$timeOut = this.shadowRoot.getElementById('check-out-time');
            this.$getTime = this.shadowRoot.getElementById('btn-get-time');
            
            this.$formAddEvent.addEventListener('submit',(e)=>{
                e.preventDefault();
            
                if(e.target.timeIn.value === "") return ;
                if(e.target.timeOut.value === "") return ;
                
            })
            this.$formAddEvent.onsubmit = (event) =>{    
                    event.preventDefault();
                    const timeIn = this.$timeIn.value;
                    const timeOut =  this.$timeOut.value;
                    const workTime = JSON.parse(localStorage.getItem('workTime')) || [];
                    const timeWork = {
                        timeIn: timeIn,
                        timeOut: timeOut
                    };

                    workTime.push(timeWork);
                    localStorage.setItem('timeWork',JSON.stringify(workTime));
                    console.log(timeWork);
            }
        }

        static get observedAttributes(){
            return ['show'];
        }
        attributeChangedCallback(name,old,newVal){
            if(name == 'show'){
            
                if(newVal == 'false'){
                    this.$modal.style.display = 'none';
                }else{
                    this.$modal.style.display = 'block';
                }
            }
            console.log(name,old,newVal);
         
        }
    }
    window.customElements.define('show-pop-up',AddEvent)