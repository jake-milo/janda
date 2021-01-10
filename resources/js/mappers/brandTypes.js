import { timeMapper } from "./time"

export const brandTypeMapper = ({ time, variants, ...type }) => {
    type.time = timeMapper(time);

    type.variants = variants.map(({ time, ...variant }) => {
        variant.time = timeMapper(time);

        return variant;
    });

    return type;
};