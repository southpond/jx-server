import AddressComponent from "../../prototype/addressComponent";
import Cities from "../../models/v1/cities";
import CityHandle from "./cities";

class SearchPlace extends AddressComponent {
    constructor() {
        super();
        this.search = this.search.bind(this);
    }
    async search(req, res, next) {
        let { type = "search", city_id, keyword } = req.query;

        
        const resObj=this.searchPlace(keyword, name, type)
    }
}
