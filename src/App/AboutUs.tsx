import './AboutUs.scss'
import React from "react";

const Content = () => {
  return (
    <div className="about-us">
      <div className="container">
        <div className="branding">
          <div className="image"><img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt=""/></div>
          <div className="logo">GoVote KAWASAKIアプリ</div>
        </div>

        <h2>さそいあって選挙にいこう！</h2>
        <p>
          投票行動を川崎市民が身近に楽しめるムーブメントにしたい！と願う川崎市内の団体・組織・企業が集まって「GoVote KAWASAKI」を立ち上げました。
        </p>
        <p>
          「GoVote KAWASAKI」を合言葉に投票をリアルやSNS上（Twitter / Instagram / Facebook）で呼びかけるほか、ポスター、ステッカー、Zoom背景、
          のデータを公式サイトで無料配布します。<br/>
          ぜひ、ハッシュタグをつけて、発信してください！
        </p>
        <h3>ハッシュタグ</h3>
        <p>
          <ul style={{ listStyleType: "none" }}>
            <li>#GoVoteKAWASAKI</li>
            <li>#選挙</li>
            <li>#選挙に行こう</li>
            <li>#選挙にいこうキャンペーン</li>
          </ul>
        </p>

        <h4>About GoVote KAWASAKI</h4>
        <p>
          GoVote KAWASAKI は川崎市民に投票を促す市民による活動です。
        </p>
        <p>
          『Go Vote KAWASAKI』を合言葉に、ステッカー、ポスター、Zoom背景を無料配布するほか、市内の飲食店やサービス業のみなさんとともに投票へ行こう！の輪を広げていきます。
        </p>

        <h4>関連サイト</h4>
        <p>
          <ul style={{ listStyleType: "none" }}>
            <li><a href="https://www.govote-kawasaki.jp/" target='_blank' rel="noreferrer">・公式サイト</a></li>
            <li><a href="https://twitter.com/kawasaki_vote" target='_blank' rel="noreferrer">・Twitter</a></li>
            <li><a href="https://www.facebook.com/govote.kawasaki" target='_blank' rel="noreferrer">・Facebook</a></li>
            <li><a href="https://www.instagram.com/govote.kawasaki/?hl=ja" target='_blank' rel="noreferrer">・Instagram</a></li>
          </ul>
        </p>
        <h4>選挙情報</h4>
        <p>
          令和5年4月9日執行第20回統一地方選挙<br/>
          投票日：令和5年4月9日(日) 朝7時～夜8時<br/>
          <ul style={{ listStyleType: "none" }}>
            <li>・川崎市議会議員選挙</li>
            <li>・神奈川県議会議員選挙</li>
            <li>・神奈川県知事選挙</li>
          </ul>
        </p>
        <h4>外部リンク</h4>
        <p>
          <ul style={{ listStyleType: "none" }}>
            <li><a href="https://senkyo-kawasaki2023.jp/index.htm" target='_blank' rel="noreferrer">・令和5年4月9日執行第20回統一地方選挙特設ホームページ</a></li>
            <li><a href="https://www.city.kawasaki.jp/shisei/category/58-1-0-0-0-0-0-0-0-0.html" target='_blank' rel="noreferrer">・川崎市の選挙情報</a></li>
          </ul>
        </p>

        <div className="note" >
          <h4>注意事項</h4>
          <p>
            <ul>
              <li>ポスター掲示場設置場所、投票所、期日前投票所の情報は、平成31年第19回統一地方選挙のものを使用しております。令和5年第20回統一地方選挙と実情が異なる場合がございます。予めご了承ください。</li>
              <li>ポスター掲示場設置場所、投票所、期日前投票所の位置は、住所を元におおよその位置を示しており、正確な位置を示した情報ではございません。ご注意ください。</li>
              <li>詳しいことは公式サイトをご覧ください。</li>
              <li>問い合わせメール：info[at]govote-kawasaki.jp  [at]を@マークに置き換えてください。</li>
            </ul>
          </p>
        </div>

        <h4>About Geolonia PWAマップ</h4>
        <p>
          このアプリは、株式会社Geoloniaの「<a href="https://github.com/geoloniamaps/pwamap" target='_blank' rel="noreferrer">Geolonia PWAマップ</a>」のソースコードを元に作成されています。
        </p>

        <h5>powered by オープン川崎</h5>

      </div>
    </div>
  );
};

export default Content;
