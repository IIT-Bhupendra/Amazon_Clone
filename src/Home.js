import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          src="https://m.media-amazon.com/images/I/71AIF5OxkRL._SX3000_.jpg"
          className="home__image"
          alt=""
        />

        <div className="home__row">
          <Product
            key={Math.random()}
            id="100"
            title="Bionic chip (10.9-inch/27.69 cm, Wi-Fi + Cellular, 64GB) - Sky Blue (4th Generation)"
            image="https://m.media-amazon.com/images/I/71kFzFbiINL._SX679_.jpg"
            price={80900}
            rating={5}
          />
          <Product
            key={Math.random()}
            id="101"
            title="iQOO Z5 5G (Arctic Dawn, 12GB RAM, 256GB Storage) | Snapdragon 778G 5G Processor | 5000mAh Battery | 44W FlashCharge"
            image="https://m.media-amazon.com/images/I/71mCphsCGZL._AC_UY327_QL65_.jpg"
            price={26990}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            key={Math.random()}
            id="102"
            title="(Renewed) Honor 2 BT Watch 2 with Battery- Charcoal Black (14-Days Battery Battery Life_Compatible with Android and iOS)"
            image="https://m.media-amazon.com/images/I/61W4meSdVQL._SX522_.jpg"
            price={10799}
            rating={4}
          />
          <Product
            key={Math.random()}
            id="103"
            title="Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV KD-55X85J (Black) (2021 Model) | with Alexa Compatibility"
            image="https://m.media-amazon.com/images/I/81aAdbBzGTS._AC_UY327_QL65_.jpg"
            price={103990}
            rating={4}
          />
          <Product
            key={Math.random()}
            id="104"
            title="Will: The Sunday Times Bestselling Autobiography"
            image="https://m.media-amazon.com/images/I/91C0eiPBxLL._AC_UY327_FMwebp_QL65_.jpg"
            price={634}
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            key={Math.random()}
            id="105"
            title="PHILIPS Brilliance 499P9H1/75 124.46 cm (49-inch) Curved SuperWide Dual QHD LCD Display with Pop-Up Webcam with Windows Hello"
            image="	https://m.media-amazon.com/images/I/61PnS+zB2QL._AC_UY327_FMwebp_QL65_.jpg"
            price={107959}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
