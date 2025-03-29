import { getCode } from "country-list";

export default function getCountryCode(countryName) {
	const isoCode = getCode(countryName);
	return isoCode;
}
