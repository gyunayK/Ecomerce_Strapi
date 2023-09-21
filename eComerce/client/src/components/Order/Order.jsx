import { useState } from "react";
import "./Order.scss";

function Order({ user }) {
  const [oders, setOders] = useState([...user.orders]);

  console.log(oders);

  return (
    <div className="orderContainer">
      <div className="oder">
        <div className="oderTop">
          <h1>Completed</h1>
          <div className="oderTopRight">
            <div>
              <p>Oder Date: May 9, 2022</p>
              <p>Oder ID: 23131231231232</p>
            </div>
            <div>
              <button>Order details</button>
            </div>
          </div>
        </div>
        <div className="oderBot">
          <div className="imgContainer">
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
          </div>
          <div className="orderBotRight">
            <h2>Total: US 106.50</h2>
            <button className="addToCartBTN">Add to cart</button>
            <button className="deleteBTN"> Delete</button>
          </div>
        </div>
      </div>
      <div className="oder">
        <div className="oderTop">
          <h1>Completed</h1>
          <div className="oderTopRight">
            <div>
              <p>Oder Date: May 9, 2022</p>
              <p>Oder ID: 23131231231232</p>
            </div>
            <div>
              <button>Order details</button>
            </div>
          </div>
        </div>
        <div className="oderBot">
          <div className="imgContainer">
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
          </div>
          <div className="orderBotRight">
            <h2>Total: US 106.50</h2>
            <button className="addToCartBTN">Add to cart</button>
            <button className="deleteBTN"> Delete</button>
          </div>
        </div>
      </div>
      <div className="oder">
        <div className="oderTop">
          <h1>Completed</h1>
          <div className="oderTopRight">
            <div>
              <p>Oder Date: May 9, 2022</p>
              <p>Oder ID: 23131231231232</p>
            </div>
            <div>
              <button>Order details</button>
            </div>
          </div>
        </div>
        <div className="oderBot">
          <div className="imgContainer">
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
          </div>
          <div className="orderBotRight">
            <h2>Total: US 106.50</h2>
            <button className="addToCartBTN">Add to cart</button>
            <button className="deleteBTN"> Delete</button>
          </div>
        </div>
      </div>
      <div className="oder">
        <div className="oderTop">
          <h1>Completed</h1>
          <div className="oderTopRight">
            <div>
              <p>Oder Date: May 9, 2022</p>
              <p>Oder ID: 23131231231232</p>
            </div>
            <div>
              <button>Order details</button>
            </div>
          </div>
        </div>
        <div className="oderBot">
          <div className="imgContainer">
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
          </div>
          <div className="orderBotRight">
            <h2>Total: US 106.50</h2>
            <button className="addToCartBTN">Add to cart</button>
            <button className="deleteBTN"> Delete</button>
          </div>
        </div>
      </div>
      <div className="oder">
        <div className="oderTop">
          <h1>Completed</h1>
          <div className="oderTopRight">
            <div>
              <p>Oder Date: May 9, 2022</p>
              <p>Oder ID: 23131231231232</p>
            </div>
            <div>
              <button>Order details</button>
            </div>
          </div>
        </div>
        <div className="oderBot">
          <div className="imgContainer">
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
            <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
          </div>
          <div className="orderBotRight">
            <h2>Total: US 106.50</h2>
            <button className="addToCartBTN">Add to cart</button>
            <button className="deleteBTN"> Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
