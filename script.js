// Функция для перемешивания массива (алгоритм Фишера-Йетса)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Определяем пары картинок
const pairs = [
  {
    name: "Фасоль",
    pair: "Горох",
    hint: "Горох",
    color: "#FF5733",
    img: "./fas1.png",
    img2: "./pea_PNG24332.png",
  },
  {
    name: "Гранат",
    pair: "Мандарин",
    hint: "Мандарин",
    color: "#FFBD33",
    img: "./pomegranate-2x.png",
    img2: "./orange039.png",
  },
//   {
//     name: "Чайник",
//     pair: "Чашка",
//     hint: "Чашка",
//     color: "#75FF33",
//     img: "./Kettle-PNG-Image.png",
//     img2: "./27286236c423ebfddd0997ba14637810.png",
//   },
//   {
//     name: "Петух",
//     pair: "Индюк",
//     hint: "Индюк",
//     color: "#33FF57",
//     img: "./petux.png",
//     img2: "./shutterstock_131624450-2048x1365.png",
//   },
//   {
//     name: "Аист",
//     pair: "Лебедь",
//     hint: "Лебедь",
//     color: "#33FFD8",
//     img: "./aist.png",
//     img2: "./lebed.png",
//   },
//   {
//     name: "Кузнечик",
//     pair: "Муравей",
//     hint: "Муравей",
//     color: "#33A1FF",
//     img: "./kyzne.png",
//     img2: "./i.webp",
//   },
//   {
//     name: "Ель",
//     pair: "Лиственница",
//     hint: "Лиственница",
//     color: "#9B33FF",
//     img: "./el.png",
//     img2: "./list.png",
//   },
//   {
//     name: "Тюльпан",
//     pair: "Гвоздика",
//     hint: "Гвоздика",
//     color: "#FF33E0",
//     img: "./tulpan.png",
//     img2: "./gvozd.png",
//   },
//   {
//     name: "Волк",
//     pair: "Медведь",
//     hint: "Медведь",
//     color: "#FFC300",
//     img: "./volk.png",
//     img2: "./med.png",
//   },
];

// Получение всех элементов верхнего и нижнего ряда
const upperItems = pairs.map((pair) => {
  const item = document.createElement("div");
  item.className = "item upper-item";
  item.textContent = pair.name;
  item.setAttribute("data-key", pair.name);
  item.setAttribute("data-color", pair.color);
  item.setAttribute("data-hint", pair.hint);

  if (pair?.img) {
    // Создаем img тег
    const img = document.createElement("img");
    img.src = `${pair.img}`; // Подставьте реальный путь к картинкам
    img.alt = pair.name; // Альтернативный текст
    img.style.width = "100px"; // Устанавливаем размеры изображения (если нужно)
    img.style.height = "100px";

    // Добавляем img внутрь div
    item.appendChild(img);
  }

  return item;
});

const lowerItems = pairs.map((pair) => {
  const item = document.createElement("div");
  item.className = "item lower-item";
  item.textContent = pair.pair;
  item.setAttribute("data-key", pair.name);
  item.setAttribute("data-color", pair.color);
  item.setAttribute("data-hint", pair.name);

  if (pair?.img2) {
    // Создаем img тег
    const img = document.createElement("img");
    img.src = `${pair.img2}`; // Подставьте реальный путь к картинкам
    img.alt = pair.name; // Альтернативный текст
    img.style.width = "100px"; // Устанавливаем размеры изображения (если нужно)
    img.style.height = "100px";

    // Добавляем img внутрь div
    item.appendChild(img);
  }

  return item;
});

// Перемешивание картинок
const shuffledUpperItems = shuffle(upperItems);
const shuffledLowerItems = shuffle(lowerItems);

// Добавление перемешанных элементов в верхний и нижний ряды
const upperRow = document.querySelector(".upper");
const lowerRow = document.querySelector(".lower");

