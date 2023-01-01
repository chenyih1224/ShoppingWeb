import { useRootStore } from '../../store';
import './index.less';
const Header = () => {
  const { cartStore } = useRootStore();
  const { setShowCart } = cartStore;
  const handleMouseEnter = () => {
    setShowCart(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowCart(false);
    },3000)
  };
    return (
      <div className="header">
        <div className="web-name">购物天堂</div>
        <div id='show-cart' className="cart-btn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>购物车</div>
      </div>
    )
}
export default Header;