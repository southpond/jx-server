import BaseComponent from "./baseComponent";
class AddressComponent extends BaseComponent {
  constructor() {
    super();
    this.tencentkey = "XFVBZ-GRHWS-IVWOW-6GKA2-NIVNQ-H3FVN";
  }
  //获取定位地址
  async guessPosition(req) {
    return new Promise(async (resolve, reject) => {
      let ip;
      const defaultIp = "180.158.102.141";
      if (process.env.NODE_ENV == "development") {
        ip = defaultIp;
      } else {
        try {
          ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
          const ipArr = ip.split(":");
          ip = ipArr[ipArr.length - 1] || defaultIp;
        } catch (e) {
          ip = defaultIp;
        }
      }
      try {
        let result = await this.fetch("http://apis.map.qq.com/ws/location/v1/ip", {
          ip,
          key: this.tencentkey
        });
        if (result.status == 0) {
          const cityInfo = {
            lat: result.result.location.lat,
            lng: result.result.location.lng,
            city: result.result.ad_info.city
          };
          cityInfo.city = cityInfo.city.replace(/市$/, "");
          resolve(cityInfo);
        } else {
          console.log("定位失败", result);
          reject("定位失败");
        }
      } catch (err) {}
    });
  }
  //搜索地址
  async searchPlace(keyword, cityName, type = "search") {
    try {
      const resObj = await this.fetch("https://apis.map.qq.com/ws/place/v1/search", {
        key: this.tencentkey,
        keyword: encodeURIComponent(keyword),
        boundary: "region(" + encodeURIComponent(cityName) + ",0)"
      });
      if (resObj.status == 0) {
        return resObj;
      } else {
        throw new Error("搜索位置信息失败");
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  //测量距离
  async getDistance(from, to, type) {
    try {
      let res = await this.fetch("https://apis.map.qq.com/ws/distance/v1", {
        mode: "driving",
        key: this.tencentkey,
        from,
        to
      });
      if (res.status == 0) {
        const positionArr = [];
        let timevalue;
        res.result.elements.forEach(item => {
          timevalue = parseInt(item.duration) + 1200;
          let durationtime = Math.ceil((timevalue % 3600) / 60) + "分钟";
          if (Math.floor(timevalue / 3600)) {
            durationtime = Math.floor(timevalue / 3600) + "小时" + durationtime;
          }
          let distance = 
          positionArr.push({
            distance: item.distance,
            order_lead_time: durationtime
          });
        });
        if (type == "tiemvalue") {
          return timevalue;
        } else {
          return positionArr;
        }
      }
    } catch (error) {}
  }
}

export default AddressComponent;
