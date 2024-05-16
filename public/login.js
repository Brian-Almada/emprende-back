const form = document.querySelector('form')
const inputEmail = document.querySelector('.email')
const inputCode = document.querySelector('.code')

const baseBackendUrl = `${window.origin}/api`

form.addEventListener('submit', async function (e) {
    e.preventDefault()

    const res = await fetch(
        `${baseBackendUrl}/auth/login/${inputEmail.value}/code`,
        {
            method: 'POST',
        }
    )
    const resJSON = await res.json()
})