// Добавляем в корзину
const inputItem = document.getElementById('nameItem')
const inputPrice = document.getElementById('namePrice')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

createBtn.onclick = function () {
  if (inputItem.value.length === 0) {
    return
  }
  if (inputPrice.value === '') {
    return
  }
  listElement.insertAdjacentHTML(
    'beforeend',
    `
		<div class="card-item" >
            <p class="card-title">${inputItem.value}</p>

            <div class="buy">
              <div class="card-total">
                <div href="#" class="btn-minus btn" data-action="minus">-</div>
                <div class="total" data-counter="">1</div>
                <div href="#" class="btn-plus btn" data-action="plus">+</div>
              </div>

              <p class="price">${inputPrice.value} ₽</p>
            </div>
      </div>
	`
  )
  inputItem.value = ''
  inputPrice.value = ''
}

// Добавляем прослушку на всём окне
window.addEventListener('click', function (event) {
  // Объявляем переменную для счётчика
  let counter

  // Проверяем клик строго по кнопкам Плюс или Минус
  if (
    event.target.dataset.action === 'plus' ||
    event.target.dataset.action === 'minus'
  ) {
    // Находим обёртку счётчика
    const cardTotal = event.target.closest('.card-total')
    // Находим div с числом счётчика
    counter = cardTotal.querySelector('[data-counter]')
  }

  // Проверяем , является ли элемент кнопкой Плюс
  if (event.target.dataset.action === 'plus') {
    // Изменяем текст в счётчике , увеличивая его на 1
    counter.innerText = ++counter.innerText
  }

  // Проверяем , является ли элемент кнопкой Минус
  if (event.target.dataset.action === 'minus') {
    // Проверяем , чтобы счётчик был > 1
    if (parseInt(counter.innerText) > 1) {
      // Изменяем текст в счётчике , уменьшая его на 1
      counter.innerText = --counter.innerText

      // Проверка на товар , который находится в корзине
    } else if (
      event.target.closest('.card-item') &&
      parseInt(counter.innerText) === 1
    ) {
      // Удаляем товар из корзины
      event.target.closest('.card-item').remove()

      calcPrice()
    }
  }

  if (
    event.target.hasAttribute('data-action') &&
    event.target.closest('.card')
  ) {
    calcPrice()
  }
})

function calcPrice() {
  const cardItems = document.querySelectorAll('.card-item')
  const totalPriceEl = document.querySelector('.sum-price')

  let sumPrice = 0
  cardItems.forEach(function (item) {
    const amountEl = item.querySelector('[data-counter]')
    const priceEl = item.querySelector('.price')

    const currentPrice =
      parseInt(amountEl.innerText) * parseInt(priceEl.innerText)
    sumPrice += currentPrice
  })

  totalPriceEl.innerText = sumPrice
}
