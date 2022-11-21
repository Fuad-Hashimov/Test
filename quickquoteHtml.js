export default function quickHtml(){
    let visibleWidth = 0;
    let fullWidth = 0;
    let diff = 0;
    let diffCount = 0;
    let diffRemaining = 0;
    let translateDimension = 0;
    let navRightSlideCount = 0;

    let navPrev = document.querySelector(
      "#product-catalog-popup .pagination .nav-prev"
    );
    let navNext = document.querySelector(
      "#product-catalog-popup .pagination .nav-next"
    );
   

    //POPUP FUNCTION
    //Open popup
    let popupButtons = document.querySelectorAll(".pop-up_button");
    for (let i = 0; i < popupButtons.length; i++) {
      popupButtons[i].addEventListener("click", function (e) {
        e.preventDefault();
        let thisId = this.getAttribute("data-id");
        document.getElementById(thisId).classList.add("active");
        let paginationContainer = document.querySelector(
          "#product-catalog-popup .pagination-links"
        );

        if (thisId == "login-register_popup") {
          let thisContent = this.getAttribute("data-content");
          document.getElementById(thisContent).classList.add("active");
        }

        if (thisId != "product-catalog-popup") {
          lockBodyScroll();
        }

        if (thisId == "product-catalog-popup") {
          let categoryContent = document.querySelector(
            "#product-catalog-popup .category-box.active .category-content"
          );
          categoryContent.style.maxHeight =
            categoryContent.scrollHeight + "px";
          visibleWidth = paginationContainer.clientWidth;
          fullWidth = paginationContainer.scrollWidth;
          diff = fullWidth - visibleWidth;
          diffCount = Math.floor(diff / visibleWidth);
          diffRemaining = diff % visibleWidth;
          translateDimension = visibleWidth;

          let activePage = document.querySelector(
            "#product-catalog-popup .pagination-links .link.active"
          );
          let paginationLinks = document.querySelector(
            "#product-catalog-popup .pagination-links"
          );

          if (
            paginationLinks.offsetLeft + paginationLinks.clientWidth <
            activePage.offsetLeft + activePage.clientWidth
          ) {
            let activePagePosition =
              activePage.offsetLeft +
              activePage.clientWidth -
              paginationLinks.offsetLeft;
            let activeClickCount = Math.floor(
              activePagePosition / visibleWidth
            );

            while (activeClickCount > 0) {
              navNext.click();
              activeClickCount--;
            }
          }
        }
      });
    }

    //Pop-up buttons inside login/register PopUp
    let popupInnerButtons = document.querySelectorAll(
      ".pop-up_inner-button"
    );
    for (let i = 0; i < popupInnerButtons.length; i++) {
      popupInnerButtons[i].addEventListener("click", function (e) {
        e.preventDefault();
        let thisId = this.getAttribute("data-id");
        this.closest(".pop-up_content-box").classList.remove("active");
        document.getElementById(thisId).classList.add("active");
      });
    }

    //Close Popup
    let popupClose = document.querySelectorAll(".pop-up_close");
    for (let i = 0; i < popupClose.length; i++) {
      popupClose[i].addEventListener("click", function () {
        closePopUp(this);
        unlockBodyScroll();
      });
    }

    let popup_ = document.querySelectorAll(".pop-up");
    for (let i = 0; i < popup_.length; i++) {
      popup_[i].addEventListener("click", function (e) {
        if (!e.target.closest(".pop-up_content-box")) {
          closePopUp(this);
          unlockBodyScroll();
        }
      });
    }

    function closePopUp(el) {
      let activeContent = el
        .closest(".pop-up")
        .querySelector(".pop-up_content-box.active");
      el.closest(".pop-up").classList.remove("active");
      if (
        el.closest(".pop-up").getAttribute("id") ==
        "login-register_popup"
      )
        activeContent.classList.remove("active");

      if (
        el.closest(".pop-up").getAttribute("id") ==
        "product-catalog-popup"
      ) {
        if (
          document
            .querySelector("#product-catalog-popup #prod-view-screen")
            .classList.contains("show")
        ) {
          backToCatalog();
        }
      }
    }

    //Password input
    let passwordInput = document.querySelectorAll(
      ".password-input .visibility-icon"
    );
    for (let i = 0; i < passwordInput.length; i++) {
      passwordInput[i].addEventListener("click", function () {
        this.classList.toggle("active");

        if (this.classList.contains("active")) {
          this.closest(".password-input")
            .querySelector("input")
            .setAttribute("type", "text");
        } else {
          this.closest(".password-input")
            .querySelector("input")
            .setAttribute("type", "password");
        }
      });
    }

    //Validate password
    let validatableInput =
      document.querySelectorAll(".validatable-input");
    for (let i = 0; i < validatableInput.length; i++) {
      let input = validatableInput[i].querySelector("input");
      input.addEventListener("focus", function () {
        let criteriaBox = this.closest(
          ".validatable-input"
        ).querySelector(".validation-criteria-wrapper");
        criteriaBox.style.maxHeight = criteriaBox.scrollHeight + "px";
      });

      input.addEventListener("keyup", function () {
        let lengthValidation =
          this.closest(".input_wrapper").querySelector(
            ".length-validation"
          );
        let symbolValidation =
          this.closest(".input_wrapper").querySelector(
            ".symbol-validation"
          );
        let spaceValidation =
          this.closest(".input_wrapper").querySelector(
            ".space-validation"
          );

        let letmatch = this.value.match(/[a-z]/g);
        let digmatch = this.value.match(/[0-9]/g);
        let symbolregex = this.value.match(
          /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g
        );
        let hasSpace = /\s/g.test(this.value);

        if (this.classList.contains("username-validation")) {
          if (letmatch || digmatch) {
            symbolValidation.classList.add("valid");
          } else {
            symbolValidation.classList.remove("valid");
          }

          if (symbolregex) {
            symbolValidation.classList.add("invalid");
            symbolValidation.classList.remove("valid");
          } else {
            symbolValidation.classList.remove("invalid");
            symbolValidation.classList.add("valid");
          }

          if (!hasSpace) {
            spaceValidation.classList.add("valid");
            spaceValidation.classList.remove("invalid");
          } else {
            spaceValidation.classList.add("invalid");
            spaceValidation.classList.remove("valid");
          }
        }

        if (this.classList.contains("password-validation")) {
          lengthValidation.classList.remove("invalid");
          symbolValidation.classList.remove("invalid");
          if (this.value.length >= 6) {
            lengthValidation.classList.add("valid");
          } else {
            lengthValidation.classList.remove("valid");
          }

          if (letmatch && digmatch) {
            symbolValidation.classList.add("valid");
          } else {
            symbolValidation.classList.remove("valid");
          }

          if (symbolregex) {
            symbolValidation.classList.add("invalid");
            symbolValidation.classList.remove("valid");
          }
        }
      });

      input.addEventListener("blur", function () {
        let criteria =
          this.closest(".input_wrapper").querySelectorAll(".criteria");
        criteria.forEach((c) => {
          if (!c.classList.contains("valid")) {
            c.classList.add("invalid");
          }
        });
      });
    }

    //#region Add ADDitional design art
    let additionalArtBtn = document.querySelector(
      "#quick-quote-form .btn-artwork-additional"
    );

    let idCount = 1;
    let dataIndex = 1;
    //add additional artwork
    additionalArtBtn.addEventListener("click", function () {
      let that = this;
      let uploadArtEl = document.createElement("div");
      uploadArtEl.classList.add("upload-artwork");
      uploadArtEl.classList.add("additional-artwork");
      uploadArtEl.classList.add("active");
      uploadArtEl.setAttribute("data-index", dataIndex);

      dataIndex++;

      uploadArtEl.innerHTML =
        this.closest(".form-content").querySelector(
          ".upload-artwork"
        ).innerHTML;
      that
        .closest(".form-content")
        .querySelector(".artwork-wrapper")
        .append(uploadArtEl);

      uploadArtEl.style.maxHeight = uploadArtEl.scrollHeight + "px";
      uploadArtEl.style.overflow = "unset";
      that.closest(".form-content").style.maxHeight =
        that.closest(".form-content").scrollHeight +
        uploadArtEl.scrollHeight +
        "px";

      let allRadios = uploadArtEl.querySelectorAll(".radio-wrapper");

      for (let i = 0; i < allRadios.length; i++) {
        let inputs = allRadios[i].querySelector("input");
        let labels = allRadios[i].querySelector("label");
        inputs.setAttribute("id", "quick-quote-" + idCount);
        inputs.setAttribute("name", "quick-quote-" + dataIndex);
        labels.setAttribute("for", "quick-quote-" + idCount);
        idCount++;
      }

      let radioInputs = uploadArtEl.querySelectorAll(
        '.radio-wrapper input[type="radio"]'
      );
      for (let i = 0; i < radioInputs.length; i++) {
        radioInputs[i].addEventListener("change", function () {
          artworkRadioPlacement(this);
        });
      }

      let textInput = uploadArtEl.querySelector(
        '.radio-wrapper input[type="text"]'
      );
      textInput.addEventListener("focus", function () {
        artworkInputPlacement(this);
      });

      uploadArtEl.querySelector(".preview-photo img").src = "";
      uploadArtEl
        .querySelector(".photo-upload-content")
        .classList.remove("active");

      let removeAdditionalArtCnt = document.querySelectorAll(
        "#quick-quote-form .additional-artwork .btn-remove-artwork"
      );
      for (let i = 0; i < removeAdditionalArtCnt.length; i++) {
        removeAdditionalArtCnt[i].addEventListener(
          "click",
          function () {
            let artContent = this.closest(".upload-artwork");
            artContent.classList.remove("active");
            artContent.style.maxHeight = null;
            artContent.style.overflow = "hidden";

            setTimeout(() => {
              this.closest(".additional-artwork").remove();
            }, 500);
          }
        );
      }

      let fileInput = uploadArtEl.querySelector(
        '.file-upload .upload-image input[type="file"]'
      );
      let fileLabel = uploadArtEl.querySelector(
        ".file-upload .upload-image label"
      );
      fileInput.setAttribute("id", "photo-upload" + dataIndex);
      fileLabel.setAttribute("for", "photo-upload" + dataIndex);
      fileInput.addEventListener("change", function () {
        uploadImageFunc(this);
      });
      let activeLabels = uploadArtEl.querySelectorAll(
        ".input-wrapper .input-block label"
      );
      let activeInputs = uploadArtEl.querySelectorAll(
        ".input-wrapper .input-block input"
      );

      activeLabels.forEach((l) => l.classList.remove("active"));

      // let textInputs = document.querySelectorAll('.input-block input[type="text"]');
      for (let i = 0; i < activeInputs.length; i++) {
        activeInputs[i].addEventListener("focus", function () {
          this.closest(".input-block")
            .querySelector("label")
            .classList.add("active");
        });
        activeInputs[i].addEventListener("blur", function (e) {
          let value = e.target.value;
          if (value.trim() == "" || value.trim() === null) {
            this.closest(".input-block")
              .querySelector("label")
              .classList.remove("active");
          }
        });
      }
    });

    //remove additional artwork

    //#endregion

    //#region artwork placement
    let artworkPlacement = document.querySelectorAll(
      '#quick-quote-form .radio-block-wrapper input[type="radio"]'
    );
    for (let i = 0; i < artworkPlacement.length; i++) {
      artworkPlacement[i].addEventListener("change", function () {
        artworkRadioPlacement(this);
      });
    }

    function artworkRadioPlacement(el) {
      let textInput = el
        .closest(".radio-block-wrapper")
        .querySelector('input[type="text"]');
      if (el.closest(".radio-wrapper").classList.contains("other")) {
        textInput.classList.remove("deactive");
        textInput.focus();
      } else {
        textInput.classList.add("deactive");
      }
    }

    let artworkPlacementInput = document.querySelectorAll(
      '#quick-quote-form .radio-block-wrapper input[type="text"]'
    );
    for (let i = 0; i < artworkPlacementInput.length; i++) {
      artworkPlacementInput[i].addEventListener("focus", function () {
        artworkInputPlacement(this);
      });
    }

    function artworkInputPlacement(el) {
      el.classList.remove("deactive");
      if (el.closest(".radio-wrapper").classList.contains("other")) {
        el.closest(".radio-wrapper")
          .querySelector('input[type="radio"]')
          .click();
      }
    }
    //#endregion

    //#region quick quote form submission/validation
    //Form submit button
    let quickQuoteForm = document.getElementById("quick-quote-form");
    quickQuoteForm.addEventListener("submit", function (e) {
      if (!quoteFormValidation(this)) {
        e.preventDefault();
      }
    });

    function quoteFormValidation(element) {
      let isValidated = true;

      let requiredField = element.querySelectorAll(".required");

      requiredField.forEach((el) => {
        if (el.closest('.input-block').classList.contains('invalid-input')) {
          isValidated = false;
          let invalidInputs =
            document.querySelectorAll(".invalid-input");
          let elementTop = invalidInputs[0].closest(".form-block");
          elementTop.classList.add("shake");
          setTimeout(() => {
            elementTop.classList.remove("shake");
          }, 1500);
          window.scrollTo({
            top: elementTop.offsetTop - 30,
            behavior: "smooth",
          });
        }
      });

      return isValidated;
    }
    //#endregion

    //#region Step 1/2/3 activation
    // Set active form
    let quoteForm = document.querySelectorAll(
      "#quick-quote-form .form-block"
    );
    let activeFormBlock = document.querySelector(
      "#quick-quote-form .form-block.active .form-content"
    );
    // activeFormBlock.style.maxHeight = activeFormBlock.scrollHeight + "px";
    activeFormBlock.style.maxHeight = "unset";

    for (let i = 0; i < quoteForm.length; i++) {
      //Step 1
      if (quoteForm[i].getAttribute("id") == "quote-step-1") {
        let inputs = quoteForm[i].querySelectorAll("input.required");
        const emailInput = quoteForm[i].querySelector('input[type="email"]');

        for (let i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("blur", function (e) {
            let value = e.target.value;
            if (value.trim() == "" || value.trim() === null) {
              this.closest(".input-block").classList.remove("filled");
              this.closest(".input-block").classList.add(
                "invalid-input"
              );
              this.closest(".form-content").style.maxHeight =
                this.closest(".form-content").scrollHeight;
            } else {
              if (this.getAttribute('id') == 'quote-email') {
                const regularExpression = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}/;

                if (!regularExpression.test(value)) {
                    this.closest('.input-block').classList.add('invalid-input');
                    this.closest('.input-block').querySelector('.error-message').innerText = 'Please enter a valid email address';
                } else {
                    this.closest('.input-block').classList.add('filled')
                    this.closest('.input-block').classList.remove('invalid-input')
                }
            } else {
                this.closest('.input-block').classList.add('filled')
                this.closest('.input-block').classList.remove('invalid-input')
               }
             
            }

            let invalidInputs =
              this.closest(".input-wrapper").querySelectorAll(
                ".invalid-input"
              );
            let validInputs =
              this.closest(".input-wrapper").querySelectorAll(
                ".filled"
              );

            if (validInputs.length == inputs.length) {
              document
                .getElementById("quote-step-2")
                .classList.add("active");
              activateFormContent(
                document.getElementById("quote-step-2")
              );
            }
          });
        }
      }

      //Step 2
      if (quoteForm[i].getAttribute("id") == "quote-step-2") {
        let radioInputs = quoteForm[i].querySelectorAll(
          'input[type="radio"]'
        );

        for (let i = 0; i < radioInputs.length; i++) {
          radioInputs[i].addEventListener("change", function () {
            if (this.checked) {
              document
                .getElementById("quote-step-3")
                .classList.add("active");
              activateFormContent(
                document.getElementById("quote-step-3")
              );
            }
          });
        }
      }
    }

    // Active form content
    function activateFormContent(el) {
      let content = el.querySelector(".form-content");
      content.style.maxHeight = content.scrollHeight + "px";
    }
    //#endregion

    //#region Step 4 - upload design
    let uploadPhoto = document.querySelectorAll(
      '.file-upload input[type="file"]'
    );
    let regExp =
      /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+$/;

    for (let i = 0; i < uploadPhoto.length; i++) {
      uploadPhoto[i].addEventListener("change", function () {
        uploadImageFunc(this);

        if (this.closest(".additional-artwork")) {
          let that = this;

          setTimeout(() => {
            that.closest(".additional-artwork").style.maxHeight =
              that.closest(".additional-artwork").scrollHeight +
              50 +
              "px";
            that.closest(".form-content").style.maxHeight =
              that.closest(".form-content").scrollHeight +
              this.closest(".additional-artwork").scrollHeight +
              50 +
              "px";
          }, 150);
        } else {
          if (additionalArtBtn.classList.contains("disabled")) {
            additionalArtBtn.classList.remove("disabled");
          }
        }

        let thisFormContent = this.closest(".form-content");
        setTimeout(() => {
          thisFormContent.style.maxHeight =
            thisFormContent.scrollHeight + 50 + "px";
          let stepFive = document.getElementById("quote-step-5");
          stepFive.classList.add("active");
          stepFive.querySelector(".form-content").style.maxHeight =
            stepFive.querySelector(".form-content").scrollHeight + "px";
        }, 150);

        let submitFormBtn = document.getElementById("submit-qq-form");
        submitFormBtn.disabled = false;
      });
    }

    function uploadImageFunc(el) {
      let img = el
        .closest(".photo-upload-content")
        .querySelectorAll(".preview-photo img");
      let previewImg = el
        .closest(".photo-upload-content")
        .querySelector(".preview-photo");
      let previewPhotoSrc = el
        .closest(".photo-upload-content")
        .querySelectorAll(".preview-main-photo img").src;
      let removeBtn = el
        .closest(".photo-upload-content")
        .querySelector(".remove-photo");
      let file = el.files[0];
      let photoUploadContent = el.closest(".photo-upload-content");

      el.value = "";
      setTimeout(() => {
        photoUploadContent.classList.add("active");
      }, 100);

      if (file) {
        let reader = new FileReader();
        reader.onload = function () {
          let result = reader.result;
          img.forEach((i) => {
            i.src = result;
          });
        };

        if (removeBtn) {
          removeBtn.addEventListener("click", function () {
            if (previewImg.getAttribute("id") == "preview-photo") {
              img.forEach((i) => (i.src = previewPhoto));
            } else {
              img.forEach((i) => (i.src = ""));
            }
            photoUploadContent.classList.remove("active");
            let that = el;
            setTimeout(() => {
              that
                .closest(".additional-artwork")
                .querySelector(".btn-remove-artwork")
                .click();
            });
          });
        }
        reader.readAsDataURL(file);
      }
      if (el.value) {
        let valueStore = el.value.match(regExp);
        img.forEach((i) => i.setAttribute("alt", valueStore));
      }
    }
    //#endregion

    //On focus of text inputs change label placement
    let textInputs = document.querySelectorAll(
      '.input-block input[type="text"]'
    );
    for (let i = 0; i < textInputs.length; i++) {
      textInputs[i].addEventListener("focus", function () {
        this.closest(".input-block")
          .querySelector("label")
          .classList.add("active");
      });
      textInputs[i].addEventListener("blur", function (e) {
        let value = e.target.value;
        if (value.trim() == "" || value.trim() === null) {
          this.closest(".input-block")
            .querySelector("label")
            .classList.remove("active");
        }
      });
    }

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
          this.closest(".category-box").querySelector(
            ".category-content"
          );

        if (
          this.closest(".category-box").classList.contains("active")
        ) {
          categoryContent.style.maxHeight =
            categoryContent.scrollHeight + "px";
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
            this.closest(".category-list").querySelectorAll(
              ".category-link"
            );
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
            this.closest(".content-sm").querySelector(
              ".category-wrapper"
            );
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

    //#region PRODUCT CATALOG POPUP
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


    //Pagination
    let pagination = document.querySelectorAll(
      "#product-catalog-popup .pagination-links .link"
    );
    for (let i = 0; i < pagination.length; i++) {
      pagination[i].addEventListener("click", function (e) {
        e.preventDefault();

        let thisSiblings = siblings(this);
        this.classList.add("active");
        thisSiblings.forEach((s) => s.classList.remove("active"));
      });
    }

    //Total pages
    let totalPageCount = document.querySelector(
      "#product-catalog-popup .total-pages span"
    );
    totalPageCount.innerText = pagination.length;

    // let paginationContainer = document.querySelector(
    //   "#product-catalog-popup .pagination-links"
    // );
    let paginationLinks = document.querySelector(
      "#product-catalog-popup .pagination .link-wrapper"
    );

    //Pagination navigate right
    navNext.addEventListener("click", function () {
      navPrev.classList.remove("disabled");

      if (diff <= visibleWidth) {
        paginationLinks.style.transform = "translateX(-" + diff + "px)";
        this.classList.add("disabled");
      } else if (diffCount >= 1) {
        diffCount--;
        paginationLinks.style.transform =
          "translateX(-" + translateDimension + "px)";
        if (diffCount != 0) {
          translateDimension += visibleWidth;
        }
      } else if (diffRemaining > 0) {
        translateDimension += diffRemaining;
        paginationLinks.style.transform =
          "translateX(-" + translateDimension + "px)";
        this.classList.add("disabled");
      }
      navRightSlideCount++;
    });

    //Pagination navigate left
    navPrev.addEventListener("click", function () {
      if (navRightSlideCount > 1) {
        translateDimension = translateDimension - visibleWidth;
        paginationLinks.style.transform =
          "translateX(-" + translateDimension + "px)";
      } else {
        paginationLinks.style.transform = "translateX(0px)";
        this.classList.add("disabled");
        translateDimension = visibleWidth;
        diffCount = Math.floor(diff / visibleWidth);
      }
      navNext.classList.remove("disabled");
      navRightSlideCount--;
    });

    //Select product and open product view pop-up
    let btnSelectProduct = document.querySelectorAll(
      "#product-catalog-popup .btn-select-product"
    );
    let catalogContent = document.getElementById("prod-list-catalog");
    let viewContent = document.getElementById("prod-view-screen");
    let selectedProductInfo = document.getElementById(
      "selected-product-info"
    );

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
          this.closest(".product-card").querySelector(
            ".content .title"
          );
        let prodImg =
          this.closest(".product-card").querySelector(".photo-box img");
        let prodColors =
          this.closest(".product-card").querySelector(".color-wrap");
        let prodDescription = this.closest(
          ".product-card"
        ).querySelector(".product-description .content");

        //Product view popup content fill
        let viewTitle = viewContent.querySelector(
          ".product-content .title-wrapper .title"
        );
        let viewMainPhoto =
          viewContent.querySelector("#product-photo img");
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
        let btnMoreContent =
          viewContent.querySelector(".btn-more-content");
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
      let btnCatalog = document.querySelector(
        "#quick-quote-form .btn-catalog"
      );
      btnCatalog.classList.add("hide");
      let selectedProductInfo = document.getElementById(
        "selected-product-info"
      );
      selectedProductInfo.classList.add("show");

      let stepThree = document.querySelector(
        "#quote-step-3 .form-content"
      );
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
        this.closest("#prod-view-screen").querySelector(
          ".product-image img"
        );
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

      activeColorName.innerText =
        activeColor.getAttribute("data-color-name");
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
          activeColorName.innerText =
            this.getAttribute("data-color-name");

          let colorWrap = this.closest(".color-wrap");
          let thisIndex = [...colorWrap.children].indexOf(this);
        });

        //Color mouse in
        colors[i].addEventListener("mouseenter", function () {
          activeColorName.innerText =
            this.getAttribute("data-color-name");
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
          activeColorName.innerText =
            activeColor.getAttribute("data-color-name");
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
      allCards[viewContent.getAttribute("data-number")].classList.add(
        "selected"
      );

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

    //BACK TO CATALOG BUTTON - POPUP
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
      viewContent
        .querySelector(".product-description .content")
        .remove();
      viewContent
        .querySelector(".btn-more-content")
        .classList.remove("active");
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
    let searchBox = document.querySelector(
      "#product-catalog-popup .search-box"
    );
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

      let desContent = this.closest(
        ".product-description"
      ).querySelector(".content");

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
      let descContent = this.closest(
        ".product-description"
      ).querySelector(".content");
      this.classList.toggle("active");
      descContent.classList.toggle("active");
      if (this.classList.contains("active")) {
        descContent.style.maxHeight = descContent.scrollHeight + "px";
      } else {
        descContent.style.maxHeight = null;
      }
    });
}

