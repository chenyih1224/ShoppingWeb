import { action, makeObservable, observable, computed } from 'mobx';
import math from '../utils/math';

class CartStore {
  constructor () {
    this.cartList = [];//购物车中已加购的商品
    this.showCart = false;//鼠标悬浮展示购物车列表
    makeObservable(this, {
      cartList: observable,
      showCart: observable,
      addGoods: action.bound,
      deleteGoods: action.bound,
      setShowCart: action.bound,
      totalPrice: computed
    })
  }

  //添加商品到购物车
  addGoods(good) {
    let checked = this.cartList.find(item => item.id === good.id);
    if (checked) {
      checked.count++;
    } else {
      this.cartList.push({
        ...good,
        count:1
      })
    }
  }
  //删除购物车商品
  deleteGoods(id) {
    this.cartList.forEach((item,index) => {
      if (item.id === id) {
        this.cartList.splice(index, 1);
        return;
      }
    });
  }
  //设置是否展示购物车列表
  setShowCart(value) {
    this.showCart = value;
  }
  //计算总价
  get totalPrice () {
    if (!this.cartList.length) return 0;
    return this.cartList.reduce((total, next) => {
      return Number(math.add(total, Number(math.multiply(next.price, next.count))));
    }, 0)
  }
}

export default CartStore;
