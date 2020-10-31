const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

class CrawlSetup {
    url = "";
    options = {};
    constructor(url) {
        this.url = url;
        this.options = {
            uri: this.url,
            transform: this.transform,
        };
    }
    transform(body) {
        return cheerio.load(body);
    }
}

class BookCrawler extends CrawlSetup {
    type = "book";
    bookResult = [];
    jsonFileName = "";
    constructor(url, jsonFileName) {
        super(url);
        this.jsonFileName = jsonFileName ? jsonFileName : "data.json";
    }
    async crawData() {
        try {
            var $ = await rp(this.options);
        } catch (err) {
            console.log(err);
            return;
        }
        const booksContainer = $(".tab .book-item");
        for (let i = 0; i < booksContainer.length; i++) {
            let book = $(booksContainer[i]);
            let title = book.find(".item-info .title").text().trim();
            let author = book.find(".item-info .author").text().trim();
            let published = book.find(".item-info .published").text().trim();
            let format = book.find(".item-info .format").text().trim();
            let price = book.find(".item-info .price-wrap .price").text().trim().split("\n");
            let imgUrl = book.find(".item-img a img").attr("src")
                ? book.find(".item-img a img").attr("src")
                : book.find(".item-img a img").attr("data-lazy");
            let result = {
                productName: title,
                price: price[0],
                productDetails: {
                    author,
                    published,
                    format,
                },
                productImageUrl: imgUrl,
            };
            this.bookResult.push(result);
            // console.log(this.mapResults(this.bookResult));
            fs.writeFileSync(this.jsonFileName, JSON.stringify(this.mapResults(this.bookResult)));
        }
    }

    mapResults(bookResult) {
        // console.log(bookResult);
        return bookResult.map((entity) => {
            return {
                ...entity,
                productType: "book",
                user: "hoang@gmail.com",
                quantity: 1,
            };
        });
    }
}

// const url = "https://www.bookdepository.com/bestsellers";
// const bookCrawler = new BookCrawler(url, "bookData1.json");
// bookCrawler.crawData();
// for (let i = 2; i < 6; i++) {
//     const bookCrawler = new BookCrawler(
//         `https://www.bookdepository.com/bestsellers?page=${i}`,
//         `bookData${i}.json`
//     );
//     bookCrawler.crawData();
// }
