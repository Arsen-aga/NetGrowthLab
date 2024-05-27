const burger = document.querySelector(".burger");
const popupMenu = document.querySelector(".popup-menu");
const body = document.querySelector("body");

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  popupMenu.classList.toggle("active");
  body.classList.toggle("no-scroll");
});

AOS.init({
  delay: 300,
});

document.querySelectorAll(".menu a, .popup-menu a, .to-top").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    let href = this.getAttribute("href").substring(1);
    const popupMenu = document.querySelector(".popup-menu");
    const body = document.querySelector("body");

    popupMenu.classList.remove("active");
    body.classList.remove("no-scroll");

    const scrollTarget = document.getElementById(href);

    const topOffset = 0;
    // const topOffset = 0; // если не нужен отступ сверху
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

if (document.querySelector(".header-bottom")) {
  // инициализируем top Navigation
  const topNavigation = document.querySelector(".header-bottom");
  const toTopArrow = document.querySelector(".to-top");
  const popupMenu = document.querySelector(".popup-menu");
  function checkСoordinatesElem(elem) {
    // запуск функции по движению скролла
    window.addEventListener("scroll", function () {
      // инициализируем координаты окна по Y
      const coordWindow = window.scrollY;
      // если координаты окна больше 80, то добавляем класс, иначе - нет
      if (coordWindow > 650) {
        elem.classList.add("active");
        toTopArrow.classList.add("active");
        popupMenu.classList.add("top");
      } else {
        elem.classList.remove("active");
        toTopArrow.classList.remove("active");
        popupMenu.classList.remove("top");
      }
    });
  }

  checkСoordinatesElem(topNavigation);
}

if (document.querySelector(".front-block__swiper")) {
  const swiper = new Swiper(".front-block__swiper", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 2000,
    },
  });
}

if (document.querySelector(".gallery__swiper")) {
  const swiper = new Swiper(".gallery__swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    clickable: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}
if (document.querySelector(".reviews__swiper")) {
  const swiper = new Swiper(".reviews__swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    clickable: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}
if (document.querySelector(".services__item-swiper")) {
  const swiper = new Swiper(".services__item-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    clickable: true,
    // autoplay: {
    //   delay: 5000,
    // },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
if (document.querySelector(".house__swiper")) {
  const swiper = new Swiper(".house__swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    clickable: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

Fancybox.bind("[data-fancybox]", {});

// new mask
const phoneInputs = document.querySelectorAll('input[type="tel"]');
if (phoneInputs && phoneInputs.length) {
  const getInputsNumbersValue = function (input) {
    return input.value.replace(/\D/g, "");
  };

  const onPhoneInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputsNumbersValue(input),
      formattedInputValue = "",
      selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        inputNumbersValue[1] =
          inputNumbersValue[1] == "8"
            ? (inputNumbersValue[1] = "")
            : inputNumbersValue[1];
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      // Russian phone number
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      const firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue +=
          "(" +
          (inputNumbersValue[1] == "8"
            ? (inputNumbersValue[1] = "")
            : inputNumbersValue[1]) +
          inputNumbersValue.substring(2, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      // Not Russian phone number
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  };

  const onPhoneKeyDown = function (e) {
    const input = e.target;
    if (e.keyCode == 8 && getInputsNumbersValue(input).length === 1) {
      input.value = "";
    }
  };

  const onPhonePaste = function (e) {
    const input = e.target,
      pasted = e.clipboardData || window.clipboardData,
      inputNumbersValue = getInputsNumbersValue(input);

    if (pasted) {
      const pastedText = pasted.getData("Text");
      if (!/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

  const onPhoneClick = function (e) {
    const input = e.target;
    input.setSelectionRange(4, 4);
  };

  phoneInputs.forEach((input) => {
    input.setAttribute("maxlength", "18");
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
    input.addEventListener("click", onPhoneClick);
  });
}

// filters
if (document.querySelector(".tabs")) {
  const tabs = document.querySelector(".gallery__inner");
  const filterBtns = tabs.querySelectorAll(".tabs-tab");
  const filterItems = tabs.querySelectorAll(".gallery__swiper");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");

      const dataFilter = e.currentTarget.dataset.filter;
      console.log(dataFilter);

      filterItems.forEach(function (item) {
        if (item.classList.contains(dataFilter)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
}

// map
if (document.getElementById("map")) {
  initMap();

  async function initMap() {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

    const map = new YMap(document.getElementById("map"), {
      location: {
        center: [37.865876, 56.018549],
        zoom: 14,
      },
    });
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const addNewMarker = () => {
      let count = 1;
      return function (a, b) {
        const newMarker = document.createElement("div");
        newMarker.innerHTML = `<div class="marker marker-${count}">${count}</div>`;

        const marker = new ymaps3.YMapMarker(
          {
            coordinates: [a, b],
            draggable: false,
            mapFollowsOnDrag: true,
          },
          newMarker
        );
        map.addChild(marker);
        count++;
      };
    };

    const newMarker = addNewMarker();
    newMarker(37.865876, 56.018549);
  }
}

if (document.querySelector(".about__item")) {
  const question = document.querySelectorAll(".about__item");

  question.forEach((btn) =>
    btn.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        question.forEach((btn) => {
          btn.classList.remove("active");
          this.classList.add("active");
        });
      }
    })
  );
}
