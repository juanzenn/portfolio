const contactButton = document.getElementById("contact_button")
const modalClose = document.getElementsByClassName("cross_icon")[0]
const modal = document.getElementById("modal_container")
const body = document.body

const openContactModal = () => {
  modal.style.display = "block"
  body.style.overflowY = "hidden"
}

contactButton.onclick = openContactModal

modalClose.onclick = () => {
  modal.style.display = "none"
  body.style.overflowY = "auto"
}