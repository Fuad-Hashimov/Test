import RunHeader from "/uploads/17562641/File/embroidery/pages/components/header.js";
import RunLoginPopup from "/uploads/17562641/File/embroidery/pages/components/loginregisterpopup.js";
import RunPopup from "/uploads/17562641/File/components/popup.js";
import quickHtml from "./quickquoteHtml.js";
import DetectCssApplied from "/uploads/17562641/File/embroidery/pages/helper/contentFullLoaded.js";
import { getCategoriesApi, getProductsApi } from "./api.js";
import { getCategories, getSubCategories } from "./filter.js";

document.onreadystatechange = async function () {
  if (document.readyState === "complete") {
    const accountElem = document.querySelector("#u_h_account");
    const cart_items = document.querySelectorAll(".dn-shopping-cart-line-item");
    const isLogin = accountElem ? true : false;
    const allMetas = document.querySelectorAll("meta");
    //
    //#region Get Page Title
    const title = document.querySelector("title").innerText;
    //#endregion
    document.querySelector("html").remove();
    //#region HTML START
    const html = document.createElement("html");
    html.addClassName("no-js");
    html.setAttribute("lang", "en");
    html.innerHTML = `
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="tags for website" />
        <meta name="description" content="front-end starter" />
        <meta name="author" content="yesweprint.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=Aladin&family=Atomic+Age&family=Carattere&family=Combo&family=Goblin+One&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <!-- COMMON CSS -->
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/common.css" />
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/tooltip.css" />

        <!-- HEADER CSS -->
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/header.css" />
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/header-menu.css" />
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/header-topbar.css" />
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/header-searchbar.css" />
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/pop-up.css" />

        <!-- COMPONENTS CSS -->
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/product-catalog-popup.css" />
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/quick-quote-form.css" />

        <!-- PAGES CSS -->
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/quick-quote.css" />

        <!-- DETECT IF CSS LOADED -->
        <link rel="stylesheet" href="/uploads/17562641/File/embroidery/css/detect-loading-status.css" />
       
        </head>

  <body class="bg-gray">
  <!-- Body mask -->
  <div class="body-mask"></div>
  
    <!-- Back to top button -->
    <button class="back-to-top">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_6674_90132)">
          <path
            d="M15.787 11.122L8.51406 3.84922C8.37772 3.71284 8.1927 3.63623 7.99983 3.63623C7.80691 3.63623 7.62194 3.71288 7.48555 3.84927L0.213018 11.122C-0.0710061 11.406 -0.0710061 11.8665 0.213018 12.1505C0.496994 12.4345 0.957503 12.4345 1.24153 12.1505L7.99983 5.39206L14.7585 12.1505C14.9005 12.2925 15.0866 12.3635 15.2728 12.3635C15.4589 12.3635 15.645 12.2925 15.787 12.1505C16.071 11.8664 16.071 11.406 15.787 11.122Z"
            fill="#232528"
          />
        </g>
        <defs>
          <clipPath id="clip0_6674_90132">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
    </body>
        `;
    document.append(html);
    //#region Meta tags add to head
    allMetas.forEach((meta) => {
      document.querySelector("head").append(meta);
    });
    //#endregion
    await RunHeader(accountElem, cart_items, isLogin, title);

    //#region Main START
    const main = document.createElement("main");
    main.innerHTML = `
    <div id="quick-quote" class="section-container">
      <div class="section-title">
        <div class="icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_6534_91429)">
              <path
                d="M20 10.0426C20 15.1761 15.824 19.3532 10.6893 19.3532C5.5705 19.3532 1.40517 15.2003 1.38149 10.0866H0L2.06885 6.98187L4.1377 10.0866H2.9327C2.95638 14.3444 6.42589 17.8015 10.6888 17.8015C14.9669 17.8015 18.4477 14.3212 18.4477 10.0426C18.4477 5.76391 14.9669 2.28368 10.6888 2.28368C10.2597 2.28368 9.91288 1.93577 9.91288 1.50723C9.91288 1.07869 10.2597 0.731907 10.6888 0.731907C15.8234 0.73247 20 4.90908 20 10.0426ZM7.70306 13.8188C7.85475 13.9711 8.05323 14.0455 8.25171 14.0455C8.4502 14.0455 8.64868 13.9694 8.80036 13.8188L11.2385 11.3806C11.3846 11.2352 11.4658 11.0389 11.4658 10.832V6.44337C11.4658 6.01426 11.1184 5.66692 10.6899 5.66692C10.2608 5.66692 9.91401 6.01426 9.91401 6.44337V10.51L7.70363 12.7204C7.40083 13.0238 7.40083 13.5149 7.70306 13.8188ZM1.81116 3.74975C1.81116 1.67808 3.49037 0 5.56091 0C7.63145 0 9.31066 1.67978 9.31066 3.74975C9.31066 5.81973 7.63145 7.4995 5.56091 7.4995C3.49037 7.4995 1.81116 5.82029 1.81116 3.74975ZM2.95187 3.80276L4.62601 5.47633C4.72694 5.57783 4.85945 5.62914 4.9914 5.62914C5.12391 5.62914 5.25642 5.57839 5.35735 5.47633L8.16206 2.67106C8.36392 2.4692 8.36392 2.14215 8.16206 1.93972C7.96019 1.73729 7.63258 1.73786 7.43071 1.93972L4.9914 4.37791L3.68322 3.07085C3.48135 2.86955 3.15318 2.86955 2.95187 3.07085C2.74944 3.27384 2.74944 3.60089 2.95187 3.80276Z"
                fill="#3578EA"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6534_91429">
                <rect width="20" height="20" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h1 class="title">Quick quote</h1>
      </div>
      <h4 class="section-subtitle">
        Avarage response time - <b>10-11 mins</b>
      </h4>

      <!-- Quick quote form -->
      <form action="" id="quick-quote-form">
        <!-- {{!-- Step 1 --}} -->
        <div class="form-block active" id="quote-step-1">
          <h6 class="form-title">
            <span>1</span>
            Personal info
          </h6>
          <div class="form-content">
            <div class="input-wrapper">
              <div class="input-block">
                <label for="quote-first-name">First name*</label>
                <input type="text" id="quote-first-name" class="required" />
                <span class="error-message">*This field is required</span>
              </div>
              <div class="input-block">
                <label for="quote-last-name">Last name*</label>
                <input type="text" id="quote-last-name" class="required" />
                <span class="error-message">*This field is required</span>
              </div>
              <div class="input-block">
                <label for="quote-email">E-mail address*</label>
                <input type="text" id="quote-email" class="required" />
                <span class="error-message">*This field is required</span>
              </div>
              <div class="input-block">
                <label for="quote-phone">Phone number</label>
                <input type="text" id="quote-phone" />
                <span class="error-message">*This field is required</span>
              </div>
            </div>
          </div>
        </div>
        <!-- {{!-- Step 2 --}} -->
        <div class="form-block" id="quote-step-2">
          <h6 class="form-title">
            <span>2</span>
            Choose decoration method
          </h6>
          <div class="form-content">
            <div class="input-wrapper deco-type">
              <div class="input-block radio-wrapper">
                <input
                  type="radio"
                  id="quote-print-method"
                  name="quote-deco-method"
                />
                <label for="quote-print-method">
                  <div class="icon">
                    <img src="/uploads/17562641/File/embroidery/assets/c-print.webp" alt="Print method" />
                  </div>
                  Printing method
                </label>
              </div>
              <div class="input-block radio-wrapper">
                <input
                  type="radio"
                  id="quote-emb-method"
                  name="quote-deco-method"
                />
                <label for="quote-emb-method">
                  <div class="icon">
                    <img
                      src="/uploads/17562641/File/embroidery/assets/c-embroidery.jpeg"
                      alt="Embroidery method"
                    />
                  </div>
                  Embroidery method
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- {{!-- Step 3 --}} -->
        <div class="form-block" id="quote-step-3">
          <h6 class="form-title">
            <span>3</span>
            Select product
          </h6>
          <div class="form-content">
            <div class="input-wrapper">
              <button
                type="button"
                class="pop-up_button btn-catalog"
                data-id="product-catalog-popup"
                id="prod-catalog"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM13 11H11V13C11 13.2652 10.8946 13.5196 10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14C9.73479 14 9.48043 13.8946 9.2929 13.7071C9.10536 13.5196 9 13.2652 9 13V11H7C6.73479 11 6.48043 10.8946 6.2929 10.7071C6.10536 10.5196 6 10.2652 6 10C6 9.73478 6.10536 9.48043 6.2929 9.29289C6.48043 9.10536 6.73479 9 7 9H9V7C9 6.73478 9.10536 6.48043 9.2929 6.29289C9.48043 6.10536 9.73479 6 10 6C10.2652 6 10.5196 6.10536 10.7071 6.29289C10.8946 6.48043 11 6.73478 11 7V9H13C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10C14 10.2652 13.8946 10.5196 13.7071 10.7071C13.5196 10.8946 13.2652 11 13 11Z"
                    fill="#A3C1FF"
                  />
                </svg>
                Product catalog
              </button>
            </div>
            <div id="selected-product-info">
              <div class="product-image-wrapper">
                <div class="carousel-wrapper">
                  <div class="main-photo">
                    <div class="squareImg">
                      <img src="" alt="" />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="button-blue pop-up_button"
                  data-id="product-catalog-popup"
                >
                  Change product
                </button>
              </div>
              <div class="product-content-wrapper">
                <div class="wrapper">
                  <div class="size-wrapper">
                    <p class="product-title">Select sizes</p>
                    <div class="form-wrapper">
                      <div class="input-wrapper">
                        <label for="sel-size-xs">XS</label>
                        <input
                          type="number"
                          id="sel-size-xs"
                          placeholder="0"
                        />
                      </div>
                      <div class="input-wrapper">
                        <label for="sel-size-s">S</label>
                        <input
                          type="number"
                          id="sel-size-s"
                          placeholder="0"
                        />
                      </div>
                      <div class="input-wrapper">
                        <label for="sel-size-m">M</label>
                        <input
                          type="number"
                          id="sel-size-m"
                          placeholder="0"
                        />
                      </div>
                      <div class="input-wrapper">
                        <label for="sel-size-l">L</label>
                        <input
                          type="number"
                          id="sel-size-l"
                          placeholder="0"
                        />
                      </div>
                      <div class="input-wrapper">
                        <label for="sel-size-xl">XL</label>
                        <input
                          type="number"
                          id="sel-size-xl"
                          placeholder="0"
                        />
                      </div>
                      <div class="input-wrapper">
                        <label for="sel-size-2xl">2XL</label>
                        <input
                          type="number"
                          id="sel-size-2xl"
                          placeholder="0"
                        />
                      </div>
                      <div class="input-wrapper">
                        <label for="sel-size-3xl">3XL</label>
                        <input
                          type="number"
                          id="sel-size-3xl"
                          placeholder="0"
                        />
                      </div>
                      <div class="input-wrapper">
                        <label for="sel-size-4xl">4XL</label>
                        <input
                          type="number"
                          id="sel-size-4xl"
                          placeholder="0"
                        />
                      </div>
                      <div class="input-wrapper">
                        <label for="sel-size-5xl">5XL</label>
                        <input
                          type="number"
                          id="sel-size-5xl"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="color-wrapper">
                    <div class="selected-color">
                      <p class="title">
                        Selected color: <span class="color-name"></span>
                      </p>
                      <div class="color-code"></div>
                    </div>
                    <div class="color-list">
                      <ul class="color-wrap">
                        <li
                          class="color"
                          data-color-name="lime"
                          data-color-id="8563893"
                        >
                          <div class="color-box">
                            <span style="background: #396026"></span>
                            <span style="background: #78d64b"></span>
                          </div>
                        </li>
                        <li
                          class="color"
                          data-color-name="turf green"
                          data-color-id="8563723"
                        >
                          <div class="color-box">
                            <span style="background: #18975c"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="red"
                          data-color-id="8563808"
                        >
                          <div class="color-box">
                            <span style="background: #d50032"></span>
                          </div>
                        </li>
                        <li
                          class="color"
                          data-color-name="maroon"
                          data-color-id="8563833"
                        >
                          <div class="color-box">
                            <span style="background: #582d40"></span>
                          </div>
                        </li>
                        <li
                          class="color"
                          data-color-name="military green"
                          data-color-id="8563818"
                        >
                          <div class="color-box">
                            <span style="background: #5e7461"></span>
                          </div>
                        </li>
                        <li
                          class="color"
                          data-color-name="royal"
                          data-color-id="8563843"
                        >
                          <div class="color-box">
                            <span style="background: #1d4f91"></span>
                          </div>
                        </li>
                        <li
                          class="color"
                          data-color-name="sapphire"
                          data-color-id="8563793"
                        >
                          <div class="color-box">
                            <span style="background: #0067a0"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="antique jade dome"
                          data-color-id="8563708"
                        >
                          <div class="color-box">
                            <span style="background: #006269"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="sport grey"
                          data-color-id="8563733"
                        >
                          <div class="color-box">
                            <span style="background: #97999b"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="natural"
                          data-color-id="8563718"
                        >
                          <div class="color-box">
                            <span style="background: #e7ceb5"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="violet"
                          data-color-id="8563693"
                        >
                          <div class="color-box">
                            <span style="background: #4a61ad"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="yellow haze"
                          data-color-id="8563828"
                        >
                          <div class="color-box">
                            <span style="background: #fde59f"></span>
                          </div>
                        </li>

                        <li
                          class="color color--white active"
                          data-color-name="white"
                          data-color-id="8563853"
                        >
                          <div class="color-box">
                            <span style="background: #ffffff"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="purple"
                          data-color-id="8563898"
                        >
                          <div class="color-box">
                            <span style="background: #351f65"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="cardinal"
                          data-color-id="8563728"
                        >
                          <div class="color-box">
                            <span style="background: #ab0938"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="antique sapphire"
                          data-color-id="8563753"
                        >
                          <div class="color-box">
                            <span style="background: #006a8e"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="heather navy"
                          data-color-id="137750423"
                        >
                          <div class="color-box">
                            <span style="background: #565a66"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="orange"
                          data-color-id="8563838"
                        >
                          <div class="color-box">
                            <span style="background: #f4633a"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="garnet"
                          data-color-id="8563863"
                        >
                          <div class="color-box">
                            <span style="background: #a30331"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="antique orange"
                          data-color-id="8563848"
                        >
                          <div class="color-box">
                            <span style="background: #b33d26"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="russet"
                          data-color-id="8563873"
                        >
                          <div class="color-box">
                            <span style="background: #521123"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="tennessee orange"
                          data-color-id="8563798"
                        >
                          <div class="color-box">
                            <span style="background: #f89629"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="ash"
                          data-color-id="8563653"
                        >
                          <div class="color-box">
                            <span style="background: #cfc9ca"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="navy"
                          data-color-id="8563738"
                        >
                          <div class="color-box">
                            <span style="background: #202a44"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="antique irish green"
                          data-color-id="8563748"
                        >
                          <div class="color-box">
                            <span style="background: #00843d"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="irish green"
                          data-color-id="8563773"
                        >
                          <div class="color-box">
                            <span style="background: #00a74a"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="tweed"
                          data-color-id="8563698"
                        >
                          <div class="color-box">
                            <span style="background: #04080b"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="kiwi"
                          data-color-id="8563883"
                        >
                          <div class="color-box">
                            <span style="background: #c1cd23"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="ice grey"
                          data-color-id="92940812"
                        >
                          <div class="color-box">
                            <span style="background: #d7d2cb"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="berry"
                          data-color-id="8563663"
                        >
                          <div class="color-box">
                            <span style="background: #af538a"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="electric green"
                          data-color-id="92940822"
                        >
                          <div class="color-box">
                            <span style="background: #009b57"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="antique cherry red"
                          data-color-id="8563758"
                        >
                          <div class="color-box">
                            <span style="background: #c1434f"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="azalea"
                          data-color-id="8563783"
                        >
                          <div class="color-box">
                            <span style="background: #dd74a1"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="gravel"
                          data-color-id="8563868"
                        >
                          <div class="color-box">
                            <span style="background: #b0acae"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="brown savana"
                          data-color-id="8563878"
                        >
                          <div class="color-box">
                            <span style="background: #977f5d"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="midnight"
                          data-color-id="92940832"
                        >
                          <div class="color-box">
                            <span style="background: #0f142a"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="dark chocolate"
                          data-color-id="8563658"
                        >
                          <div class="color-box">
                            <span style="background: #382f2d"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="black"
                          data-color-id="8563683"
                        >
                          <div class="color-box">
                            <span style="background: #25282a"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="charcoal"
                          data-color-id="8563768"
                        >
                          <div class="color-box">
                            <span style="background: #63666a"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="carolina blue"
                          data-color-id="8563778"
                        >
                          <div class="color-box">
                            <span style="background: #7ba4db"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="sunset"
                          data-color-id="92940817"
                        >
                          <div class="color-box">
                            <span style="background: #d27e4e"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="gold"
                          data-color-id="8563668"
                        >
                          <div class="color-box">
                            <span style="background: #ffb81c"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="tropical blue"
                          data-color-id="92940827"
                        >
                          <div class="color-box">
                            <span style="background: #3368aa"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="daisy"
                          data-color-id="8563678"
                        >
                          <div class="color-box">
                            <span style="background: #fed141"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="graphite heather"
                          data-color-id="120649592"
                        >
                          <div class="color-box">
                            <span style="background: #707372"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="heliconia"
                          data-color-id="8563788"
                        >
                          <div class="color-box">
                            <span style="background: #e31c79"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="forest green"
                          data-color-id="8563688"
                        >
                          <div class="color-box">
                            <span style="background: #183029"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="safety pink"
                          data-color-id="113734243"
                        >
                          <div class="color-box">
                            <span style="background: #ea278d"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="cornsilk"
                          data-color-id="113734253"
                        >
                          <div class="color-box">
                            <span style="background: #f3ee90"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="cobalt"
                          data-color-id="92940847"
                        >
                          <div class="color-box">
                            <span style="background: #171c8f"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="dark heather"
                          data-color-id="113734238"
                        >
                          <div class="color-box">
                            <span style="background: #425563"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="texas orange"
                          data-color-id="113734248"
                        >
                          <div class="color-box">
                            <span style="background: #b15533"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="indigo blue"
                          data-color-id="8563903"
                        >
                          <div class="color-box">
                            <span style="background: #4f758b"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="light blue"
                          data-color-id="8563803"
                        >
                          <div class="color-box">
                            <span style="background: #a4c8e1"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="sand"
                          data-color-id="8563813"
                        >
                          <div class="color-box">
                            <span style="background: #c5b9ac"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="old gold"
                          data-color-id="8563823"
                        >
                          <div class="color-box">
                            <span style="background: #cfab79"></span>
                          </div>
                        </li>

                        <li
                          class="color"
                          data-color-name="sky"
                          data-color-id="8563713"
                        >
                          <div class="color-box">
                            <span style="background: #71c5e8"></span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- {{!-- Step 4 --}} -->
        <div class="form-block" id="quote-step-4">
          <h6 class="form-title">
            <span>4</span>
            Upload artwork
          </h6>
          <div class="form-content">
            <div class="artwork-wrapper">
              <div class="upload-artwork active">
                <div class="input-wrapper">
                  <div class="input-block title-wrapper">
                    <p class="title">Select print placement</p>
                    <button type="button" class="btn-remove-artwork">
                      Delete
                    </button>
                  </div>
                </div>
                <div class="radio-block-wrapper">
                  <div class="radio-wrapper">
                    <input
                      type="radio"
                      id="quote-deco-front"
                      name="quote-deco-placement"
                    />
                    <label for="quote-deco-front">Front</label>
                  </div>
                  <div class="radio-wrapper">
                    <input
                      type="radio"
                      id="quote-deco-back"
                      name="quote-deco-placement"
                    />
                    <label for="quote-deco-back">Back</label>
                  </div>
                  <div class="radio-wrapper">
                    <input
                      type="radio"
                      id="quote-deco-left"
                      name="quote-deco-placement"
                    />
                    <label for="quote-deco-left">Left sleeve</label>
                  </div>
                  <div class="radio-wrapper">
                    <input
                      type="radio"
                      id="quote-deco-right"
                      name="quote-deco-placement"
                    />
                    <label for="quote-deco-right">Right sleeve</label>
                  </div>
                  <div class="radio-wrapper other">
                    <input
                      type="radio"
                      id="quote-deco-other"
                      name="quote-deco-placement"
                    />
                    <label for="quote-deco-other">Other</label>
                    <input
                      type="text"
                      placeholder="Describe print placement"
                      class="deactive"
                    />
                  </div>
                </div>
                <div class="photo-upload-content">
                  <div class="content-box file-upload">
                    <div class="photo-upload-box">
                      <div class="default-title">
                        <h6>
                          <span class="desktop"
                            >Drag &amp; Drop Artwork Files</span
                          >
                          <span class="mobile">Upload Artwork Files</span>
                        </h6>
                        <p class="info">10.0 MB maximum file size</p>
                      </div>
                      <div class="preview-photo-wrapper">
                        <div class="preview-photo">
                          <img src="" alt="" />
                        </div>
                      </div>
                      <div class="action-buttons">
                        <div class="uploaded-title">
                          <div class="icon">
                            <img
                              src="/uploads/17562641/File/embroidery/assets/checkmark-circle-green.svg"
                              alt=""
                            />
                          </div>
                          <p>Your image uploaded successfully.</p>
                        </div>
                        <div class="button-wrapper">
                          <div class="upload-image">
                            <input type="file" id="upload-photo" />
                            <label for="upload-photo">
                              <div class="icon">
                                <img src="/uploads/17562641/File/embroidery/assets/upload.svg" alt="" />
                              </div>
                              <p>
                                <span class="default">Upload</span>
                                <span class="changed">Change</span>
                                image
                              </p>
                            </label>
                          </div>
                          <button
                            type="button"
                            class="button-outline remove-photo"
                          >
                            Remove image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-box image-preview">
                    <div class="preview-photo">
                      <img src="" alt="" />
                    </div>
                  </div>
                </div>
                <div class="input-wrapper">
                  <div class="input-block">
                    <label for="">Height of artwork</label>
                    <input type="text" />
                  </div>
                  <div class="input-block">
                    <label for="">Width of artwork</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="btn-artwork-additional disabled">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0551 11H13.187V5C13.187 4.73478 13.0839 4.48043 12.9005 4.29289C12.7171 4.10536 12.4683 4 12.2089 4C11.9496 4 11.7008 4.10536 11.5174 4.29289C11.334 4.48043 11.2309 4.73478 11.2309 5V11H5.36279C5.1034 11 4.85464 11.1054 4.67122 11.2929C4.48781 11.4804 4.38477 11.7348 4.38477 12C4.38477 12.2652 4.48781 12.5196 4.67122 12.7071C4.85464 12.8946 5.1034 13 5.36279 13H11.2309V19C11.2309 19.2652 11.334 19.5196 11.5174 19.7071C11.7008 19.8946 11.9496 20 12.2089 20C12.4683 20 12.7171 19.8946 12.9005 19.7071C13.0839 19.5196 13.187 19.2652 13.187 19V13H19.0551C19.3145 13 19.5632 12.8946 19.7467 12.7071C19.9301 12.5196 20.0331 12.2652 20.0331 12C20.0331 11.7348 19.9301 11.4804 19.7467 11.2929C19.5632 11.1054 19.3145 11 19.0551 11Z"
                  fill="#3578EA"
                />
              </svg>
              Add second print placement (Optional)
            </button>
          </div>
        </div>
        <!-- {{!-- Step 5 --}} -->
        <div class="form-block" id="quote-step-5">
          <h6 class="form-title">
            <span>5</span>
            Extra information
          </h6>
          <div class="form-content">
            <div class="input-wrapper">
              <div class="note">
                <div class="icon">
                  <img src="/uploads/17562641/File/embroidery/assets/i-circle.svg" alt="" />
                </div>
                <p>
                  <b>Note: </b>If it is not a rush order, don't select a tight
                  due date. You may be charged an extra for rush service.
                </p>
              </div>
              <div class="input-block">
                <label for="need-by">Need delivery by</label>
                <div class="input-holder">
                  <input
                    type="date"
                    id="need-by"
                    placeholder="07-07-2022"
                    data-date-format="DD MMMM YYYY"
                    value="07-07-2022"
                  />
                  <div class="date-icon">
                    <span>Choose date</span>
                    <div class="icon">
                      <img src="/uploads/17562641/File/embroidery/assets/calendar.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-block full-width">
                <label for="quote-note">Add your special note</label>
                <textarea
                  name=""
                  id="quote-note"
                  cols="30"
                  rows="10"
                  placeholder="Tell us anything to help your artist deliver your eProof to your liking."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn-green" id="submit-qq-form" disabled>
          Send request
        </button>
      </form>
    </div>
    `;

    document.body.append(main);

    //#endregion Main END
    RunLoginPopup();
    //SCRIPTS
    RunPopup();
    //
    const PRODUCT_CATALOG_POPUP = document.createElement("div");
    PRODUCT_CATALOG_POPUP.id = "product-catalog-popup";
    PRODUCT_CATALOG_POPUP.className = "pop-up";

    let firstRequest = true;
    async function getData() {
      if (firstRequest) {
        firstRequest = false;
        getCategoriesApi().then((res) => getCategory(res));
        await getProducts(1, true).then((res) => quickHtml());
        document
          .getElementById("quote-first-name")
          .removeEventListener("focus", getData);
      }
    }
    document
      .getElementById("quote-first-name")
      .addEventListener("focus", getData);

    DetectCssApplied(document.body);
    quickHtml();
    //#region functions
    function getCategory(res) {
      let resCategory = getCategories(res);
      let resultSubCategories = getSubCategories(res);
      PRODUCT_CATALOG_POPUP.innerHTML = `<div class="pop-up_content-box" id="prod-list-catalog">
    <div class="pop-up_header">
      <button class="search-button" id="btn-search-product">
        <img src="/uploads/17562641/File/embroidery/assets/search-white.svg" alt="" />
      </button>
      <h6 class="mob-title">Select Product</h6>
      <button class="pop-up_close close-button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z"
            fill="#232528"
          />
        </svg>
      </button>
      <div class="search-box">
        <div class="search-content">
          <div class="form-wrapper">
            <button class="back-button">
              <img src="/uploads/17562641/File/embroidery/assets/ArrowLeft.svg" alt="" />
            </button>
            <div class="search-form">
              <label for="search-mob"></label>
              <input id="search-mob" type="text" placeholder="Search" />
              <div class="icon">
                <img src="/uploads/17562641/File/embroidery/assets/search-1.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="trending">
            <div class="title">
              <div class="icon">
                <img src="/uploads/17562641/File/embroidery/assets/Fire.svg" alt="" />
              </div>
              <p>Trending</p>
            </div>
            <div class="trend-links">
              <a href="" class="t_link">T-shirts</a>
              <a href="" class="t_link">Hoodies</a>
              <a href="" class="t_link">Totebags</a>
              <a href="" class="t_link">Embroidery</a>
              <a href="" class="t_link">Workwear</a>
              <a href="" class="t_link">T-shirts</a>
              <a href="" class="t_link">Hoodies</a>
              <a href="" class="t_link">Totebags</a>
              <a href="" class="t_link">Embroidery</a>
              <a href="" class="t_link">Workwear</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pop-up_body">
      <div class="content-header content-wrapper">
        <div class="content-sm">
          <h6 class="title">Select Product</h6>
        </div>
        <div class="content-lg">
          <form action="" class="search-form">
            <input type="text" placeholder="Search" />
            <div class="icon">
              <img src="/uploads/17562641/File/embroidery/assets/search-1.svg" alt="" />
            </div>
          </form>
          <div class="pagination-box">
            <div class="pagination">
              <button class="nav-button nav-prev disabled">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6672 4.16663C11.8619 4.16625 12.0506 4.23407 12.2005 4.3583C12.2849 4.42826 12.3546 4.51418 12.4057 4.61113C12.4569 4.70809 12.4884 4.81418 12.4984 4.92332C12.5085 5.03247 12.4969 5.14253 12.4644 5.2472C12.4319 5.35187 12.379 5.44909 12.3088 5.5333L8.57549 9.99997L12.1755 14.475C12.2447 14.5602 12.2964 14.6583 12.3276 14.7636C12.3588 14.8689 12.3689 14.9793 12.3572 15.0885C12.3456 15.1976 12.3126 15.3035 12.2599 15.3998C12.2073 15.4962 12.1361 15.5812 12.0505 15.65C11.9643 15.7258 11.8633 15.7831 11.7539 15.818C11.6445 15.853 11.5291 15.865 11.4148 15.8533C11.3006 15.8416 11.19 15.8063 11.09 15.7498C10.99 15.6933 10.9028 15.6168 10.8338 15.525L6.80882 10.525C6.68625 10.3759 6.61925 10.1888 6.61925 9.9958C6.61925 9.80278 6.68625 9.61574 6.80882 9.46663L10.9755 4.46663C11.0591 4.36579 11.1653 4.28607 11.2855 4.23394C11.4056 4.18182 11.5364 4.15876 11.6672 4.16663Z"
                    fill="#232528"
                  ></path>
                </svg>
              </button>
              <div class="pagination-links">
                <div id="popup-pagination" class="link-wrapper">
                </div>
              </div>
              <button class="nav-button nav-next">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.33285 15.8334C8.13814 15.8337 7.94944 15.7659 7.79951 15.6417C7.71513 15.5717 7.64538 15.4858 7.59425 15.3889C7.54313 15.2919 7.51163 15.1858 7.50157 15.0767C7.4915 14.9675 7.50307 14.8575 7.53561 14.7528C7.56815 14.6481 7.62101 14.5509 7.69118 14.4667L11.4245 10L7.82451 5.52503C7.75529 5.43979 7.7036 5.34171 7.67241 5.23643C7.64121 5.13115 7.63113 5.02074 7.64275 4.91155C7.65437 4.80236 7.68745 4.69654 7.74009 4.60017C7.79274 4.50381 7.86391 4.4188 7.94951 4.35003C8.03574 4.27417 8.13671 4.21695 8.24609 4.18195C8.35548 4.14696 8.47091 4.13496 8.58516 4.1467C8.6994 4.15844 8.80999 4.19366 8.90997 4.25016C9.00996 4.30666 9.09719 4.38322 9.16618 4.47503L13.1912 9.47503C13.3137 9.62414 13.3808 9.81118 13.3808 10.0042C13.3808 10.1972 13.3137 10.3843 13.1912 10.5334L9.02451 15.5334C8.94092 15.6342 8.83472 15.7139 8.71455 15.7661C8.59437 15.8182 8.4636 15.8412 8.33285 15.8334Z"
                    fill="#232528"
                  ></path>
                </svg>
              </button>
            </div>
            <p class="total-pages">Total <span></span> pages</p>
          </div>
        </div>
      </div>

      <div class="content-wrapper content-menu">
        <div class="content-sm">
          <button class="category-dropdown-button">
            <p class="title">
              <span class="category">Unisex</span>
              <span class="sub">T-shirt</span>
            </p>
            <div class="dropdown-icon">
              <img src="/uploads/17562641/File/embroidery/assets/angle-down-b.svg" alt="" />
            </div>
          </button>
          <div class="category-wrapper">
            <div class="category-list">
            ${resCategory
              .map((m) => {
                return `<div class="category-box">
              <button class="category-button">${m.n}</button>
              
              <div class="category-content">
              ${resultSubCategories
                .filter((sub) => sub.pid == m.id)
                .map((sub) => {
                  return `<a href="" class="category-link">${sub.n}</a>`;
                })
                .join("")}
              </div> 
            </div>`;
              })
              .join("")}
            </div>
          </div>
        </div>
        <div class="content-lg">
          <div id="popup-product-list" class="product-list">
      
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pop-up_content-box" id="prod-view-screen">
    <div class="pop-up_header">
      <div class="head-title">
        <button class="back-button">
          <img src="/uploads/17562641/File/embroidery/assets/ArrowLeft.svg" alt="" />
        </button>
        <h3 class="title">Product info</h3>
      </div>
      <button class="pop-up_close close-button">
        <img src="/uploads/17562641/File/embroidery/assets/close.svg" alt="" />
      </button>
    </div>
    <div class="pop-up_body">
      <div class="content-wrapper">
        <div class="product-info-wrapper">
          <div class="product-info">
            <div class="product-image-wrapper">
              <div class="product-image">
                <div class="main-photo" id="product-photo">
                  <div class="squareImg">
                    <img src="/uploads/17562641/File/embroidery/assets/1.jpg" alt="" />
                  </div>
                </div>
                <div class="button-wrapper">
                  <button class="button-blue" id="use-product">
                    Use this product
                  </button>
                </div>
              </div>
              <div class="product-title">
                <h3 class="title">Gildan Heavy Cotton Totebag 5000</h3>
              </div>
            </div>
            <div class="product-content">
              <div class="title-wrapper">
                <h3 class="title">Gildan Heavy Cotton Totebag 5000</h3>
              </div>
              <div class="color-wrapper">
                <p class="color-title">Available colors</p>
                <div class="color-list"></div>
              </div>
              <div class="product-description">
                <button class="btn-prod-description">
                  <span>Product description</span>
                  <div class="icon">
                    <img src="/uploads/17562641/File/embroidery/assets/angle-down-b.svg" alt="" />
                  </div>
                </button>
                <div class="description-wrapper"></div>
                <button class="btn-more-content">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.9999 16.0005C11.7719 16.0005 11.5449 15.9235 11.3599 15.7685L5.35991 10.7685C4.93591 10.4155 4.87791 9.78447 5.23191 9.36047C5.58491 8.93647 6.21491 8.87947 6.63991 9.23247L12.0109 13.7085L17.3729 9.39347C17.8029 9.04747 18.4329 9.11547 18.7789 9.54547C19.1249 9.97547 19.0569 10.6045 18.6269 10.9515L12.6269 15.7795C12.4439 15.9265 12.2219 16.0005 11.9999 16.0005"
                      fill="#555E6D"
                    />
                    <mask
                      id="mask0_10465_109828"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="5"
                      y="9"
                      width="14"
                      height="7"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.9999 16.0005C11.7719 16.0005 11.5449 15.9235 11.3599 15.7685L5.35991 10.7685C4.93591 10.4155 4.87791 9.78447 5.23191 9.36047C5.58491 8.93647 6.21491 8.87947 6.63991 9.23247L12.0109 13.7085L17.3729 9.39347C17.8029 9.04747 18.4329 9.11547 18.7789 9.54547C19.1249 9.97547 19.0569 10.6045 18.6269 10.9515L12.6269 15.7795C12.4439 15.9265 12.2219 16.0005 11.9999 16.0005"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_10465_109828)">
                      <rect width="24" height="24" fill="#555E6D" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>`;
      document.body.append(PRODUCT_CATALOG_POPUP);
    }
    async function getProducts(pageNum = 1, isFirst) {
      return getProductsApi(pageNum).then((resultProduct) => {
        let { total_pages } = resultProduct;
        let pageCount = 1;
        if (isFirst) {
          console.log(isFirst, "daxil oldu");
          isFirst = false;
          document.querySelector("#popup-pagination").innerHTML = "";
          while (pageCount < total_pages) {
            const page = document.createElement("a");
            page.href = "#";
            page.dataset.id = pageCount;
            page.classList.add("link");
            pageCount == 1 && page.classList.add("active");
            page.innerText = pageCount;
            page.addEventListener("click", function () {
              const activePage = document.querySelector("a.link.active");
              if (activePage.dataset.id !== this.dataset.id) {
                getProducts(this.dataset.id, false).then((res) => {
                  activePage.classList.remove("active");
                  this.classList.add("active");
                  // quickHtml();

                  let paginationContainer = document.querySelector(
          "#product-catalog-popup .pagination-links"
        );

                 let visibleWidth = paginationContainer.clientWidth;
         let fullWidth = paginationContainer.scrollWidth;
         let diff = fullWidth - visibleWidth;
         let diffCount = Math.floor(diff / visibleWidth);
         let diffRemaining = diff % visibleWidth;
         let translateDimension = visibleWidth;

         console.log('diff' + diff, 'vis' + visibleWidth)

                  //#region pick colors
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

                  //#region prod description
                  let productDescBtn = document.querySelector(
                    "#prod-view-screen .btn-prod-description"
                  );
                  productDescBtn.addEventListener("click", function () {
                    this.classList.toggle("active");

                    let desContent = this.closest(
                      ".product-description"
                    ).querySelector(".content");

                    if (this.classList.contains("active")) {
                      desContent.style.maxHeight =
                        desContent.scrollHeight + "px";
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
                      descContent.style.maxHeight =
                        descContent.scrollHeight + "px";
                    } else {
                      descContent.style.maxHeight = null;
                    }
                  });
                  //#endregion

                  //Select product and open product view pop-up
                  let btnSelectProduct = document.querySelectorAll(
                    "#product-catalog-popup .btn-select-product"
                  );
                  let catalogContent =
                    document.getElementById("prod-list-catalog");
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
                        this.closest(".product-card").querySelector(
                          ".photo-box img"
                        );
                      let prodColors =
                        this.closest(".product-card").querySelector(
                          ".color-wrap"
                        );
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

                      let descContent =
                        viewDescription.querySelector(".content");
                      let btnMoreContent =
                        viewContent.querySelector(".btn-more-content");
                      if (descContent.scrollHeight <= 100) {
                        descContent.style.maxHeight =
                          descContent.scrollHeight + "px";
                        descContent.classList.add("active");
                        btnMoreContent.classList.add("hide");
                      } else {
                        btnMoreContent.classList.remove("hide");
                      }
                    });
                  }
                });
              }
            });
            document.querySelector("#popup-pagination").append(page);
            //<a href="#" data-id="4" class="link">4</a>
            pageCount++;
          }
        }

        //#region productlarin duzulmesi
        document.getElementById(
          "popup-product-list"
        ).innerHTML = `${resultProduct.products
          .map((m) => {
            let image = m.object.di?.replace("-150.", ".");
            return `
          <div class="product-card">
          <div class="photo-box">
            <div class="squareImg">
              <img src="${image}" alt="" />
            </div>
            <div class="selected-item">
              <p>Selected-product</p>
            </div>
          </div>
          <div class="content">
            <div class="title-wrapper">
              <p class="title">
              ${m.name}
              </p>
            </div>
            <div class="color-wrapper">
              <ul class="color-wrap">
              ${m.object.c
                .map((col) => {
                  return col.c
                    .map((colorArr) => {
                      return `<li
                      class="color"
                      data-color-name="${colorArr[1]}"
                      data-color-id="8563893"
                    >
                      <div class="color-box">
                        <span style="background: ${colorArr[0]}"></span>
                        <span style="background: ${colorArr[0]}"></span>
                      </div>
                    </li>
                  `;
                    })
                    .join("");
                })
                .join("")}
              </ul>
              <div class="more-colors">+more</div>
            </div>
            <div class="product-description">
              <div class="content">
                ${m.desc}
              </div>
            </div>
            <button
              class="button-blue btn-select-product"
              data-id="prod-view-screen"
            >
              <span>Select product</span>
              <span class="selected-title">Product details</span>
            </button>
          </div>
        </div>
          `;
          })
          .join("")}
        `;
        //#endregion
      });
    }
    //#endregion
  }
};
