export const useInitialValues = (brand) => ({
    name: brand ? brand.name : '',
    manufacturer: brand ? brand.manufacturer.id : '',
});
