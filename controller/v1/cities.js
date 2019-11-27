import Cities from "../../models/v1/cities";
import AddressComponent from "../../prototype/addressComponent";

class CityHandle extends AddressComponent {
  constructor() {
    super();
    this.getCity = this.getCity.bind(this);
    this.getCityName = this.getCityName.bind(this);
  }

  async getCity(req, res, next) {
    const type = req.query.type;
    let cityInfo;
    try {
      switch (type) {
        case "guess":
          const city = await this.getCityName(req);
          cityInfo = await Cities.cityGuess(city);
          break;
        case "hot":
          cityInfo = await Cities.cityHot();
          break;
        case "group":
          cityInfo = await Cities.cityGroup();
          break;
      }
      res.send(cityInfo);
    } catch (e) {
      res.send({
        name: "ERROR_DATA",
        message: "获取数据失败"
      });
    }
  }

  async getCityById(req, res, next){
		const cityid = req.params.id;
		if (isNaN(cityid)) {
			res.send({
				name: 'ERROR_PARAM_TYPE',
				message: '参数错误',
			})
			return
		}
		try{
			const cityInfo = await Cities.getCityById(cityid);
			res.send(cityInfo);
		}catch(err){
			res.send({
				name: 'ERROR_DATA',
				message: '获取数据失败',
			});
		}
	}

  async getCityName(req, res, next) {
    /* try {
      const cityInfo = await this.guessPosition(req);
      return "shanghai";
    } catch (e) {} */
    /* const cityInfo = await this.guessPosition(req);
    res.send(cityInfo); */
    return "shanghai";
  }
}

export default new CityHandle();
