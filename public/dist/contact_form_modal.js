const contactButton=document.getElementById("contact_button"),modalClose=document.getElementsByClassName("cross_icon")[0],modal=document.getElementById("modal_container"),body=document.body,openContactModal=()=>{modal.style.display="block",body.style.overflowY="hidden"};contactButton.onclick=openContactModal,modalClose.onclick=()=>{modal.style.display="none",body.style.overflowY="auto"};