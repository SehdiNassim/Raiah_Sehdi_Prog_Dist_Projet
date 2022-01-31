export const addLoader=()=>{
    document.body.style.overflowY='hidden'
    const container = document.createElement("div")
    container.className='bars-loader-container'
    container.id='bars-loader-container'
    const loader = document.createElement("div")
    loader.className='bars-loader'
    const div1 = document.createElement("div")
    const div2 = document.createElement("div")
    const div3 = document.createElement("div")
    loader.appendChild(div1)
    loader.appendChild(div2)
    loader.appendChild(div3)
    container.appendChild(loader)
    document.body.appendChild(container)
}
export const removeLoader=()=>{
    document.body.style.overflowY='scroll'
    const loader = document.getElementById('bars-loader-container')
    if (loader) {
        document.body.removeChild(loader)
    }
}