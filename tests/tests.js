const SitemapXMLParser = require(__dirname + '/../lib/sitemap');
const url = 'https://raw.githubusercontent.com/tdtgit/sitemap-warmer/master/tests/sitemap.xml';

const options = {
    delay: 500,
    limit: 5
};

const sitemapXMLParser = new SitemapXMLParser(url, options);

sitemapXMLParser.fetch().then(result => {
    console.log(result);
});