shuffledUpperItems.forEach((item) => {
  upperRow.appendChild(item);
});

shuffledLowerItems.forEach((item) => {
  lowerRow.appendChild(item);
});

let selectedUpper = null;
let selectedLower = null;

// Функция добавления обработчиков событий
function addClickHandlers() {
  document.querySelectorAll(".upper-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (selectedUpper) {
        selectedUpper.classList.remove("selected");
      }
      selectedUpper = item;
      item.classList.add("selected");
      document.getElementById("hint").style.display = "inline"; // Показываем кнопку подсказки
      document.getElementById("hint-result").textContent = ""; // Очищаем предыдущую подсказку
    });
  });

  document.querySelectorAll(".lower-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (selectedLower) {
        selectedLower.classList.remove("selected");
      }
      selectedLower = item;
      item.classList.add("selected");
    });
  });
}

// Добавляем обработчики событий для перемешанных элементов
addClickHandlers();

// Функция для генерации конфетти
function createConfetti() {
    const confettiContainer = document.querySelector(".confetti-container");
    confettiContainer.innerHTML = ""; // Очищаем контейнер перед созданием новых конфетти
  
    const confettiCount = 200; // Количество конфетти
  
    for (let i = 0; i < confettiCount; i++) {
      const confettiPiece =document.createElement("div");
      confettiPiece.classList.add("confetti-piece");
  
      // Случайный цвет
      confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  
      // Случайное положение по X
      confettiPiece.style.left = `${Math.random() * 100}vw`;
  
      // Случайная продолжительность анимации
      confettiPiece.style.animationDuration = `${Math.random() * 3 + 2}s`;
  
      // Добавляем конфетти на экран
      confettiContainer.appendChild(confettiPiece);
    }
  
    // Останавливаем конфетти через некоторое время
    setTimeout(() => {
      confettiContainer.innerHTML = ""; // Убираем конфетти после окончания
    }, 5000); // Конфетти будет видна 5 секунд
  }

// Обработка кнопки проверки
document.getElementById("check").addEventListener("click", () => {
  if (!selectedUpper || !selectedLower) {
    alert(
      "Пожалуйста, выберите одну картинку из верхнего ряда и одну из нижнего."
    );
    return;
  }

  // Сравниваем атрибуты data-pair
  if (
    selectedUpper.getAttribute("data-key") ===
    selectedLower.getAttribute("data-key")
  ) {
    const color = selectedUpper.getAttribute("data-color"); // Получаем цвет пары
    selectedUpper.classList.add("matched");
    selectedLower.classList.add("matched");
    selectedUpper.style.backgroundColor = color; // Задаем цвет верхнему элементу
    selectedLower.style.backgroundColor = color; // Задаем цвет нижнему элементу
    selectedUpper.removeEventListener("click", () => {});
    selectedLower.removeEventListener("click", () => {});

    selectedUpper = null;
    selectedLower = null;

    // Проверяем, остались ли элементы
    if (
      document.querySelectorAll(".upper-item.matched").length ===
      upperItems.length
    ) {
      document.getElementById("congratulations").style.display = "block";
      document.getElementById("result").style.display = "none";
      document.getElementById("check").style.display = "none";
      document.getElementById("hint").style.display = "none";

      Draw();
    }
  } else {
    document.getElementById("result").textContent =
      "Неправильная пара, попробуйте снова.";
  }

  // Сбрасываем выделение
  if (selectedUpper) selectedUpper.classList.remove("selected");
  if (selectedLower) selectedLower.classList.remove("selected");
  selectedUpper = null;
  selectedLower = null;
});

// Обработка кнопки подсказки
document.getElementById("hint").addEventListener("click", () => {
  if (selectedUpper) {
    const hintText = selectedUpper.getAttribute("data-hint");
    document.getElementById(
      "hint-result"
    ).textContent = `Подсказка: правильная пара для ${selectedUpper.textContent} - это ${hintText}.`;
  }
});
