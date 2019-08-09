import { timeMapper } from './time';
import { brandsMapper } from './brands';

export const manufacturerMapper = ({ time, brands, ...rest }) => {
    const manufacturer = { ...rest };

    manufacturer.time = timeMapper(time);

    if (brands) {
        manufacturer.brands = brandsMapper(brands, false);
    }

    return manufacturer;
};

export const manufacturersMapper = manufacturers => manufacturers.map(m => manufacturerMapper(m));
