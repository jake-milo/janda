export const useInitialValues = (type) => ({
    name: type ? type.name : '',
    buy: type ? type.buy : '',
    sell: type ? type.sell : '',
    variants: type ? type.variants : [],
});
