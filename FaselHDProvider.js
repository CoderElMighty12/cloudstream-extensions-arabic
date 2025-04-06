// ==UserScript==
// @name FaselHD
// @description Provider for FaselHD - w1.faselhdxwatch.top
// @version 1.0
// @author ChatGPT
// ==/UserScript==

const BASE_URL = "https://w1.faselhdxwatch.top";

function search(query) {
    const url = `${BASE_URL}/search/${query.replace(/\s/g, "+")}/`;
    const doc = fetchDocument(url);
    const results = [];
    for (const el of doc.select(".Grid--WecimaPosts .GridItem")) {
        const name = el.selectFirst(".Title").text();
        const href = el.selectFirst("a").attr("href");
        const poster = el.selectFirst("img").attr("data-src") || "";
        results.push({
            name,
            url: href,
            poster,
        });
    }
    return results;
}

function load(url) {
    const doc = fetchDocument(url);
    const title = doc.selectFirst("h1").text();
    const poster = doc.selectFirst(".MovieImage img").attr("src");
    const description = doc.selectFirst(".StoryMovie .Content").text();
    const episodes = [];

    for (const link of doc.select(".WatchServersList a")) {
        episodes.push({
            name: link.text(),
            url: link.attr("data-url") || link.attr("href"),
        });
    }

    return {
        name: title,
        poster,
        description,
        episodes
    };
}

function resolve(url) {
    return {
        stream: [
            {
                url: url,
                quality: "auto"
            }
        ]
    };
}
