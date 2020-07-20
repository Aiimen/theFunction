$(document).ready(() => {

    let urlPrefix = "https://www.uniqlo.com";
    if (window.location.href.includes("prodtest")) {
        urlPrefix = "https://prodtest.uniqlo.com";
    }

    let region = "";
    let link = "";

    //get the current region
    region = $("#container").data().region;

    if (typeof products != 'undefined') {
        //if the region is DK, SE or EU we can set products[GB]
        if (region === "SE" || region === "EU" || region === "DK") {
            skus = Object.keys(products['GB']);
        } else {
            skus = Object.keys(products[region]);
        }
    }



    //construct the link with approriate region
    link = `${urlPrefix}/on/demandware.store/Sites-${region}-Site/default/Product-HitTile?pid=`;

    skus.forEach((sku) => {

        $.ajax(link + sku).done((data) => {
            fetchName(data, sku);
            fetchURL(data, sku);
            fetchImage(data, sku);
            fetchPrice(data, sku);
            fetchSwatches(data, sku);
            fetchRatings(sku);
        });
    });


    fetchName = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((val, index) => {
            if ($(index).find("[data-uniqlo-pname]").length !== 0) {
                if (
                    $(index).find("[data-uniqlo-pname]")[0].attributes[0].value !==
                    "false"
                ) {
                    const name = $(data)[0].childNodes[1].childNodes[5].childNodes[1]
                        .innerText;
                    $(index).find("[data-uniqlo-pname]")[0].innerHTML = name;
                    $(index).find("[data-uniqlo-pname]").map((value, index) => {
                        index.innerHTML = name;
                    })
                } else if (
                    $(index).find("[data-uniqlo-pname]")[0].attributes[0].value ===
                    "false"
                ) {
                    const name = products[region][sku]["name"];
                    $(index).find("[data-uniqlo-pname]")[0].innerHTML = name;
                    $(index).find("[data-uniqlo-pname]").map((value, index) => {
                        index.innerHTML = name;
                    })
                } else {
                    return null;
                }
            }
        });
    };
    fetchPrice = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((val, index) => {
            if ($(index).find("[data-uniqlo-price]").length !== 0) {
                if (
                    $(index).find("[data-uniqlo-price]")[0].attributes[0].value !==
                    "false"
                ) {
                    const price = $(data)[0].childNodes[1].childNodes[5].childNodes[3]
                        .childNodes[3].innerText;
                    $(index).find("[data-uniqlo-price]")[0].innerHTML = price;
                    $(index).find("[data-uniqlo-price]").map((value, index) => {
                        index.innerHTML = price;
                    })
                } else if (
                    $(index).find("[data-uniqlo-price]")[0].attributes[0].value ===
                    "false"
                ) {
                    const price = products[region][sku]["price"];
                    $(index).find("[data-uniqlo-price]")[0].innerHTML = price;
                    $(index).find("[data-uniqlo-price]").map((value, index) => {
                        index.innerHTML = price;
                    })
                }
            } else {
                return null;
            }
        });
    };
    fetchURL = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((val, index) => {
            if ($(index).find("[data-uniqlo-url]").length !== 0) {
                if (
                    $(index).find("[data-uniqlo-url]")[0].attributes[0].value !== "false"
                ) {
                    const url = $(data)[0].childNodes[1].childNodes[5].childNodes[1]
                        .childNodes[1].childNodes[1].href;
                    $(index).find("[data-uniqlo-url]")[0].href = url;
                    $(index).find("[data-uniqlo-url]").map((value, index) => {
                        index.href = url;
                    })
                } else if (
                    $(index).find("[data-uniqlo-url]")[0].attributes[0].value === "false"
                ) {
                    const url = products[region][sku]["url"];
                    $(index).find("[data-uniqlo-url]").prevObject[0].href = url;
                    $(index).find("[data-uniqlo-url]").map((value, index) => {
                        index.href = url;
                    })
                }
            } else {
                return null;
            }
        });
    };
    fetchImage = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((val, index) => {
            if ($(index).find("[data-uniqlo-image]").length !== 0) {
                if (
                    $(index).find("[data-uniqlo-image]")[0].attributes[0].value !==
                    "false"
                ) {
                    const image = $(data)[0].childNodes[1].childNodes[3].childNodes[2]
                        .childNodes[1].src;
                    $(index).find("[data-uniqlo-image]")[0].src = image;
                    $(index).find("[data-uniqlo-image]").map((value, index) => {
                        index.src = image;
                    })
                } else if (
                    $(index).find("[data-uniqlo-image]")[0].attributes[0].value ===
                    "false"
                ) {
                    const image = products[region][sku]["image"];
                    $(index).find("[data-uniqlo-image]")[0].src = image;
                    $(index).find("[data-uniqlo-image]").map((value, index) => {
                        index.src = image;
                    })
                }
            } else {
                return null;
            }
        });
    };
    fetchSwatches = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((val, index) => {
            if ($(index).find('[data-uniqlo-swatches]').length !== 0) {

                if ($(index).find('[data-uniqlo-swatches]')[0].attributes[0].value !== 'false') { //if want to scrape the data
                    // console.log($(data));
                    const swatches = $(data)[0].childNodes[1].childNodes[9].childNodes[1];

                    // $(index).find('[data-uniqlo-swatches]')[0].attributes[0].html(swatches);
                    $(index).find('[data-uniqlo-swatches]')[0].replaceWith(swatches);
                } else if ($(index).find('[data-uniqlo-image]')[0].attributes[0].value === 'false') {
                    // const image = products[region][sku]["image"]; //getting the local name saved in the json 
                    // $(index).find('[data-uniqlo-image]')[0].src = image;
                }
            } else {
                return null;
            }
        })
    };

    fetchRatings = (sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((val, index) => {
            if ($(index).find("[data-uniqlo-ratings]").length !== 0) {
                if ($(index).find("[data-uniqlo-ratings]")[0].attributes[0].value !== "false") {
                    $(index).find("[data-uniqlo-ratings]").map((value, index) => {
                        const ratings = parseInt($(index)[0].dataset.uniqloRatings); //get number of stars;
                        const ratingsElement = $(index)[0];
                        const star = "★";
                        for (let i = 1; i < ratings; i++) {
                            ratingsElement.append(star);
                        }
                    })
                }
            }
        })
        // console.log('hello')
    }
});
