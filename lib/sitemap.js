'use strict';

const fetch = require('node-fetch');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const bluebird = require('bluebird');
const promiseMap = bluebird.map;
const delay = bluebird.delay;

class SitemapXMLParser {
    constructor(url, options) {
        this.siteMapUrl = url;
        this.delayTime = options.delay ? options.delay : 3000;
        this.limit = options.limit ? options.limit : 5;
        this.urlArray = [];
    }

    async fetch() {
        //トップページのXMLを取得
        const indexBody = await this.getBodyFromURL(this.siteMapUrl);
        const indexXML = await this.executeParseXml(indexBody);
        //URL一覧を取得
        await this.getURLFromXML(indexXML)
        //サイトマップの一覧
        return this.urlArray;
    }


    async getURLFromURL(url) {
        let body = await this.getBodyFromURL(url);
        let sitemapData = await this.executeParseXml(body);
        await this.getURLFromXML(sitemapData);
        return delay(this.delayTime);
    }

    /**
     * サイトマップ一覧からURLを取得する
     * サイトマップインデックスファイルの場合は、リンク先にアクセスしてURLを集める
     * @param {*} xml
     */
    async getURLFromXML(xml) {
        let sitemapIndexData = [];
        if (xml.sitemapindex
            && xml.sitemapindex.sitemap
        ) {
            //サイトマップインデックスファイルの場合
            for (let i = 0; i < Object.keys(xml.sitemapindex.sitemap).length; i++) {
                sitemapIndexData.push(
                    {
                        url: xml.sitemapindex.sitemap[i].loc[0],
                        this: this
                        //promiseMapへは参照渡しになっているので
                        //promiseMap内でのthisの値を変更すればpromiseMap外でもthisの値は変更される
                    }
                );
            }

            await promiseMap(
                sitemapIndexData,
                async (data) => {
                    let body = await data.this.getBodyFromURL(data.url);
                    let sitemapData = await data.this.executeParseXml(body);
                    await data.this.getURLFromXML(sitemapData);
                    return delay(data.this.delayTime);
                },
                { concurrency: this.limit }
            )
        }

        if (xml.urlset
            && xml.urlset.url
        ) {
            //サイトマップの場合　取得した一覧を追加
            for (let i = 0; i < Object.keys(xml.urlset.url).length; i++) {
                if (xml.urlset.url[i]) {
                    this.urlArray.push(xml.urlset.url[i]);
                }
            }
        }
    }

    /**
     * URLからbodyを取得する
     * 拡張子がgzファィルの場合は解凍する
     * @param {*} url 
     */
    async getBodyFromURL(url) {
        return new Promise(resolve => {
            fetch(url)
                .then(res => res.text())
                .then(body => resolve(body));
        });
    }


    /**
     * 実際にXMLのパースを行う関数
     * @param {*} value 
     */
    async executeParseXml(xml) {
        return new Promise(resolve => {
            parser.parseString(xml, (error, result) => {
                resolve(result);
            });
        })
    }
}

module.exports = SitemapXMLParser;
module.exports.default = SitemapXMLParser;
