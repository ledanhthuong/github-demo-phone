// === variable global ===
const gapGrid = 26;

// ===Change Color ===
const changeColor = () => {
    const header = document.querySelector(".header");
    if (header) {
        let currentHeight = window.scrollY;
        if (currentHeight > header.offsetHeight) {
            header.classList.add("changeColor");
        } else {
            header.classList.remove("changeColor");
        }
    }
};
changeColor();

// === progress bar ===
const progressBar = () => {
    let progressbar = document.querySelector(".progress-bar");
    if (progressbar) {
        let currentHeight = window.scrollY;
        let totalHeight = document.body.offsetHeight - window.innerHeight;
        let percentLine = (currentHeight / totalHeight) * 100;
        progressbar.style.width = `${percentLine}%`;
    }
};
progressBar();
window.addEventListener("load", () => {
    changeColor();
    progressBar();
});
window.addEventListener("scroll", () => {
    changeColor();
    progressBar();
});
// === Toggle nav menu ===
const menuMobile = () => {
    const btnMenu = document.querySelector(".nav .nav__right .nav__right-close"),
        navMenu = document.querySelector(".nav__right-menu");
    btnMenu.addEventListener("click", () => {
        btnMenu.classList.toggle("--active");
        navMenu.classList.toggle("--active");
        document.querySelector("body").classList.toggle("--disable-scroll");
    });
    const hideNav = () => {
        btnMenu.classList.remove("--active");
        navMenu.classList.remove("--active");
    };
    const links = navMenu.querySelectorAll(".menu ul li a");
    links.forEach((link) => {
        link.addEventListener("click", hideNav);
    });
    const btn = navMenu.querySelector(".menu .btn");
    btn.addEventListener("click", () => {
        hideNav();
    });
    window.addEventListener("resize", () => {
        let widthWindow = window.innerWidth;
        if (widthWindow > 992) {
            hideNav();
        }
    });
};
menuMobile();
// // === flickity ===
const feedback = () => {
    const elem = document.querySelector(".scfeedback__list");
    if (elem) {
        // Update width of box when responsive
        const handleBoxWidth = () => {
            let containerWidth = document.querySelector(
                ".scfeedback .container .scfeedback__detail"
            ).clientWidth;
            const boxs = document.querySelectorAll(
                ".scfeedback .scfeedback__list .box.--author"
            );
            if (document.documentElement.offsetWidth >= 768) {
                boxs.forEach((box) => {
                    box.style.width = `${(containerWidth - gapGrid) / 2}px`;
                });
            } else {
                boxs.forEach((box) => {
                    box.style.width = `${containerWidth}px`;
                });
            }
        };
        
        //Get height
        const getStyle = (oElm, strCssRule) => {
            var strValue = "";
            if (document.defaultView && document.defaultView.getComputedStyle) {
                strValue = document.defaultView
                    .getComputedStyle(oElm, "")
                    .getPropertyValue(strCssRule);
            } else if (oElm.currentStyle) {
                strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
                    return p1.toUpperCase();
                });
                strValue = oElm.currentStyle[strCssRule];
            }
            return strValue.replace("px", "");
        };
        //Update height of box when responsive
        const handleBoxHeight = () => {
            const boxs = document.querySelectorAll(
                ".scfeedback .scfeedback__list .box.--author"
            );
            let height = 0;
            boxs.forEach((box) => {
                let heightBox =
                    box.querySelector(".desc").scrollHeight +
                    box.querySelector(".author").scrollHeight +
                    parseInt(getStyle(box.querySelector(".desc"), "margin-bottom")) +
                    parseInt(getStyle(box, "padding-top")) * 2;

                if (heightBox > height) {
                    height = heightBox;
                }
            });
            boxs.forEach((box) => {
                box.style.height = `${height}px`;
            });
            document.querySelector(
                ".scfeedback__list .flickity-viewport"
            ).style.height = `${height}px`;
        };
        let flkty = new FlickityResponsive(elem, {
            cellAlign: "center",
            contain: true,
            draggable: ">1",
            prevNextButtons: false,
            pageDots: true,
            wrapAround: true,
            groupCells: 2,
            responsive: [{
                    breakpoint: 767,
                    settings: {
                        groupCells: 1,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        cellAlign: "left",
                    },
                },
            ],
            on: {
                ready: function() {
                    console.log("Flickity is ready");
                    handleBoxWidth();
                    handleBoxHeight();
                },
                change: function(index) {
                    console.log("Slide changed to" + index);
                },
            },
        });
    }
};
feedback();

