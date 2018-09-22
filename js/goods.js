'use strict';

var CANDY_NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var PICTURES = [
  'gum-cedar',
  'gum-chile',
  'gum-eggplant',
  'gum-mustard',
  'gum-portwine',
  'gum-wasabi',
  'ice-cucumber',
  'ice-eggplant',
  'ice-garlic',
  'ice-italian',
  'ice-mushroom',
  'ice-pig',
  'marmalade-beer',
  'marmalade-caviar',
  'marmalade-corn',
  'marmalade-new-year',
  'marmalade-sour',
  'marshmallow-bacon',
  'marshmallow-beer',
  'marshmallow-shrimp',
  'marshmallow-spicy',
  'marshmallow-wine',
  'soda-bacon',
  'soda-celery',
  'soda-cob',
  'soda-garlic',
  'soda-peanut-grapes',
  'soda-russian'
];

var CANDY_CONTENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var CANDYS_AMOUNT = 26;
var CANDY_RATINGS = [
  'stars__rating--one',
  'stars__rating--two',
  'stars__rating--three',
  'stars__rating--four',
  'stars__rating--five'
];

/**
 * Перемешивает значения исходного масива случайным образом и возвращает новый массив.
 * @param {Array} arr - Исходный массив.
 * @return {Array} - Перемешанный массив.
 */
var shuffleArray = function (arr) {
  var arrCopy = arr.slice();
  var result = [];
  while (arrCopy.length) {
    var randomArrayIndex = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy[randomArrayIndex]);
    arrCopy.splice(randomArrayIndex, 1);
  }
  return result;
};

/**
 * Возвращает случайное число в заданном диапазоне.
 * @param {Number} minValue - Минимальное значение.
 * @param {Number} maxValue - Максимальное значение.
 * @return {Number} - Случайное число из заданного диапазона.
 */
var getRandomNumberFromRange = function (minValue, maxValue) {
  var result = Math.floor(minValue + Math.random() * (maxValue + 1));
  return (result > maxValue) ? --result : result;
};

/**
 * Возвращает случайный набор ингридиентов.
 * @param {Array} contents - Массив ингридиентов.
 * @return {string} - Строка со случайным набором ингридиетов, разделённых запятой.
 */
var getContents = function (contents) {
  contents = shuffleArray(contents);
  contents.length = getRandomNumberFromRange(1, contents.length);
  return contents.join(', ');
};

/**
 * Создаёт массив объектов сладостей.
 * @param {Array} names - Массив названий сладостей.
 * @param {Array} pictures - Массив изображений сладостей.
 * @param {Array} contents - Массив ингридиентов сладостей.
 * @param {Number} amount - Количество объектов со сладостями.
 * @return {Array} - Массив объектов сладостей.
 */
var makeCandys = function (names, pictures, contents, amount) {
  names = shuffleArray(names);
  pictures = shuffleArray(pictures);

  var candys = [];

  for (var i = 0; i < amount; i++) {
    candys[i] = {
      name: names[i],
      picture: './img/cards/' + pictures[i] + '.jpg',
      amount: getRandomNumberFromRange(0, 20),
      price: getRandomNumberFromRange(100, 1500),
      weight: getRandomNumberFromRange(30, 300),
      rating: {
        value: getRandomNumberFromRange(1, 5),
        number: getRandomNumberFromRange(10, 900)
      },
      nutritionFacts: {
        sugar: !!getRandomNumberFromRange(0, 1),
        energy: getRandomNumberFromRange(70, 500),
        contents: getContents(contents)
      }
    };
  }

  return candys;
};

var candys = makeCandys(CANDY_NAMES, PICTURES, CANDY_CONTENTS, CANDYS_AMOUNT);
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
var catalogCardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

/**
 * Создаёт карточку с информацией о сладости.
 * @param {Object} candy - Объект с информацие о сладости.
 * @return {HTMLElement} - Заполенный данными элемент сладости.
 */
var renderCandy = function (candy) {
  var candyElement = catalogCardTemplate.cloneNode(true);
  var amountClass;

  if (candy.amount === 0) {
    amountClass = 'card--soon';
  } else if (candy.amount >= 1 && candy.amount <= 5) {
    amountClass = 'card--little';
  } else if (candy.amount > 5) {
    amountClass = 'card--in-stock';
  }

  candyElement.className = 'card catalog__card ' + amountClass;
  candyElement.querySelector('.card__title').textContent = candy.name;

  var cardPrice = candyElement.querySelector('.card__price');
  cardPrice.childNodes[0].textContent = candy.price + ' ';
  cardPrice.querySelector('.card__weight').textContent = '/ ' + candy.weight + 'Г';

  var ratingClass = CANDY_RATINGS[candy.rating.value - 1];
  var starRaiting = candyElement.querySelector('.stars__rating');

  starRaiting.className = 'stars__rating ' + ratingClass;
  candyElement.querySelector('.star__count').textContent = '(' + candy.rating.number + ')';
  candyElement.querySelector('.card__characteristic').textContent = candy.nutritionFacts.sugar ?
    'Содержит сахар' : 'Без сахара';
  candyElement.querySelector('.card__composition-list').textContent = candy.nutritionFacts.contents;
  var candyImage = candyElement.querySelector('.card__img');
  candyImage.src = candy.picture;
  candyImage.alt = candy.name;

  return candyElement;
};

var fragment = document.createDocumentFragment();

