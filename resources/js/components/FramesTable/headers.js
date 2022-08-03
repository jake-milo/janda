export const BRAND = "Brand";
export const NAME = "Name";
export const PRICE = "Price";
export const CODE = "Code";
export const EYESIZE = "Eyesize";
export const DBL = "DBL";
export const COLOR = "Color";
export const YEAR = "Year";
export const QUANTITY = "Quantity";
export const ACTIONS = "";

export const headers = {
    [NAME]: "normal",
    [PRICE]: "normal",
    [CODE]: "normal",
    [EYESIZE]: "normal",
    [DBL]: "normal",
    [COLOR]: "normal",
    [YEAR]: "normal",
    [QUANTITY]: ["normal", true],
    [ACTIONS]: "thin"
};

export const headersWithBrand = {
    [BRAND]: "normal",
    ...headers
};

export const sortable = {
    [NAME]: "name",
    [PRICE]: "sell",
    [CODE]: "buy",
    [YEAR]: "year"
};
