import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.scss';

// @ts-ignore
import geojsonExtent from '@mapbox/geojson-extent'
import toGeoJson from './toGeoJson'
import setCluster from './setCluster'
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

let mapObject: maplibregl.Map;

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

  const [lng] = useState(139.659963);
  const [lat] = useState(35.576655);
  const [zoom] = useState(10);

  const [shop, setShop] = React.useState<Pwamap.ShopData | undefined>(undefined)
  const [ zLatLngString, setZLatLngString ] = React.useState<string>('');

  const addMarkers = (mapObject: any, data: any) => {

    if (!mapObject || !data) {
      return
    }

    mapObject.on('render', () => {

      // nothing to do if shops exists.
      if (mapObject.getSource('shops')) {
        return
      }

      //hidePoiLayers(mapObject)

      const textColor = '#000000'
      const textHaloColor = '#FFFFFF'


      const geojson: any = toGeoJson(data)

      mapObject.addSource('shops', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 25,
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
              "icon-size": 1.0
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

      mapObject.addLayer({
        id: 'shop-symbol',
        type: 'symbol',
        source: 'shops',
        filter: ['all',
          ['==', '$type', 'Point'],
        ],
        paint: {
          'text-color': textColor,
          'text-halo-color': textHaloColor,
          'text-halo-width': 2,
        },
        layout: {
          'text-field': "{スポット名}",
          'text-font': ['Noto Sans Regular'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'text-size': 12,
          'text-anchor': 'top',
          'text-max-width': 12,
          'text-allow-overlap': false,
        },
      })

      // shop-symbol
      mapObject.on('mouseenter', 'shop-symbol', () => {
        mapObject.getCanvas().style.cursor = 'pointer'
      })

      mapObject.on('mouseleave', 'shop-symbol', () => {
        mapObject.getCanvas().style.cursor = ''
      })

      mapObject.on('click', 'shop-symbol', (event: any) => {
        if (!event.features[0].properties.cluster) {
          setShop(event.features[0].properties)
        }
      })

      setCluster(mapObject)

    });

  }

  React.useEffect(() => {

    addMarkers(mapObject, props.data)

  }, [mapObject, props.data])

  useEffect(() => {
    if (!mapObject) {
      if (!mapContainer.current) return;

      mapObject = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
        center: [lng, lat],  // 中心座標
        zoom: zoom, // ズームレベル
        pitch: 0, // 傾き
        bearing: 0
      });
    }

    // @ts-ignore
    //mapObject.addControl(new maplibregl.NavigationControl());
  }, [mapObject, props.data])

  React.useEffect(() => {
    // Only once reder the map.
    if (mapObject) {
      return
    }

    // @ts-ignore
    //const { geolonia } = window;

    const geojson = toGeoJson(props.data)
    const bounds = geojsonExtent(geojson)

    /*
    const map = new geolonia.Map({
      container: mapNode.current,
      style: 'geolonia/gsi',
      bounds: bounds,
      fitBoundsOptions: { padding: 50 },
    });
    */

    const hash = parseHash();
    if (hash && hash.get('map')) {

      const latLngString = hash.get('map') || '';
      const zlatlng = latLngString.split('/');

      const zoom = zlatlng[0]
      const lat = zlatlng[1]
      const lng = zlatlng[2]

      // mapObject.flyTo({center: [lng, lat], zoom});

    } else if (bounds) {

      // mapObject.fitBounds(bounds, { padding: 50 })

    }

/*    const onMapLoad = () => {
      //hidePoiLayers(map)
      //setMapObject(map)

      mapObject.on('moveend', () => {
        // see: https://github.com/maplibre/maplibre-gl-js/blob/ba7bfbc846910c5ae848aaeebe4bde6833fc9cdc/src/ui/hash.js#L59
        const center = mapObject.getCenter(),
          rawZoom = mapObject.getZoom(),
          zoom = Math.round(rawZoom * 100) / 100,
          // derived from equation: 512px * 2^z / 360 / 10^d < 0.5px
          precision = Math.ceil((zoom * Math.LN2 + Math.log(512 / 360 / 0.5)) / Math.LN10),
          m = Math.pow(10, precision),
          lng = Math.round(center.lng * m) / m,
          lat = Math.round(center.lat * m) / m,
          zStr = Math.ceil(zoom);

        setZLatLngString(`${zStr}/${lat}/${lng}`);
      });
    }*/

    const orienteationchangeHandler = () => {
      mapObject.resize()
    }

    // attach
    //mapObject.on('load', onMapLoad)

    window.addEventListener('orientationchange', orienteationchangeHandler)

    return () => {
      // detach to prevent memory leak
      window.removeEventListener('orientationchange', orienteationchangeHandler)
      //mapObject.off('load', onMapLoad)
    }
  }, [mapObject, props.data])

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
