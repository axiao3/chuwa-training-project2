import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCartAction } from "../../app/cartSlice";
// import { logOutUser } from "../../app/userSlice";

export default function Header(props) {
  const dispatch = useDispatch();
  // const { user, isAuthenticated } = useSelector((state) => state.user);
  const isAuthenticated = false;
  const [NavOpen, setNavOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (Object.keys(user).length > 0) {
  //     dispatch(fetchCartAction());
  //   }
  // }, []);

  // const cart = useSelector((state) => state.cart);

  const handleSignIn = () => {
    window.location.href = "/sign-in";
  };

  const handleLogOut = () => {
    // dispatch(logOutUser());
    window.location.href = "/sign-in";
  };

  const handleCart = () => {
    // if (Object.keys(user).length > 0) {
    //   setCartOpen((prevCartOpen) => !prevCartOpen);
    //   props.setBlur((prevBlur) => !prevBlur);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate(`/items?name=${productName}`);
    // window.location.href = `/items?name=${productName}`;
  };

  return (
    <header>
      <nav>
        <p
          className="nav-item"
          style={{
            cursor: "pointer",
            margin: "0",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          M<span className="hidden">anagement</span>
          <span style={{ marginLeft: "0.2rem", fontSize: "0.8rem" }}>
            Chuwa
          </span>
        </p>
        <form className="nav-item" onSubmit={handleSubmit}>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div className="nav-item">
          {isAuthenticated ? (
            <button onClick={handleLogOut}>
              <FontAwesomeIcon icon={faUser} />
              <p className="hidden" id="display">
                Log Out
              </p>
            </button>
          ) : (
            <button onClick={handleSignIn}>
              <FontAwesomeIcon icon={faUser} />
              <p className="hidden" id="display">
                Sign In
              </p>
            </button>
          )}

          {isAuthenticated ? ( //and is hr?
            <button>Menu</button>
          ) : null}
        </div>
      </nav>
      {/* {cartOpen ? <Cart setCartOpen={handleCart} /> : null} */}
    </header>
  );
}