// === popup video ===
const popupVideo = () => {
    const btnPlay = document.querySelector(".scgetstart__video");
    if (btnPlay) {
        let popUp = document.querySelector(".popupVideo");
        let close = document.querySelector(
            ".popupVideo .popupVideo__content .popupVideo__content-video i"
        );
        let video = document.querySelector(
            ".popupVideo .popupVideo__content .popupVideo__content-video iframe"
        );
        let body = document.querySelector("body");
        const link = btnPlay.getAttribute("srcset");
        btnPlay.addEventListener("click", (e) => {
            e.stopPropagation();
            popUp.classList.add("active");
            video.setAttribute("src", `https://www.youtube.com/embed/${link}`);
            body.classList.add("--disable-scroll");
            // body.preventDefault();
        });
        const closeVideo = () => {
            popUp.classList.remove("active");
            video.setAttribute("src", "");
            body.classList.remove("--disable-scroll");
        };
        close.addEventListener("click", () => {
            closeVideo();
        });
        document.addEventListener("click", () => {
            closeVideo();
        });
    }
};
popupVideo();

//=== BLOG
const blog = () => {
    const tabs = document.querySelectorAll(
        ".scpost .scpost__top .listtab .btn-tag.--tab"
    );
    if (tabs) {
        const posts = document.querySelectorAll(".scpost .scpost__mid .post__list");
        tabs.forEach((tab) => {
            tab.addEventListener("click", (e) => {
                e.preventDefault();
                //Remove class active hiện tại
                tabs.forEach((item) => {
                    item.classList.remove("active");
                });
                //Add class active mới cho tab click
                tab.classList.add("active");

                //remove class active hiện tại của bài post
                posts.forEach((item) => {
                    item.classList.remove("active");
                });

                //get id của tab
                let id = tab.dataset.tab;
                document.querySelector(`.posts__list-${id}`).classList.add("active");
            });
        });
        // pagination
        const pagination = document.querySelector(
            ".scpost .scpost__bottom .pagination"
        );
        if (pagination) {
            const pages = pagination.querySelectorAll(".number .page");
            const posts = document.querySelectorAll(
                ".scpost .scpost__mid .post__list"
            );
            // === next prev
            const btnPrev = pagination.querySelector(".btnctr.--prev");
            const btnNext = pagination.querySelector(".btnctr.--next");
            let currentPage = 1;
            const totalPages = pages.length;
            console.log(totalPages);
            const updateButtonState = () => {
                if (currentPage === 1) {
                    btnPrev.classList.add("disable");
                } else {
                    btnPrev.classList.remove("disable");
                }

                if (currentPage === totalPages) {
                    btnNext.classList.add("disable");
                } else {
                    btnNext.classList.remove("disable");
                }
            };
            updateButtonState();
            pages.forEach((page) => {
                page.addEventListener("click", (e) => {
                    e.preventDefault();

                    if (page.classList.contains("is-selected")) {
                        e.preventDefault;
                    } else {
                        pages.forEach((item) => {
                            item.classList.remove("is-selected");
                        });
                        //Add class active mới cho tab click
                        page.classList.add("is-selected");
                        //remove class active hiện tại của bài post
                        posts.forEach((item) => {
                            item.classList.remove("active");
                        });
                        //get id của tab
                        let id = page.innerText;
                        document
                            .querySelector(`.posts__list-${id}`)
                            .classList.add("active");
                        if (id == 1) {
                            btnPrev.classList.add("disable");
                            btnNext.classList.remove("disable");
                        } else if (id == totalPages) {
                            btnNext.classList.add("disable");
                        } else {
                            btnPrev.classList.remove("disable");
                            btnNext.classList.remove("disable");
                        }
                    }
                });
            });
            // === Next Prev ===
            function handlePost(pageNumber) {
                currentPage = pageNumber;
                pages.forEach((item) => {
                    item.classList.remove("is-selected");
                });
                pages[currentPage - 1].classList.add("is-selected");
                posts.forEach((item) => {
                    item.classList.remove("active");
                });
                document
                    .querySelector(`.posts__list-${currentPage}`)
                    .classList.add("active");
            }

            btnPrev.addEventListener("click", (e) => {
                e.preventDefault();
                if (currentPage > 1) {
                    handlePost(currentPage - 1);
                    updateButtonState();
                    console.log("prev" + currentPage);
                }
            });
            btnNext.addEventListener("click", (e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                    handlePost(currentPage + 1);
                    updateButtonState();
                    console.log("next" + currentPage);
                }
            });
        }
    }
};
blog();

