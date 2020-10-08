import { useState, useEffect, useCallback, useRef } from 'react';

const yupToValidationErrors = (yupError) => {
    let errors = {};

    if (yupError.inner.length === 0) {
        updateIn(errors, yupError.path, yupError.message)
        return errors
    }

    for (let err of yupError.inner) {
        updateIn(errors, err.path, err.message)
    }

    return errors
}

const updateIn = (obj, path, value) => {
    const pathArray = path.split('.');
    let destinationObject = obj;

    for (let i = 0; i < pathArray.length - 1; i++) {
        if (pathArray[i] in destinationObject === false) {
            destinationObject[pathArray[i]] = {}
        }

        destinationObject = destinationObject[pathArray[i]]
    }

    destinationObject[pathArray[pathArray.length - 1]] = value
  }

const defaultContext = {};
export const useYup = (
  values,
  validationSchema,
  { context = defaultContext, validateOnChange = false } = {},
) => {
    const hasValidated = useRef(false);

    const [errors, setErrors] = useState({})
    const isValid = Object.keys(errors).length === 0

    const validate = useCallback((values) => {
        hasValidated.current = true;

        return validationSchema.validate(values, {
            abortEarly: false,
            context,
        }).then(() => {
            return {};
        }).catch((error) => {
            return yupToValidationErrors(error)
        }).then(newErrors => {
            setErrors(newErrors)
            return {
                errors: newErrors,
                isValid: Object.keys(newErrors).length === 0
            };
        });
    }, [validationSchema, context]);
  
    useEffect(() => {
        if (hasValidated.current && validateOnChange) {
          validate(values);
        }
    }, [values, validateOnChange, validate]);

    const reset = useCallback(() => {
      hasValidated.current = false;
      setErrors({});
    }, []);

    return {
      validate,
      errors,
      isValid,
      reset,
      submitHandler(cb) {
        return async (e) => {
          e.preventDefault();

          const { isValid } = await validate(values);

          if (isValid) {
            cb();
          }
        };
      } 
    }
}