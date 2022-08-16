document.addEventListener('DOMContentLoaded', () => {
  const TOKEN = 'TOKEN'
  const CHAT_ID = 'CHAT_ID'
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`
  
  function clearInputs(inputs) {
    inputs.forEach((input) => input.value = '')
  }

  document.getElementById('telegramForm').addEventListener('submit', function (event) {
    event.preventDefault()
    const date = new Date().toLocaleString()

    const textMessage = `
      <b>Заявка с сайта | ${date}</b>\n
      <b>Отправитель: </b>${this.user_name.value}
      <b>Почта: </b><a href="mailto:${this.user_email.value}">${this.user_email.value}</a>
      <b>Телефон: </b><a href="tel:${this.user_phone.value}">${this.user_phone.value}</a>
      <b>Сообщение: </b><i>${this.user_text.value}</i>
    `

    fetch(URI_API, {
      method: 'POST',
      headers: { 'content-type': 'application/json', },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: textMessage
      }),
    })
      .then(() => alert('Заявка отправлена!'))
      .catch(e => console.error(e))
      .finally(() => clearInputs(this.querySelectorAll('input, select, textarea')))
  })
})