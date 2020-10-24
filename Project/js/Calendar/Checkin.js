let $template = document.getElementById('check-in-template');

class CheckIn extends HTMLElement{
        constructor(){
            super();
            this.attachShadow({ mode: 'open' });// Có cũng được mà không cũng được
            this.shadowRoot.appendChild($template.content.cloneNode(true));
            this.$checkIn = this.shadowRoot.getElementById('check-in');
            this.$checkIn.onclick = () =>{
                    
            }
        }
    getTimeCheckIn(){
        let date = new Date();
         let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            let Intime = moment(time, "HH:mm:ss");
            let getCheckInTime = new CustomEvent('get-checkin-time',{
                bubbles:true,
                detail:{
                    date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
                }   
            })
     

    
    }
}