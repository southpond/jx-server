import ShopModel from "../../models/shopping/shop";
import AddressComponent from "../../prototype/addressComponent";

class Shop extends AddressComponent {
  constructor() {
    super();
  }
  //获取餐馆列表
  async getRestaurants(req, res, next) {
    const {
      latitude,
      longitude,
      offset = 0,
      limit = 20,
      keyword,
      restaurant_category_id,
      order_by,
      extras,
      delivery_mode = [],
      support_ids = [],
      restaurant_category_ids = []
    } = req.query;
  }
}
