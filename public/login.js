const form = document.querySelector('form')
const inputEmail = document.querySelector('.email')
const inputCode = document.querySelector('.code')
const codeBtn = document.querySelector('.codeBtn')

const baseBackendUrl = `${window.origin}/api`

codeBtn.addEventListener('click', async function (e) {
    console.log("Pidiendo código")

    const res = await fetch(
        `${baseBackendUrl}/auth/login/${inputEmail.value}/code`,
        {
            method: 'POST',
        }
    )
    const resJSON = await res.json()
})
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    console.log("Pidiendo código")

    const res = await fetch(
        `${baseBackendUrl}/auth/login/${inputEmail.value}/code`,
        {
            method: 'POST',
        }
    )
    const resJSON = await res.json()
})