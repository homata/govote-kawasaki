import React from "react";
// import { FaTwitter, FaInstagram, FaHome } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';

import './Links.scss'

type Props = {
  data: Pwamap.ShopData;
};

const noop = (e: React.MouseEvent) => {
  e.stopPropagation()
}

const Content = (props: Props) => {

  return (
    <div className="links">
      {props.data['公式サイト']?<div className="link"><a href={props.data['公式サイト']}><FaHome onClick={noop} size="20px" /></a></div>:''}
    </div>
  );
};

export default Content;
