
import { observer } from "mobx-react-lite";
import { useEffect, useState } from 'react';
import { useRootStore } from '../../store';
import data from '../../api/data';
import './index.less';

interface GoodsItem{
  id: number;
  name: string;
  src: string;
  price: number;
}

function List() {
  const { cartStore } = useRootStore();
  const { addGoods } = cartStore;
  const [list, setList] = useState<GoodsItem[]>([]);

  useEffect(() => {
    setList(data.list);
  }, [])
  //加入购物车
  const handleAddProducts = (value:GoodsItem) => {
    addGoods(value);
    alert(`${value.name}加入购物车成功！`);
  }
  return (
    <div className="grid">
      {
        list.length && list.map((item:GoodsItem,index:number)=>{
          return (
            <div className="grid-item" key={index}>
              <div className="item-img">
                {/* <img src='' alt="" /> */}
              </div>
              <div className="item-info">
                <div className="item-info-left">
                  <div className="item-name">{item.name}</div>
                </div>
                <div className="item-info-right">
                  <div className="item-price">{item.price}</div>
                  <div className="item-addcart-btn" onClick={() => handleAddProducts(item)}>加入购物车</div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default observer(List);