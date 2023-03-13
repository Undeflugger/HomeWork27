// Використовуючи безкоштовне API https://pokeapi.co/ потбріно вивести на сторінку імена 20 покемонів отриманих з запиту у вигляді гріда, по 4 в ряд.

// При кліку на будь якого з них потрібно вивести модальне вікно(popup) з зображенням, вагою та зростом
// (для цих даних потрібно робити запит за його назваою). В модальному вікні повинна бути кнопка закрити.

// Після закриття модального вікна має бути можливість повторно відкрити іншого покемона чи того самого.

const container = document.getElementsByClassName('container')[0];
const windowM = document.getElementsByClassName('modal_window')[0];

const getPocemons = async () => {
  await fetch('https://pokeapi.co/api/v2/pokemon')
    .then(res => res.json())
    .then(res => showPocemons(res));
};

function showPocemons (arr) {
  const arrNew = [];
  arr.results.forEach(el => {
    arrNew.push(el.name);
  });
  let id = 0;
  for (let i = 0; i < 20; i += 4) {
    const createDivRow = document.createElement('div');
    createDivRow.classList.add('row', 'my-2');
    for (let j = 0; j < 4; j++) {
      const createDivCol = document.createElement('div');
      createDivCol.classList.add('col', 'my-2');
      const createDivP = document.createElement('p');
      createDivP.style='margin: 0px;';
      createDivP.innerHTML = `<a href="#ex1" class="poco" rel="modal:open">${arrNew[id]}</a>`;
      createDivCol.append(createDivP);
      createDivRow.append(createDivCol);
      id++;
    }
    container.append(createDivRow);
  }
  document.querySelectorAll('.poco').forEach(el => {
    el.addEventListener('click', (event) => {
      windowM.innerText = '';
      const name = event.target.innerText;
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(res => createInfo(res));
    }
    );
  });
}

getPocemons();

function createInfo (el) {
  const img = document.createElement('img');
  img.src = el.sprites.front_default;
  const p = document.createElement('p');
  p.innerText = `Вага: ${el.weight} & Зріст: ${el.height}`;
  windowM.append(img, p);
}