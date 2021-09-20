import Joi from 'joi';
import { parse, decode } from '@util';
import { BadRequestPubSubError } from '@application/core';
import { pubSubSchema } from '@infrastructure/api/routers/schemas';

export const validatePubSub = <T>(
    schema: Joi.ObjectSchema | Joi.ArraySchema,
    dataToValidate: Record<string, unknown>,
): T => {
    const { error, value } = pubSubSchema.validate(dataToValidate, { convert: true });
    if (error) throw new BadRequestPubSubError(error.message, '');
    const {
        message: { data, publishTime },
    } = value;
    const parsedData = parse(decode(data));
    const response = schema.validate(parsedData);
    if (response.error) throw new BadRequestPubSubError(response.error.message, '');
    return { ...response.value, fecha_hora_accion: new Date(publishTime) };
};

export const validateData = <T>(schema: Joi.ObjectSchema, dataToValidate: Record<string, unknown>): T => {
    const { error, value } = schema.validate(dataToValidate, { convert: true });
    if (error) throw new BadRequestPubSubError(error.message, 'Error en la validación de campos de data y publishTime');
    return value;
};
