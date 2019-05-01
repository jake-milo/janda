import { timeMapper } from './time';

export const contactLensBrandMapper = ({ type, time, ...rest }) => {
    const brand = { ...rest };

    // brand.time = timeMapper(time);

    if (type) {
        brand.type = type;
        // Create type mapper
    }

    return brand;
};

export const contactLensBrandsMapper = brands => brands.map(b => contactLensBrandMapper(b));
