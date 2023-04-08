import React from "react";
import Links from './Links'
import './Shop.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { makeDistanceLabelText } from "./distance-label";
import Map, {
  Marker,
  // Popup,
  NavigationControl,
  // FullscreenControl,
  // ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

type Props = {
  shop: Pwamap.ShopData;
  close: Function;
}

const Content = (props: Props) => {
  const { shop } = props

  const clickHandler = () => {
    props.close()
  }

  const distanceTipText = makeDistanceLabelText(shop.distance)
  const category = shop['カテゴリ']
  const content = shop['紹介文']

  const toBreakLine = (text: string) => {

    return text.split(/(\r\n)|(\n)|(\r)/g).map((line, i) => {

      let result: any = '';

      if (line === '\r\n' || line === '\n' || line === '\r') {
        result = <br key={i} />
      } else if (line !== undefined) {
        result = line
      }

      return result
    })
  }

  // @ts-ignore
  let latitude = Number(shop['緯度'])
  let longitude = Number(shop['経度'])
  return <div className="shop-single">
    <div className="head">
      <button onClick={clickHandler}><AiOutlineClose size="16px" color="#FFFFFF" /> 閉じる</button>
    </div>
    <div className="container">
      {shop?
        <>
          <h2>{shop['スポット名']}</h2>
          <div>
            <span className="nowrap">
              <Link to={`/list?category=${category}`}>
                <span onClick={clickHandler} className="category">{category}</span>
              </Link>
            </span>
            <span className="nowrap">{distanceTipText && <span className="distance">現在位置から {distanceTipText}</span> }</span>
          </div>

          <div style={{margin: "24px 0"}}><Links data={shop} /></div>

          { shop['画像'] && <img src={shop['画像']} alt={shop['スポット名']} style={{width: "100%"}} />}
          { shop['カテゴリ'] === "センキョ割実施店舗" &&
            <div>
              センキョ割内容:
              <p style={{margin: "8px 0", wordBreak: "break-all"}}>
              {shop['Twitter']}
             </p>
            </div>
          }

          <p style={{margin: "24px 0", wordBreak: "break-all"}}>住所：{toBreakLine(content)}</p>

          <Map
            initialViewState={{
              longitude: longitude,
              latitude: latitude,
              zoom: 16,
            }}
            mapLib={maplibregl}
            style={{width: '100%', height: '300px', marginTop: "24px"}}
            mapStyle="https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json"
          >
            <Marker longitude={longitude} latitude={latitude} anchor="bottom" ></Marker>
            <GeolocateControl position="top-left" />
            <NavigationControl position="top-left" />
          </Map>

          <p><a className="small" href={`http://maps.apple.com/?q=${latitude},${longitude}`}>スポットまでの道順</a></p>

          <div className="note" >
            { shop['カテゴリ'] === "センキョ割実施店舗" &&
              <p>
                <a href={shop['Instagram']}>店舗URL</a>
              </p>
            }
            { shop['カテゴリ'] !== "センキョ割実施店舗" &&
              <p>
                <a href={shop['Instagram']}>出典URL</a>
              </p>
            }

            <ul>
              <li>ポスター掲示場設置場所、投票所、期日前投票所の情報は、平成31年第19回統一地方選挙のものを使用しております。令和5年第20回統一地方選挙と実情が異なる場合がございます。予めご了承ください。</li>
              <li>ポスター掲示場設置場所、投票所、期日前投票所の位置は、住所を元におおよその位置を示しており、正確な位置を示した情報ではございません。ご注意ください。</li>
            </ul>
          </div>
        </>
        :
        <></>
      }
    </div>
  </div>;
};

export default Content;
