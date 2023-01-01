
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useRootStore } from '../../store';
import './index.less';

interface CartGoodsItem{
  id: number;
  name: string;
  src: string;
  price: number;
  count: number;
}

function ShoppingCart() {
  const { cartStore } = useRootStore();
  const { cartList, deleteGoods, totalPrice, showCart } = cartStore;
  const [showPrice, setShowPrice] = useState<boolean>(false);

  const handleDelete = (value: CartGoodsItem) => {
    const confirmed = confirm(`确认要将${value.name}从购物车中删除吗？`);
    if (confirmed) {
      deleteGoods(value.id);
    }
  }
  return (
    <div className="cart-layout" style={{'display':showCart?'block':'none'}}>
      <div className="order-content">
        {cartList.length ? cartList.map((item:CartGoodsItem, index:number) => {
          return (
            <div className="item-wrap" key={index}>
              <span className="item-name">{item.name}</span>
              <span className="item-price">{item.price} * {item.count}</span>
              <span className="item-del" onClick={() => handleDelete(item)}>删除</span>
            </div>
          )
        }) :
          <div className="cart-empty">
            <div>暂无商品...</div>
          </div>
        }
      </div>
      <div className="float-bar" onClick={() => setShowPrice(true)}>
        <span>购买</span>
        {showPrice?`（总计：${totalPrice}）`:''}
      </div>
    </div>
  )
}
export default observer(ShoppingCart);