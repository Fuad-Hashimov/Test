export default function catalogPopup() {
  

  //#region Catalog popup - Categories
  let categoryButton = document.querySelectorAll(
    "#product-catalog-popup .category-button"
  );
  let categoryBox = document.querySelectorAll(
    "#product-catalog-popup .category-box"
  );
  categoryBox[0].classList.add("active");

  //Toggle category content
  for (let i = 0; i < categoryButton.length; i++) {
    categoryButton[i].addEventListener("click", function () {
      let thisSiblings = siblings(this.closest(".category-box"));
      thisSiblings.forEach((s) => {
        s.classList.remove("active");
        s.querySelector(".category-content").style.maxHeight = null;
      });
      this.closest(".category-box").classList.toggle("active");
      let categoryContent =
        this.closest(".category-box").querySelector(".category-content");

      if (this.closest(".category-box").classList.contains("active")) {
        categoryContent.style.maxHeight = categoryContent.scrollHeight + "px";
      } else {
        categoryContent.style.maxHeight = null;
      }
    });
  }

  //Category mobile dropdown
  let categoryDropdown = document.querySelector(
    "#product-catalog-popup .category-dropdown-button"
  );
  categoryDropdown.addEventListener("click", function () {
    this.classList.toggle("active");
    let dropdown =
      this.closest(".content-sm").querySelector(".category-wrapper");

    if (this.classList.contains("active")) {
      dropdown.classList.add("active");
      dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    } else {
      dropdown.classList.remove("active");
      dropdown.style.maxHeight = null;
    }
  });

  //Category mobile links click func
  let categoryLinks = document.querySelectorAll(
    "#product-catalog-popup .category-link"
  );
  for (let i = 0; i < categoryLinks.length; i++) {
    if (window.innerWidth < 650) {
      categoryLinks[i].addEventListener("click", function (e) {
        e.preventDefault();
        let thisSiblings =
          this.closest(".category-list").querySelectorAll(".category-link");
        let buttonTextCat = this.closest(".content-sm").querySelector(
          ".category-dropdown-button .category"
        );
        let buttonTextSub = this.closest(".content-sm").querySelector(
          ".category-dropdown-button .sub"
        );

        thisSiblings.forEach((s) => s.classList.remove("active"));
        this.classList.add("active");
        buttonTextCat.innerText =
          this.closest(".category-box").querySelector(
            ".category-button"
          ).innerText;
        buttonTextSub.innerText = this.innerText;

        let dropdown =
          this.closest(".content-sm").querySelector(".category-wrapper");
        dropdown.classList.remove("active");
        dropdown.style.maxHeight = null;

        categoryDropdown.classList.remove("active");
      });
    }
  }

  //Close category on mobile
  document.body.addEventListener("click", function (e) {
    if (!e.target.closest(".category-dropdown-button")) {
      if (categoryDropdown.classList.contains("active")) {
        categoryDropdown.classList.remove("active");
        let dropdown = document.querySelector(
          "#product-catalog-popup .category-wrapper"
        );
        dropdown.style.maxHeight = null;
        dropdown.classList.remove("active");
      }
    }
  });

  //#endregion

  //#region PRODUCT colors in catalog popup
  let prodCard = document.querySelectorAll(
    "#product-catalog-popup .product-card"
  );
  for (let i = 0; i < prodCard.length; i++) {
    let prodColor = prodCard[i].querySelectorAll(".color");
    let moreColors = prodCard[i].querySelector(".more-colors");

    if (window.innerWidth > 360) {
      Array.from(prodColor)
        .slice(0, 5)
        .forEach((c) => {
          c.classList.add("show");
        });
      if (prodColor.length > 5) {
        moreColors.classList.add("show");
      }
    } else {
      Array.from(prodColor)
        .slice(0, 4)
        .forEach((c) => {
          c.classList.add("show");
        });
      if (prodColor.length > 4) {
        moreColors.classList.add("show");
      }
    }
  }
  //#endregion

  //#region Select product and open product view pop-up
  let btnSelectProduct = document.querySelectorAll(
    "#product-catalog-popup .btn-select-product"
  );
  let catalogContent = document.getElementById("prod-list-catalog");
  let viewContent = document.getElementById("prod-view-screen");
  let selectedProductInfo = document.getElementById("selected-product-info");

  for (let i = 0; i < btnSelectProduct.length; i++) {
    btnSelectProduct[i].addEventListener("click", function () {
      catalogContent.classList.add("hide");
      viewContent.classList.add("show");
      viewContent.style.display = "block";
      setTimeout(() => {
        catalogContent.style.display = "none";
      }, 100);

      let allProducts = this.closest(".product-list");
      let thisIndex = [...allProducts.children].indexOf(
        this.closest(".product-card")
      );

      viewContent.setAttribute("data-number", thisIndex);

      // Selected product data
      let prodTitle =
        this.closest(".product-card").querySelector(".content .title");
      let prodImg =
        this.closest(".product-card").querySelector(".photo-box img");
      let prodColors =
        this.closest(".product-card").querySelector(".color-wrap");
      let prodDescription = this.closest(".product-card").querySelector(
        ".product-description .content"
      );

      //Product view popup content fill
      let viewTitle = viewContent.querySelector(
        ".product-content .title-wrapper .title"
      );
      let viewMainPhoto = viewContent.querySelector("#product-photo img");
      let viewColorList = viewContent.querySelector(
        ".product-content .color-wrapper .color-list"
      );
      let selectedColorList = selectedProductInfo.querySelector(
        ".color-wrapper .color-list"
      );
      let viewDescription = viewContent.querySelector(
        ".product-description .description-wrapper"
      );

      viewTitle.innerText = prodTitle.innerText;
      viewMainPhoto.src = prodImg.src;

      let clone = prodColors.cloneNode(true);
      viewColorList.append(clone);

      let cloneDesc = prodDescription.cloneNode(true);
      viewDescription.append(cloneDesc);

      let descContent = viewDescription.querySelector(".content");
      let btnMoreContent = viewContent.querySelector(".btn-more-content");
      if (descContent.scrollHeight <= 100) {
        descContent.style.maxHeight = descContent.scrollHeight + "px";
        descContent.classList.add("active");
        btnMoreContent.classList.add("hide");
      } else {
        btnMoreContent.classList.remove("hide");
      }
    });
  }

  //USE THIS PRODUCT
  let btnUseProduct = document.getElementById("use-product");
  btnUseProduct.addEventListener("click", function () {
    let btnCatalog = document.querySelector("#quick-quote-form .btn-catalog");
    btnCatalog.classList.add("hide");
    let selectedProductInfo = document.getElementById("selected-product-info");
    selectedProductInfo.classList.add("show");

    let stepThree = document.querySelector("#quote-step-3 .form-content");
    stepThree.style.maxHeight = stepThree.scrollHeight + "px";

    let stepFourth = document.getElementById("quote-step-4");
    stepFourth.classList.add("active");
    stepFourth.querySelector(".form-content").style.maxHeight =
      stepFourth.querySelector(".form-content").scrollHeight + "px";

    //Set selected image
    let selectedImg = document.querySelector(
      "#selected-product-info .main-photo img"
    );
    let thisImg =
      this.closest("#prod-view-screen").querySelector(".product-image img");
    selectedImg.src = thisImg.src;

    //Color change after product selection
    let colors = document.querySelectorAll(
      "#selected-product-info .color-wrapper .color"
    );
    let activeColor = document.querySelector(
      "#selected-product-info .color-wrap .color.active"
    );
    let activeColorName = document.querySelector(
      "#selected-product-info .selected-color .color-name"
    );
    let activeColorCode = document.querySelector(
      "#selected-product-info .color-wrap .color.active .color-box"
    );
    let selectedActiveColorCode = document.querySelector(
      "#selected-product-info .selected-color .color-code"
    );
    let cloneActiveColor = activeColorCode.cloneNode(true);

    activeColorName.innerText = activeColor.getAttribute("data-color-name");
    selectedActiveColorCode.append(cloneActiveColor);

    if (activeColor.classList.contains("color--white")) {
      selectedActiveColorCode.classList.add("color--white");
    } else {
      selectedActiveColorCode.classList.remove("color--white");
    }

    //after using product, change colors
    for (let i = 0; i < colors.length; i++) {
      //Color click
      colors[i].addEventListener("click", function () {
        let thisSiblings = siblings(this);
        activeColor = this;
        activeColorCode = this.querySelector(".color-box");
        cloneActiveColor = activeColorCode.cloneNode(true);
        this.classList.add("active");
        thisSiblings.forEach((s) => s.classList.remove("active"));
        activeColorName.innerText = this.getAttribute("data-color-name");

        let colorWrap = this.closest(".color-wrap");
        let thisIndex = [...colorWrap.children].indexOf(this);
      });

      //Color mouse in
      colors[i].addEventListener("mouseenter", function () {
        activeColorName.innerText = this.getAttribute("data-color-name");
        let colorBox = this.querySelector(".color-box");
        let colorClone = colorBox.cloneNode(true);
        selectedActiveColorCode.querySelector(".color-box").remove();

        if (this.classList.contains("color--white")) {
          selectedActiveColorCode.classList.add("color--white");
        } else {
          selectedActiveColorCode.classList.remove("color--white");
        }
        selectedActiveColorCode.append(colorClone);
      });

      //Color couse out
      colors[i].addEventListener("mouseleave", function () {
        activeColorName.innerText = activeColor.getAttribute("data-color-name");
        selectedActiveColorCode.querySelector(".color-box").remove();
        selectedActiveColorCode.append(cloneActiveColor);

        if (activeColor.classList.contains("color--white")) {
          selectedActiveColorCode.classList.add("color--white");
        } else {
          selectedActiveColorCode.classList.remove("color--white");
        }
      });
    }

    backToCatalog();
    this.closest("#product-catalog-popup")
      .querySelector(".pop-up_close")
      .click();

    let allCards = document.querySelectorAll(
      "#product-catalog-popup .product-list .product-card"
    );
    allCards.forEach((c) => c.classList.remove("selected"));
    allCards[viewContent.getAttribute("data-number")].classList.add("selected");

    if (window.innerWidth < 576) {
      let productContentWrapper = document.querySelector(
        "#selected-product-info .product-content-wrapper .wrapper"
      );
      let productSizeWrapper = document.querySelector(
        "#selected-product-info .product-content-wrapper .wrapper .size-wrapper"
      );

      productContentWrapper.style.maxHeight =
        productSizeWrapper.clientHeight + 100 + "px";
      productContentWrapper.closest(".form-content").style.maxHeight =
        productContentWrapper.closest(".form-content").scrollHeight +
        productSizeWrapper.clientHeight +
        100 +
        "px";
    }
  });

  //#endregion

  //#region BACK TO CATALOG BUTTON - POPUP
  function backToCatalog() {
    viewContent.classList.add("hide");
    catalogContent.classList.remove("hide");
    catalogContent.classList.add("show");
    catalogContent.style.display = "block";
    viewContent.classList.remove("show");
    viewContent.style.display = "none";
    setTimeout(() => {
      viewContent.querySelector(".color-wrap").remove();
    }, 10);
    viewContent.querySelector(".product-description .content").remove();
    viewContent.querySelector(".btn-more-content").classList.remove("active");
  }

  //Back
  let backToCatalogPopupBtn = document.querySelector(
    "#prod-view-screen .back-button"
  );
  backToCatalogPopupBtn.addEventListener("click", function () {
    backToCatalog();
  });

  //#endregion

  //#region Search in catalog popup
  let searchButton = document.getElementById("btn-search-product");
  let searchBox = document.querySelector("#product-catalog-popup .search-box");
  let popContentBox = document.querySelector(
    "#product-catalog-popup .pop-up_content-box"
  );
  searchButton.addEventListener("click", function () {
    searchBox.classList.add("active");
    popContentBox.classList.add("lock");
  });

  let backSearchButton = document.querySelector(
    "#product-catalog-popup .search-box .back-button"
  );
  backSearchButton.addEventListener("click", function () {
    searchBox.classList.remove("active");
    popContentBox.classList.remove("lock");
  });

  document.body.addEventListener("click", function (e) {
    if (searchBox.classList.contains("active")) {
      if (
        !e.target.closest(".search-content") &&
        !e.target.closest("#btn-search-product")
      ) {
        searchBox.classList.remove("active");
        popContentBox.classList.remove("lock");
      }
    }
  });

  //#endregion

  //#region product description in catalog mobile
  let productDescBtn = document.querySelector(
    "#prod-view-screen .btn-prod-description"
  );
  productDescBtn.addEventListener("click", function () {
    this.classList.toggle("active");

    let desContent = this.closest(".product-description").querySelector(
      ".content"
    );

    if (this.classList.contains("active")) {
      desContent.style.maxHeight = desContent.scrollHeight + "px";
    } else {
      desContent.style.maxHeight = null;
    }
  });

  let btnMoreDescription = document.querySelector(
    "#prod-view-screen .product-description .btn-more-content"
  );
  btnMoreDescription.addEventListener("click", function () {
    let descContent = this.closest(".product-description").querySelector(
      ".content"
    );
    this.classList.toggle("active");
    descContent.classList.toggle("active");
    if (this.classList.contains("active")) {
      descContent.style.maxHeight = descContent.scrollHeight + "px";
    } else {
      descContent.style.maxHeight = null;
    }
  });
  //#endregion
}
