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

var CandyRatingToStarsCount = {
  1: 'stars__rating--one',
  2: 'stars__rating--two',
  3: 'stars__rating--three',
  4: 'stars__rating--four',
  5: 'stars__rating--five'
};

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
  var result = '';

  for (var i = 0; i < getRandomNumberFromRange(1, contents.length); i++) {
    result += contents[i] + ', ';
  }
  result = result.slice(0, result.length - 2);

  return result;
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
  contents = shuffleArray(contents);
  var candys = [];

  for (var i = 0; i < amount; i++) {
    candys.push({
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
    });
  }

  return candys;
};

var candys = makeCandys(CANDY_NAMES, PICTURES, CANDY_CONTENTS, 26);

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

  candyElement.classList = '';
  candyElement.classList.add('card', 'catalog__card', amountClass);
  candyElement.querySelector('.card__title').textContent = candy.name;
  var cardPrice = candyElement.querySelector('.card__price');
  cardPrice.innerHTML = candy.price + ' ' + '<span class="card__currency">₽</span>' +
    '<span class="card__weight">/' + ' ' + candy.weight + 'Г</span>';

  var ratingClass = CandyRatingToStarsCount[candy.rating.value];

  var starRaiting = candyElement.querySelector('.stars__rating');
  starRaiting.classList = '';
  starRaiting.classList.add('stars__rating', ratingClass);
  candyElement.querySelector('.star__count').textContent = '(' + candy.rating.number + ')';
  candyElement.querySelector('.card__characteristic').textContent = candy.nutritionFacts.sugar ?
    'Содержит сахар' : 'Без сахара';
  candyElement.querySelector('.card__composition-list').textContent = candy.nutritionFacts.contents;
  candyElement.querySelector('.card__img').src = candy.picture;

  return candyElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < candys.length; i++) {
  fragment.appendChild(renderCandy(candys[i]));
}

catalogCards.appendChild(fragment);

var basketCardsTemplate = document.querySelector('#card-order').content.querySelector('.card-order');
fragment = document.createDocumentFragment();
var basketCandys = makeCandys(CANDY_NAMES, PICTURES, CANDY_CONTENTS, 3);

/**
 * Создаёт карточку с информацией о сладости (для корзины).
 * @param {Object} candy - Объект с информацие о сладости.
 * @return {HTMLElement} - Заполенный данными о сладости элемент корзины.
 */
var renderCandyForBasket = function (candy) {
  var candyElement = basketCardsTemplate.cloneNode(true);

  candyElement.querySelector('.card-order__title').textContent = candy.name;
  candyElement.querySelector('.card-order__price').textContent = candy.price + ' ₽';
  candyElement.querySelector('.card-order__img').src = candy.picture;

  return candyElement;
};

var goodCards = document.querySelector('.goods__cards');
goodCards.classList.remove('goods__cards--empty');
goodCards.querySelector('.goods__card-empty').classList.add('visually-hidden');

for (i = 0; i < basketCandys.length; i++) {
  fragment.appendChild(renderCandyForBasket(basketCandys[i]));
}

goodCards.appendChild(fragment);
