import {useGeolocation} from 'react-use';

export default function useGeoLocation () {
    const state = useGeolocation()
    return state

}