candys.forEach(function (candy) {
  fragment.appendChild(renderCandy(candy));
});

catalogCards.appendChild(fragment);

var basketCardsTemplate = document.querySelector('#card-order').content.querySelector('.card-order');

/**
 * Создаёт карточку с информацией о сладости (для корзины).
 * @param {Object} candy - Объект с информацие о сладости.
 * @return {HTMLElement} - Заполенный данными о сладости элемент корзины.
 */
var prepareCandyCardForBasket = function (candy) {
  var candyElement = basketCardsTemplate.cloneNode(true);

  candyElement.querySelector('.card-order__title').textContent = candy.name;
  candyElement.querySelector('.card-order__price').textContent = candy.price + ' ₽';
  candyElement.querySelector('.card-order__count').value = candy.orderedAmount;
  var candyBasketImage = candyElement.querySelector('.card-order__img');
  candyBasketImage.src = candy.picture;
  candyBasketImage.alt = candy.name;

  return candyElement;
};

var goodCards = document.querySelector('.goods__cards');
goodCards.classList.remove('goods__cards--empty');
goodCards.querySelector('.goods__card-empty').classList.add('visually-hidden');

/**
 * Алгоритм Луна. Проверяет на валидность номер пластиковой карты.
 * @param {String} cardNumber - Номер карты.
 * @return {Boolean} - Возвращает true если карта валидна, false - если нет.
 */
var lunhAlgorithm = function (cardNumber) {
  var numbersArray = cardNumber.split('').map(function (number) {
    return +number;
  });
  var currentNumber;
  for (var i = (numbersArray.length % 2) ? 1 : 0; i < numbersArray.length; i = i + 2) {
    currentNumber = 2 * numbersArray[i];
    if (currentNumber > 9) {
      currentNumber -= 9;
    }
    numbersArray[i] = currentNumber;
  }
  var result = numbersArray.reduce(function (previous, current) {
    return previous + current;
  });
  return (result % 10) ? false : true;
};

var cardNumberField = document.querySelector('#payment__card-number');

cardNumberField.addEventListener('input', function (evt) {
  var target = evt.target;

  if (!lunhAlgorithm(target.value)) {
    target.setCustomValidity('Некорретный номер карты');
  } else if (target.value.length !== 16) {
    target.setCustomValidity('Номер карты должен быть 16 символов длиной');
  } else {
    target.setCustomValidity('');
  }
});

var cardFavouriteButtons = document.querySelectorAll('.card__btn-favorite');

cardFavouriteButtons.forEach(function (button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.target.classList.toggle('card__btn-favorite--selected');
    // Сбрасываем фокус текущей кнопки "избранное". Необходимо это для того,
    // чтобы стиль card__btn-favorite--selected удалялся сразу при нажатии на кнопку
    document.activeElement.blur();
  });
});

var candyCards = document.querySelectorAll('.catalog__card');

/**
 * Подготавливает объект сладости для корзины, удаляя лишнее поля и
 * добавляя одно дополнительное поле.
 * @param {Object} candy - Исходный объект сладости.
 * @return {Object} candyForBasket - Подготовленный для корзины объект сладости.
 */
var prepareCandyObjectForBasket = function (candy) {
  var candyForBasket = Object.assign({orderedAmount: 1}, candy);
  delete candyForBasket.amount;
  delete candyForBasket.rating;
  delete candyForBasket.nutritionFacts;

  return candyForBasket;
};

var basketCandys = [];

/**
 * Проверяет на наличие одинаковых сладостей в корзине. В случае совпадения,
 * увеличивает количество сладостей в корзине. В случае несовпадения, добавляет
 * карточку со сладостью в корзину.
 * @param {Array} basketCandysArray - Массив объектов сладостей корзины.
 * @param {Object} currentCandyItem - Текущий объект сладости, на который только что
 * кликнул пользователь.
 */
var checkDuplicatesInBasket = function (basketCandysArray, currentCandyItem) {
  var duplicateFounded = false;

  basketCandysArray.forEach(function (candy) {
    if (candy.name === currentCandyItem.name) {
      candy.orderedAmount++;
      duplicateFounded = true;
    }
  });
  if (duplicateFounded) {
    return;
  } else {
    basketCandysArray.push(currentCandyItem);
  }
};

/**
 * Добавляет карточку сладости в корзину.
 * @param {Array} candysArray - Массив объектов всех сладостей.
 * @param {String} candyName - Наименование сладости, на которую только что
 * кликнул пользователь.
 */
var renderCandyCardInBasket = function (candysArray, candyName) {
  candysArray.forEach(function (candy) {
    if (candy.name === candyName) {
      var currentBasketCandyItem = prepareCandyObjectForBasket(candy);
      if (basketCandys.length === 0) {
        basketCandys.push(currentBasketCandyItem);
      } else {
        checkDuplicatesInBasket(basketCandys, currentBasketCandyItem);
      }

      fragment = document.createDocumentFragment();
      basketCandys.forEach(function (basketCandy) {
        fragment.appendChild(prepareCandyCardForBasket(basketCandy));
      });
      goodCards.innerHTML = '';
      goodCards.appendChild(fragment);
    }
  });
};

candyCards.forEach(function (card) {
  card.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('card__btn')) {
      var currentCandyName = evt.currentTarget.querySelector('.card__title').textContent;
      renderCandyCardInBasket(candys, currentCandyName);
    }
  });
});
