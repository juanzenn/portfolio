const mainImages = document.getElementsByClassName("main-image")
const thumbnails = document.getElementsByClassName("image")

const handleClick = index => {
  for (let i = 0; i < mainImages.length; i++) {
    mainImages[i].style.opacity = "0"
  }

  console.log(index)
  mainImages[index].style.opacity = "1"
}

for (let i = 0; i < thumbnails.length; i++) {  
  thumbnails[i].addEventListener('click', function() {
    handleClick(thumbnails[i].dataset.index)
  })
}

