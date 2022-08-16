document.addEventListener('DOMContentLoaded', () => {
  function clearInputs(inputs) {
    inputs.forEach((input) => input.value = '')
  }

  function toJSONString(form) {
    const objFormData = {}

    form.querySelectorAll('input, select, textarea').forEach((element) => {
      objFormData[element.name] = element.name ? element.value : ''
    })

    return JSON.stringify(objFormData)
  }

  function submissionForms(formId) {
    const form = document.getElementById(formId)
    const allInputs = form.querySelectorAll('input, select, textarea')
    const allForms = document.querySelectorAll('form')
    const uriRequest = 'https://send-to-telegram.herokuapp.com/api/telegram'

    const postData = async (url, data) => {
      const result = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: data
      });

      return await result.json()
    }

    allForms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault()

        postData(uriRequest, toJSONString(form))
          .then((result) => console.log(result))
          .catch((error) => console.error(error))
          .finally(() => clearInputs(allInputs))
      })
    })
  }

  function maskedInput() {
    //! Вырезаем из поля ввода буквы, пробелы и возвращаем только цифры
    const getInputNumbersValue = (input) => input.value.replace(/\D/g, '')

    //! Запрещаем вставлять буквы
    const onPhonePaste = (event) => {
      const input = event.target
      const inputNumbersValue = getInputNumbersValue(input)
      const pasted = event.clipboardData || window.clipboardData

      if (pasted) {
        const pastedText = pasted.getData('Text')

        if (/\D/g.test(pastedText)) {
          input.value = inputNumbersValue
          return
        }
      }
    }

    const onPhoneInput = function (event) {
      const input = event.target
      let formattedInputValue = ''
      let inputNumbersValue = getInputNumbersValue(input)
      let selectionStart = input.selectionStart

      if (!inputNumbersValue) {
        return input.value = ''
      }

      if (input.value.length != selectionStart) {
        if (event.data && /\D/g.test(event.data)) {
          input.value = inputNumbersValue
        }
        return
      }

      if (['8'].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == '8') {
          formattedInputValue = '8'
        }
        if (inputNumbersValue.length > 1) {
          formattedInputValue += inputNumbersValue.substring(1, 2) + ' ('
        }
        if (inputNumbersValue.length >= 3) {
          formattedInputValue += inputNumbersValue.substring(2, 4)
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
        }
      } else {
        //! Not Belarus phone Number
        formattedInputValue = '+' + inputNumbersValue.substring(0, 12)
      }

      input.value = formattedInputValue
    }

    //! Очищаем поле после удаления последнего символа
    const onPhoneKeyDown = (event) => {
      const inputValue = event.target.value.replace(/\D/g, '')

      if (event.keyCode == 8 && inputValue.length == 1) {
        event.target.value = ''
      }
    }

    document.querySelectorAll('input[type="tel"]').forEach((input) => {
      input.addEventListener('keydown', onPhoneKeyDown)
      input.addEventListener('input', onPhoneInput, false)
      input.addEventListener('paste', onPhonePaste, false)
    })
  }
  maskedInput()
  submissionForms('telegramForm')
})