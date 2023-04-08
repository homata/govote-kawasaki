GoVote KAWASAKIアプリ
===
GoVote KAWASAKIアプリは、川崎市内のポスター掲示場設置場所、投票所、期日前投票所、センキョ割実施店舗を
確認できるアプリです

詳細については[公式サイト](https://www.govote-kawasaki.jp/)を参照ください。


### GoVote KAWASAKI 関連サイト
* [公式サイト](https://www.govote-kawasaki.jp/)
* [Twitter](https://twitter.com/kawasaki_vote)
* [Facebook](https://www.facebook.com/govote.kawasaki)
* [Instagram](https://www.instagram.com/govote.kawasaki/?hl=ja)

### データの更新
GitHub Actionsで10分毎のスケジュールでGoogleスプレットシートからデータをダウンロードしています

更新データ
* スポットデータ：/public/data.json
* 基本データ: /src/config.json

リポジトリが60日間使用されないと、GitHub Actions は自動的に無効になります。

### 開発環境作成
モジュールは [package.json](https://raw.githubusercontent.com/openkawasaki/govote-kawasaki/master/package.json) を参照ください
```
$ git clone git@github.com:openkawasaki/govote-kawasaki.git
$ cd govote-kawasaki
$ npm install
$ npm start
```

#### 環境変数
* GOOGLE_SHEET_API_KEY: Google APIキー
* GOOGLE_SHEET_URL: Googleスプレットシート URL

### License
MIT License: See the [license](./LICENSE.txt) document for the full text.

各々のライセンスに従ってください。
* [Geolonia PWAマップ](https://github.com/geoloniamaps/pwamap)

### Contributors
[CONTRIBUTORS.md](./CONTRIBUTORS.md) を参照ください

---

[powered by オープン川崎](https://www.openkawasaki.org/)
