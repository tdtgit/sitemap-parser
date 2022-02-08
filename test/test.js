const SitemapXMLParser = require(__dirname + '/../lib/sitemap');
const chai = require('chai');
const expect = chai.expect;

describe('SitemapXMLParser', function() {
    describe('constructor()', function() {
        it('should return a object', function() {
            const url = 'https://raw.githubusercontent.com/tdtgit/sitemap-warmer/master/tests/sitemap.xml';
            const options = {
                delay: 500,
                limit: 5
            };
            const sitemapXMLParser = new SitemapXMLParser(url, options);
            expect(sitemapXMLParser).to.be.an('object');
        });
    });

    describe('fetch()', function() {
        it('should return a promise', function() {
            const url = 'https://raw.githubusercontent.com/tdtgit/sitemap-warmer/master/tests/sitemap.xml';
            const options = {
                delay: 500,
                limit: 5
            };
            const sitemapXMLParser = new SitemapXMLParser(url, options);
            const result = sitemapXMLParser.fetch();
            expect(result).to.be.an('promise');
        });
    });

    describe('fetch()', function() {
        it('should return a array', function() {
            const url = 'https://raw.githubusercontent.com/tdtgit/sitemap-warmer/master/tests/sitemap.xml';
            const options = {
                delay: 500,
                limit: 5
            };
            const sitemapXMLParser = new SitemapXMLParser(url, options);
            sitemapXMLParser.fetch().then(result => {
                expect(result).to.be.an('array');
                expect(result.length).to.be.equal(5);
            });
        });
    });

    describe('getURLFromURL()', function() {
        it('should return a array', function() {
            const url = 'https://raw.githubusercontent.com/tdtgit/sitemap-warmer/master/tests/sitemap.xml';
            const options = {
                delay: 500,
                limit: 5
            };
            const sitemapXMLParser = new SitemapXMLParser(url, options);
            sitemapXMLParser.getURLFromURL(url).then(result => {
                expect(result).to.be.an('promise');
            });
        });
    });
    
    describe('getBodyFromURL()', function() {
        it('should return a promise', function() {
            const url = 'https://raw.githubusercontent.com/tdtgit/sitemap-warmer/master/tests/sitemap.xml';
            const options = {
                delay: 500,
                limit: 5
            };
            const sitemapXMLParser = new SitemapXMLParser(url, options);
            const result = sitemapXMLParser.getBodyFromURL(url);
            expect(result).to.be.an('promise');
        });
    });

    describe('getBodyFromURL()', function() {
        it('should return a string', function() {
            const url = 'https://raw.githubusercontent.com/tdtgit/sitemap-warmer/master/tests/sitemap.xml';
            const options = {
                delay: 500,
                limit: 5
            };
            const sitemapXMLParser = new SitemapXMLParser(url, options);
            sitemapXMLParser.getBodyFromURL(url).then(result => {
                expect(result).to.be.an('string');
            });
        });
    });

    describe('executeParseXml()', function() {
        it('should return a object', function() {
            const url = 'https://raw.githubusercontent.com/tdtgit/sitemap-warmer/master/tests/sitemap.xml';
            const options = {
                delay: 500,
                limit: 5
            };
            const sitemapXMLParser = new SitemapXMLParser(url, options);
            const result = sitemapXMLParser.executeParseXml(url);
            expect(result).to.be.an('promise');
        });
    });
});
