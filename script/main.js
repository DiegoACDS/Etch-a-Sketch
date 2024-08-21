const div = document.querySelector('.container')
const btn = document.querySelector('.submit')


// get value of btn
btn.addEventListener('click', () => {
    let rate = document.getElementById('number').value
    rate = parseInt(rate)
    createDiv(rate)
})



// generate a multiple DIVs
function createDiv(rate) {
    div.innerHTML = ''
    // calculate the ideal value of divs
    let containerWidth = div.offsetWidth;
    let containerHeight = div.offsetHeight;
    let divsPerRow = Math.floor(Math.sqrt(rate))
    let divSize = Math.min(containerWidth / divsPerRow, containerHeight / divsPerRow)


    for(let i = 0; i < rate; i++) {
        const miniDiv = document.createElement('div')
        miniDiv.classList.add('mini')

        // fixing size of the div

        miniDiv.style.width = `${divSize}`
        miniDiv.style.height = `${divSize}`
        div.appendChild(miniDiv)        
    }
    
}


