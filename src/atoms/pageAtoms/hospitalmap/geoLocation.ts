import hospitalOptions from "@lib/commonValue/hospitalOptions";
import keyName from "@lib/commonValue/keyName";
import Cookies from "js-cookie";
import { atom } from "recoil";

const locationCookie = Cookies.get(keyName.location);

const defaultData = {
  latitude: locationCookie
    ? JSON.parse(locationCookie).latitude
    : hospitalOptions.latitude,
  longitude: locationCookie
    ? JSON.parse(locationCookie).longitude
    : hospitalOptions.longitude,
};

// TODO : 캐시된 위치정보가 없을때만 강남역 잡히게 처리해야함

const geoLocationState = atom({
  key: "geoLocationState",
  default: defaultData,
});

export default geoLocationState;