const WEIGHT_CONSTANT = 10;

const HEIGHT_CONSTANT = 6.25;

const AGE_CONSTANT = 5;

const NUMBER_REGEX = /([1-9]|[1-9][0-9]|[1-9][0-9][0-9])/;

const ACTIVITY_COEFFS = new Map([
    ['min', 1.2],
    ['low', 1.375],
    ['medium', 1.55],
    ['high', 1.725],
    ['max', 1.9]
]);

const SEX_COEFFS = new Map([
    ['female', -161],
    ['male', 5]
]);

const GAIN_LOSS_COEFFS = new Map([
    ['gain', 1.15],
    ['loss', 0.85]
]);

export { WEIGHT_CONSTANT, HEIGHT_CONSTANT, AGE_CONSTANT, NUMBER_REGEX,
    ACTIVITY_COEFFS, SEX_COEFFS, GAIN_LOSS_COEFFS};