const blackBackground = document.getElementsByClassName("black-background")[0]
const openButton = document.getElementsByClassName("open_menu")[0]
const closeButton = document.getElementsByClassName("close_menu")[0]
const navbarContainer = document.getElementsByClassName(
  "navbar_items_container"
)[0]

const openMenu = () => {
  openButton.style.display = "none"
  body.style.overflowY = "hidden"
  blackBackground.classList.add("background-change")
  blackBackground.style.display = "block"
  navbarContainer.classList.add("slide")
}

const closeMenu = () => {
  if (window.innerWidth > 768) {
    return
  }
  
  openButton.style.display = "block"
  body.style.overflowY = "auto"
  blackBackground.classList.remove("background-change")

  setTimeout(() => (blackBackground.style.display = "none"), 300)
  navbarContainer.classList.remove("slide")
}
