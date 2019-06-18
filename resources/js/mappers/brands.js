import { timeMapper } from "./time";

export const brandsMapper = (brands) => {
    const grouped = {};

    const isLetter = char => /[a-z]/i.test(char);

    const determineGroup = char => /\d/.test(char) ? '0-9' : '&';

    brands.forEach((brand) => {
        const firstChar = brand.name.charAt(0).toLowerCase();
        const group = isLetter(firstChar)
            ? firstChar
            : determineGroup(firstChar);

        grouped[group] = grouped[group] || [];
        grouped[group].push(brandMapper(brand));
    });

    return Object.entries(grouped)
        .map(([key, items]) => ({
            label: key,
            brands: items,
        }));
};

export const brandMapper = ({ type, time, ...rest }) => {
    const brand = { ...rest };

    brand.time = timeMapper(time);

    if (type) {
        brand.type = type;
    }

    return brand;
};
