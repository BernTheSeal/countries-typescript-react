interface countryPropertiesType {
  flag: string;
  name: string;
}

export interface flagImgType {
  id: string;
  left?: string;
  right?: string;
  animationDuration: string;
  width: number;
  height: number;
  zIndex: number;
  countryProperties: countryPropertiesType;
  timeoutId: null | any;
}
