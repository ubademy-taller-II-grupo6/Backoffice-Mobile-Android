import { LocationPermissionResponse } from 'expo-location';
import { PermissionResponse } from 'expo-modules-core';

export interface PermissionsState{
    locationStatus: any
}
//blocked granted
export const permissionsInitState:PermissionsState = {
    locationStatus:"denied",
}

export interface LocationInterface{
    latitude:number,
    longitude:number
}

export interface PermissionContextProps {
    permission:PermissionsState,
    askLocationPermission:() => void,
    checkLocationPermission:() => void,
    listenerPermissionLocations:()=>void,
    setPermissionObject:(status:any)=>void
}

// export const PermissionContextProps{}