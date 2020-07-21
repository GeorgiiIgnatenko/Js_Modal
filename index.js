let fruits = [
  {
    id: 1,
    title: "Яблоки",
    price: 20,
    img:
      "https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348",
  },
  {
    id: 2,
    title: "Апельсины",
    price: 30,
    img: "https://images.lady.mail.ru/453846/",
  },
  {
    id: 3,
    title: "Манго",
    price: 40,
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU0beNTpedL22-j3AkWXVHiUZCzh3SW7KAbg&usqp=CAU",
  },
];

const toHTML = (fruit) => `
          <div class="col">
            <div class="card">
                <img src="${fruit.img}" style="height: 300px;" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
                </div>
            </div>
          </div>`;

function render() {
  const html = fruits.map(toHTML).join("");
  document.querySelector("[data-cards]").innerHTML = html;
}

render();

const priceModal = $.modal({
  title: "Цена на товар",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "Закрыть",
      type: "primary",
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  const btnType = e.target.dataset.btn;
  const id = +e.target.dataset.id;
  const fruit = fruits.find((f) => f.id === id);

  if (btnType === "price") {
    priceModal.setContent(`
       <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `);
    priceModal.open();
  } else if (btnType === "remove") {
    $.confirm({
      title: "Вы уверены?",
      content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter(f => f.id !== id);
        render();
      })
  }
});