//contact
const faq = () => {
    const acc = document.querySelectorAll(".faq .faq__list .faq__item-title");
    if (acc) {
        acc.forEach((item) => {
            item.addEventListener("click", () => {
                item.classList.toggle("active");
                let content = item.nextElementSibling;
                console.log(content);
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
};
faq();

// === Start Validation ===
// Tạo một đối tượng validator
const contactForm = () => {
    //Khởi tạo và kiểm tra nếu có hàm thì mới thực thi
    const formContact = document.querySelector("#form-contact");
    if (formContact) {
        //Khởi tạo một Function truyền vào cho nó là 1 object
        const validator = (option) => {
            //Khai báo một object để lưu các rules cho các input form
            let selectorRules = {};
            // Khai báo cái form mà chúng ta muốn validator
            const formElement = document.querySelector(option.form);
            // Từ element querySelect đến thằng cha
            const parentE = (element, selector) => {
                while (element.parentElement) {
                    if (element.parentElement.matches(selector)) {
                        return element.parentElement;
                    }
                    element = element.parentElement;
                }
            };
            //Hàm validate.
            const validate = (inputElement, rule) => {
                //Ở đây chúng tao sẽ từ cái input element là cái cta target vào thì chúng ta sẽ parentElement là để lấy element cha.
                //Sau đó chúng ta từ Element cha sẽ queryselector thằng con có class "form-message".
                // Sau khi querySelector đc "form-message" rồi thì chúng tao sẽ có if else.
                // If(errorMessage) => "form-message".innerText = errorMessage. Tức là nếu mà có lỗi thì chúng ta sẽ xuất hiện đoạn text để thông báo và ngược lại thì không ( gán innerText bằng 1 chuỗi rỗng).
                //Sau khi đã báo lỗi thì chúng ta sẽ css hiệu ứng cảnh báo cho người dùng bằng cách thêm class ".error" vào class input
                const formGroup = parentE(inputElement, option.formGroup);
                const errorElement = formGroup.querySelector(option.errorSelector);
                // const errorMessage = rule.test(inputElement.value);
                let errorMessage;
                //Lấy ra các rules của selector
                var rules = selectorRules[rule.selector];

                for (let i = 0; i < rules.length; i++) {
                    switch (inputElement.type) {
                        case "radio":
                        case "checkbox":
                            errorMessage = rules[i](
                                formElement.querySelector(rule.selector + ":checked")
                            );
                            break;
                        default:
                            errorMessage = rules[i](inputElement.value);
                    }

                    if (errorMessage) {
                        break;
                    }
                }

                if (errorMessage) {
                    errorElement.innerText = errorMessage;
                    formGroup.classList.add("error");
                } else {
                    errorElement.innerText = "";
                    formGroup.classList.remove("error");
                }
                return !errorMessage;
            };
            //Hàm clear Error
            const clearError = (inputElement) => {
                const formGroup = parentE(inputElement, option.formGroup);
                const errorElement = formGroup.querySelector(option.errorSelector);
                // const errorMessage = rule.test(inputElement.value);
                errorElement.innerText = "";
                formGroup.classList.remove("error");
            };
            if (formElement) {
                //Khi submit form
                formElement.addEventListener("submit", (e) => {
                    e.preventDefault();
                    let isSuccess = true;
                    option.rules.forEach((rule) => {
                        const inputElement = formElement.querySelector(rule.selector);
                        const isValid = validate(inputElement, rule);
                        if (!isValid) {
                            isSuccess = false;
                        }
                    });
                    if (isSuccess) {
                        if (typeof option.onSubmit === "function") {
                            let enableInput = formElement.querySelectorAll(
                                "[name]:not([disable])"
                            );
                            let formValues = Array.from(enableInput).reduce(
                                (values, input) => {
                                    switch (input.type) {
                                        case "radio":
                                            values[input.name] = formElement.querySelector(
                                                `input[name=${input.name}"]:checked`
                                            );
                                            break;
                                        case "checkbox":
                                            if (!input.matches(":checked")) {
                                                values[input.name] = "";
                                                return values;
                                            }
                                            if (!Array.isArray(values[input.name])) {
                                                values[input.name] = [];
                                            }
                                            values[input.name].push(input.values);
                                            break;
                                        case "file":
                                            values[input.name] = input.files;
                                            break;
                                        default:
                                            values[input.name] = input.value;
                                    }

                                    return values;
                                }, {}
                            );
                            option.onSubmit(formValues);
                        } else {
                            // alert("Gửi thành công!");
                            formContact.submit();
                        }
                    } else {
                        console.log("có lỗi");
                    }
                });

                // Nếu form tồn tại thì chúng ta sẽ duyệt qua các  phần tử object để selector đến các phần html như input: name, email, mật khẩu,...
                option.rules.forEach((rule) => {
                    //Lưu lại rule cho input
                    if (Array.isArray(selectorRules[rule.selector])) {
                        selectorRules[rule.selector].push(rule.test);
                        console.log(selectorRules);
                    } else {
                        selectorRules[rule.selector] = [rule.test];
                    }

                    const inputElements = formElement.querySelectorAll(rule.selector);
                    Array.from(inputElements).forEach((inputElement) => {
                        if (inputElement) {
                            //Xử lý khi người dùng blur ra ngoài
                            inputElement.addEventListener("blur", () => {
                                validate(inputElement, rule);
                            });

                            //xử lý khi người dụng nhập nội dung
                            inputElement.addEventListener("input", () => {
                                clearError(inputElement);
                                // errorElement.innerText = "";
                                // formGroup.classList.remove("error");
                            });
                        }
                    });
                });
            }
        };
        /*
         * Ở function test chúng ta sẽ có quy ước chung là nếu như ngưởi dùng có nhập value thì trả ra undefined ngược lại thì trả ra lỗi
         *  Sử dụng trim để loại bỏ dấu cách
         *
         */
        validator.isRequired = (selector, message) => {
            return {
                selector: selector,
                test: (value) => {
                    return value ? undefined : message || "Please fill in this field";
                },
            };
        };
        validator.isEmail = (selector) => {
            return {
                selector: selector,
                test: (value) => {
                    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return regex.test(value) ? undefined : "Invalid email address";
                },
            };
        };
        validator.isConfirmed = (selector, getConfirmValue, message) => {
            return {
                selector: selector,
                test: (value) => {
                    return value === getConfirmValue() ?
                        undefined :
                        message || "Invalid value";
                },
            };
        };
        validator.minLength = (selector, min) => {
            return {
                selector: selector,
                test: (value) => {
                    return value.length >= min ?
                        undefined :
                        `Please enter at least ${min} characters`;
                },
            };
        };
        validator({
            form: "#form-contact",
            formGroup: ".form-group",
            errorSelector: ".form-message",
            rules: [
                validator.isRequired("#name"),
                validator.isRequired("#email"),
                validator.isEmail("#email"),
                validator.isRequired("#subject"),
                validator.isRequired("#content"),
                // validator.isConfirmed(
                //   "#content",
                //   () => {
                //     return document.querySelector("#form-contact #company").value;
                //   },
                //   "Mật khẩu khong trùng khớp"
                // ),
            ],
            onSubmit: (data) => {
                console.log(data);
            },
        });
    }
};
contactForm();
// === End Validation ===

// === Progress Bar
const progressBarLoading = () => {
    const loadingPage = document.querySelector(".loading");
    if (loadingPage) {
        document.addEventListener("DOMContentLoaded", () => {
            const progressBar = document.querySelector(".loading-page span");
            const percent = document.querySelector(".percent");
            const images = document.getElementsByTagName("img");
            const totalImages = images.length;
            let loadedImages = 0;

            // Sử dụng ImagesLoaded
            imagesLoaded(images, { background: true })
                .on("always", () => {
                    console.log("Tải ảnh hoàn tất");
                })
                .on("progress", (instance, image) => {
                    // Cập nhật phần trăm tải ảnh
                    loadedImages++;
                    const loadingPercent = Math.round((loadedImages / totalImages) * 100);
                    progressBar.style.width = `${loadingPercent}%`;
                    percent.textContent = `${loadingPercent} %`;

                    // Kiểm tra xem ảnh đã tải xong chưa
                    if (loadedImages === totalImages) {
                        console.log("Tất cả ảnh đã được tải xong");

                        // Ẩn progress bar
                        setTimeout(() => {
                            loadingPage.classList.add("hidden");
                        }, 1000);
                    }
                });
        });
    }
};
progressBarLoading();