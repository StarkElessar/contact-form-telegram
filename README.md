# Contact Form to Telegram

Контактная форма для отправки данных в телеграм чат. Для использования подключи нужный файл из папки `/js` или `/app.js` или `/index.js`.

---

## Usage

### 1. Небезопасный способ

Если не переживаешь за безопасность и не боишься засветить свой `token` и `chat_id` тогда в корневом файле сайта `/index.html` подключи:

```html
<script src="js/index.js"></script>
```

Только в данную переменную запиши свой `token`:

```javascript
const TOKEN = 'TOKEN' // token твоего телеграм-бота
```

А в данную переменную запиши свой ```chat_id```:

```javascript
const CHAT_ID = 'CHAT_ID' // id твоего чата, куда бот будет пересылать данные из формы
```

URL адрес, на который отправляем `POST` запрос для отправки данных из формы:

```javascript
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`
```

### 2. Безопасный способ

Если ты переживаешь за безопасность тогда, будем отправлять запрос на мой сервер.

В корневом файле сайта `/index.html` подключи:

```html
<script src="js/app.js"></script>
```

URL адрес, на который отправляем `POST` запрос для отправки данных из формы на сервер:

```javascript
const uriRequest = 'https://send-to-telegram.herokuapp.com/api/telegram'
```

Ссылка на репозиторий сервера:
[send-to-telegram](https://github.com/StarkElessar/send-to-telegram)
