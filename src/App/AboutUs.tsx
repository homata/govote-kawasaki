import './AboutUs.scss'

const Content = () => {
  return (
    <div className="about-us">
      <div className="container">
        <div className="branding">
          <div className="image"><img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt=""/></div>
          <div className="logo">GoVote KAWASAKIマップ</div>
        </div>

        <h2>さそいあって選挙にいこう！</h2>
        <p>
          投票行動を川崎市民が身近に楽しめるムーブメントにしたい！と願う川崎市内の団体・組織・企業が集まって「GoVote KAWASAKI」を立ち上げました。
        </p>
        <p>
          「GoVote KAWASAKI」を合言葉に投票をリアルやSNS上（Twitter / Instagram / Facebook）で呼びかけるほか、ポスター、ステッカー、Zoom背景、のデータを公式サイトで無料配布します。
          ぜひ、#GoVoteKAWASAKi のハッシュタグをつけて、発信してください！
        </p>

        <h2>About GoVote KAWASAKI</h2>
        <p>
          GoVote KAWASAKI は川崎市民に投票を促す市民による活動です。
        </p>
        <p>
          『Go Vote KAWASAKI』を合言葉に、ステッカー、ポスター、Zoom背景を無料配布するほか、市内の飲食店やサービス業のみなさんとともに投票へ行こう！の輪を広げていきます。
        </p>

        <h2>関連サイト</h2>
        <p>
          <ul>
            <li><a href="https://www.govote-kawasaki.jp/" target='_blank' rel="noreferrer">公式サイト</a></li>
            <li><a href="https://twitter.com/kawasaki_vote" target='_blank' rel="noreferrer">Twitter</a></li>
            <li><a href="https://www.facebook.com/govote.kawasaki" target='_blank' rel="noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/govote.kawasaki/?hl=ja" target='_blank' rel="noreferrer">Instagram</a></li>
          </ul>
        </p>
        ※ 詳しいことは公式サイトをご覧ください。
        ※ 問い合わせメール：info[at]govote-kawasaki.jp  [at]を@マークに置き換えてください。

        <h2>About Geolonia PWAマップ</h2>
        <p>
          このアプリは、株式会社Geoloniaの「<a href="https://github.com/geoloniamaps/pwamap" target='_blank' rel="noreferrer">Geolonia PWAマップ</a>」を使用して作成されています。
        </p>

      </div>

    </div>
  );
};

export default Content;
