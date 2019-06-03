import * as yup from 'yup';
import moment from 'moment';

export const momentSchema = yup.mixed()
    .test('is-moment', '${path} is not a moment instance!', v => moment.isMoment(v))

export const nullableMomentSchema = yup.mixed()
    .test('is-moment', '${path} is not a moment instance!', v => v ? moment.isMoment(v) : true)