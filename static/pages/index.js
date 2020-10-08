const log = e => {
    e.preventDefault();
    let data = new FormData(form)
    for(let [name, value] of data) {
        console.log(`${name} = ${value}`)
    }
}

const form = document.querySelector('form');
form ? form.onsubmit = log : undefined

const save = document.getElementById('save')
save ? save.onclick = log : undefined
