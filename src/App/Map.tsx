import React, { useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.scss';

// @ts-ignore　OpacityControlプラグインの読み込み
import OpacityControl from 'maplibre-gl-opacity';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';

// @ts-ignore
//import geojsonExtent from '@mapbox/geojson-extent'
import toGeoJson from './toGeoJson'
//import setCluster from './setCluster'
import Shop from './Shop'

// Maker Icon images
import svg_bbs from './assets/iconmap-bbs.svg'
import svg_senkyowari_yen from './assets/iconmap-senkyowari-yen.svg'
import svg_vote from './assets/iconmap-vote.svg'
import svg_votebeforehand from './assets/iconmap-votebeforehand.svg'
const maker_size = 48;
const marker_bbs = new Image(maker_size, maker_size);
const marker_senkyowari_yen = new Image(maker_size, maker_size);
const marker_vote = new Image(maker_size, maker_size);
const marker_votebeforehand = new Image(maker_size, maker_size);
marker_bbs.src = svg_bbs;
marker_senkyowari_yen.src = svg_senkyowari_yen;
marker_vote.src = svg_vote;
marker_votebeforehand.src = svg_votebeforehand;

type Props = {
  data: Pwamap.ShopData[];
};

// const hidePoiLayers = (map: any) => {
//
//   const hideLayers = [
//     'poi',
//     'poi-primary',
//     'poi-r0-r9',
//     'poi-r10-r24',
//     'poi-r25',
//     'poi-bus',
//     'poi-entrance',
//   ]
//
//   for (let i = 0; i < hideLayers.length; i++) {
//     const layerId = hideLayers[i];
//     map.setLayoutProperty(layerId, 'visibility', 'none')
//   }
// }

const parseHash = (url?: Location | URL) => {
  const qstr = (url || window.location).hash.substring(2);
  const q = new URLSearchParams(qstr);
  return q;
};

const updateHash = (q: URLSearchParams) => {
  const hash = q.toString();
  if (hash) {
    window.location.hash = `#/?${q.toString().replace(/%2F/g, '/')}`;
  }
};

const Content = (props: Props) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [mapObject, setMapObject] = React.useState<maplibregl.Map | null>(null)
  const [shop, setShop] = React.useState<Pwamap.ShopData | undefined>(undefined)
  const [zLatLngString, setZLatLngString] = React.useState<string>('');
  // 川崎市
  const [longitude] = useState(139.6347);
  const [latitude] = useState(35.5542);
  const [zoom] = useState(11);

  const addMarkers = (mapObject: any, data: any) => {
    if (!mapObject || !data) {
      return
    }

    mapObject.on('render', () => {
      // nothing to do if shops exists.
      if (mapObject.getSource('shops')) {
        return
      }

      const geojson: any = toGeoJson(data)
      mapObject.addSource('shops', {
        type: 'geojson',
        data: geojson,
        //cluster: true,
        //clusterMaxZoom: 14,
        //clusterRadius: 25,
      })

      geojson.features.forEach(function (feature: any) {
        let category:string = feature.properties['カテゴリ'];

        let layer_id: string = "";
        let marker_object: any = null;

        if (category === "センキョ割実施店舗") {
          layer_id = 'poi-senkyowari_yen';
          marker_object = marker_senkyowari_yen;
        } else if (category === "期日前投票所") {
          layer_id = 'poi-votebeforehand';
          marker_object = marker_votebeforehand
        } else if (category === "投票所") {
          layer_id = 'poi-vote';
          marker_object = marker_vote;
        } else if (category === "ポスター掲示場設置場所") {
          layer_id = 'poi-bbs';
          marker_object = marker_bbs;
        } else {
          layer_id = "";
          marker_object = null;
        }
        // Add a layer for this symbol type if it hasn't been added already.
        if (!mapObject.getLayer(layer_id)) {
          // アイコン画像設定
          let image_id: string = "img_" + layer_id;
          mapObject.addImage(image_id, marker_object);

          // スタイル設定
          mapObject.addLayer({
            'id': layer_id,
            'type': 'symbol',
            source: 'shops',
            filter: ['==', "カテゴリ", category],
            'layout': {
              'icon-image': image_id,
              "icon-allow-overlap": true,
              "icon-size": 1.0,
              'text-field': "{スポット名}",
              'text-font': ['Noto Sans Regular'],
              'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
              'text-radial-offset': 1.7,
              'text-justify': 'auto',
              'text-size': 12,
              'text-anchor': 'top',
              'text-max-width': 12,
              'text-allow-overlap': false,
            },
          });

          mapObject.on('mouseenter', layer_id, () => {
            mapObject.getCanvas().style.cursor = 'pointer'
          })

          mapObject.on('mouseleave', layer_id, () => {
            mapObject.getCanvas().style.cursor = ''
          })

          mapObject.on('click', layer_id, (event: any) => {
            if (!event.features[0].properties.cluster) {
              setShop(event.features[0].properties)
            }
          })
        }
      });

      //setCluster(mapObject)

      // 背景地図・重ねるタイル地図のコントロール
      // const opacity = new OpacityControl({
      //   baseLayers: {
      //     'poi-senkyowari_yen': 'センキョ割実施店舗',
      //     'poi-votebeforehand': '期日前投票所',
      //     'poi-vote': '投票所',
      //     'poi-bbs': 'ポスター掲示場設置場所',
      //   },
      // });
      // mapObject.addControl(opacity, 'top-left');
    });
  }

  React.useEffect(() => {
    if (mapObject) {
      mapObject.flyTo({center: [longitude, latitude], zoom: zoom});
    }
  }, [mapObject, longitude, latitude, zoom])

  React.useEffect(() => {
    //addMarkers(mapObject, props.data)
  }, [mapObject, props.data])

  React.useEffect(() => {
    const hash = parseHash();
    if (zLatLngString) {
      hash.set('map', zLatLngString);
    }
    updateHash(hash);
  }, [ zLatLngString ]);


  React.useEffect(() => {
    // Only once reder the map.
    if (!mapContainer.current || mapObject) {
      return
    }
    // const map: maplibregl.Map = new maplibregl.Map({
    //   container: mapContainer.current,
    //   style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
    //   center: [longitude, latitude],  // 中心座標
    //   zoom: zoom, // ズームレベル
    //   pitch: 0, // 傾き
    //   bearing: 0,
    //   //attributionControl: false // 既存Attributionを非表示
    // });
    //const geojson: any = toGeoJson(props.data)
    //const bounds: any = geojsonExtent(geojson)


    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          m_mono: {
            type: 'raster',
            tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution:
              "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
          },
        },
        layers: [
          {
            id: 'm_mono',
            type: 'raster',
            source: 'm_mono',
            minzoom: 0,
            maxzoom: 18,
          },
        ],
      },
      center: [139.767, 35.681],
      zoom: 10,
    });

    // コントロールの追加
    // Attributionを折りたたみ表示
    //map.addControl(new maplibregl.AttributionControl({compact: true}), 'top-right');
    // @ts-ignore　スケール
    //map.addControl(new maplibregl.ScaleControl(), 'top-left');
    // @ts-ignore　拡大・縮小　
    //map.addControl(new maplibregl.NavigationControl(), 'top-right');
    // 現在位置検索
    //map.addControl(new maplibregl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
    // @ts-ignore　フルスクリーン
    //map.addControl(new maplibregl.FullscreenControl({container: document.querySelector('body')}));
    // タイル枠
    //map.showTileBoundaries = true;

    // URLハッシュを作成して、位置移動
    // const hash = parseHash();
    // if (hash && hash.get('map')) {
    //   const latLngString = hash.get('map') || '';
    //   const zlatlng = latLngString.split('/');
    //
    //   const zoom = Number(zlatlng[0])
    //   const lat = Number(zlatlng[1])
    //   const lng = Number(zlatlng[2])
    //   map.flyTo({center: [lng, lat], zoom: zoom});
    // } else if (bounds) {
    //   map.fitBounds(bounds, { padding: 50 })
    // }

    // const onMapLoad = () => {
    //   // hidePoiLayers(map)
    //   setMapObject(map)
    //
    //   map.on('moveend', () => {
    //     // see: https://github.com/maplibre/maplibre-gl-js/blob/ba7bfbc846910c5ae848aaeebe4bde6833fc9cdc/src/ui/hash.js#L59
    //     const center = map.getCenter(),
    //       rawZoom = map.getZoom(),
    //       zoom = Math.round(rawZoom * 100) / 100,
    //       // derived from equation: 512px * 2^z / 360 / 10^d < 0.5px
    //       precision = Math.ceil((zoom * Math.LN2 + Math.log(512 / 360 / 0.5)) / Math.LN10),
    //       m = Math.pow(10, precision),
    //       lng = Math.round(center.lng * m) / m,
    //       lat = Math.round(center.lat * m) / m,
    //       zStr = Math.ceil(zoom);
    //
    //     setZLatLngString(`${zStr}/${lat}/${lng}`);
    //   });
    // }

    const orienteationchangeHandler = () => {
      //map.resize()
    }

    // attach
    //map.on('load', onMapLoad)
    map.on('load', function () {
      // MIERUNE Color
      map.addSource('m_color', {
        type: 'raster',
        tiles: ['https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png'],
        tileSize: 256,
      });
      map.addLayer({
        id: 'm_color',
        type: 'raster',
        source: 'm_color',
        minzoom: 0,
        maxzoom: 18,
      });

      // OpenStreetMap
      map.addSource('o_std', {
        type: 'raster',
        tiles: [
          'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
          'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
      });
      map.addLayer({
        id: 'o_std',
        type: 'raster',
        source: 'o_std',
        minzoom: 0,
        maxzoom: 18,
      });

      // GSI Pale
      map.addSource('t_pale', {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
        tileSize: 256,
      });
      map.addLayer({
        id: 't_pale',
        type: 'raster',
        source: 't_pale',
        minzoom: 0,
        maxzoom: 18,
      });

      // GSI Ort
      map.addSource('t_ort', {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'],
        tileSize: 256,
      });
      map.addLayer({
        id: 't_ort',
        type: 'raster',
        source: 't_ort',
        minzoom: 0,
        maxzoom: 18,
      });

      // BaseLayer
      const mapBaseLayer = {
        m_mono: 'MIERUNE Mono',
        m_color: 'MIERUNE Color',
      };

      // OverLayer
      const mapOverLayer = {
        o_std: 'OpenStreetMap',
        t_pale: 'GSI Pale',
        t_ort: 'GSI Ort',
      };

      // OpacityControl
      let Opacity = new OpacityControl({
        baseLayers: mapBaseLayer,
        overLayers: mapOverLayer,
        opacityControl: true,
      });
      map.addControl(Opacity, 'top-right');

      // NavigationControl
      // @ts-ignore
      let nc = new maplibregl.NavigationControl();
      map.addControl(nc, 'top-left');
    });
    window.addEventListener('orientationchange', orienteationchangeHandler)

    return () => {
      // detach to prevent memory leak
      window.removeEventListener('orientationchange', orienteationchangeHandler)
      //map.off('load', onMapLoad)
    }
  }, [mapObject, props.data, longitude, latitude, zoom])

  const closeHandler = () => {
    setShop(undefined)
  }

  return (
    <div className="map-wrap">
      <div className="map-container" ref={mapContainer}></div>
      {shop ?
        <Shop shop={shop} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
}

export default Content;
