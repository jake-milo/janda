import { toQueryString } from '../../helpers';
import { useApi } from '../../hooks/useApi';
import { patientMapper } from '../../mappers/patients';

export const usePatient = (id, {
    sortLabOrders,
    orderLabOrders,
    sortContactLenses,
    orderContactLenses,
}) => useApi(
    'patient',
    ({ get }) => get(`/api/patients/${id}${toQueryString({
        sortLabOrders,
        orderLabOrders,
        sortContactLenses,
        orderContactLenses,
    })}`),
    patientMapper,
    [id, sortLabOrders, orderLabOrders, sortContactLenses, orderContactLenses],
);
