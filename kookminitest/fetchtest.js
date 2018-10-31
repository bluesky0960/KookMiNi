async function loadGraphicCards(page = 1) {
    const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
    const response = await fetch(searchUrl);  // fetch page

    const htmlString = await response.text();// get response text

    /*fetch(searchUrl)
        .then(response => response.text())
        .then(responseText => {

        })*/

    const $ = cheerio.load(htmlString);       // parse HTML string

    return $("#s-results-list-atf > li")             // select result <li>s
        .map((_, li) => ({                      // map to an list of objects
            asin: $(li).data("asin"),
            title: $("h2", li).text(),
            price: $("span.a-color-price", li).text(),
            rating: $("span.a-icon-alt", li).text(),
            imageUrl: $("img.s-access-image").attr("src")
        }));
}