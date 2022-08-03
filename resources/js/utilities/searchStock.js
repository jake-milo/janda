export const searchStock = query =>
    fetch(`/api/stock/search?q=${query}`)
        .then(res => res.json())
        .then(({ data: { contact_lens_types, ...rest } }) => {
            const groupedLensTypes = {};

            contact_lens_types.forEach(type => {
                groupedLensTypes[type.brand.id] = groupedLensTypes[
                    type.brand.id
                ] || {
                    brand: type.brand,
                    types: []
                };

                groupedLensTypes[type.brand.id].types.push(type);
            });

            return {
                data: {
                    ...rest,
                    groupedLensTypes: Object.values(groupedLensTypes)
                }
            };
        });
