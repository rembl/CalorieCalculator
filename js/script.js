import { WEIGHT_CONSTANT, HEIGHT_CONSTANT, AGE_CONSTANT, NUMBER_REGEX,
    ACTIVITY_COEFFS, SEX_COEFFS, GAIN_LOSS_COEFFS} from './constants.js';

const form = document.querySelector('.counter__form');
const genderInputMale = form.querySelector('#gender-male');
const ageInput = form.querySelector('#age');
const heightInput = form.querySelector('#height');
const weightInput = form.querySelector('#weight');
const activityMinInput = document.querySelector('#activity-minimal');
const activityInputs = form.querySelector('.radios-group');
const buttonSubmit = form.querySelector('.form__submit-button');
const buttonReset = form.querySelector('.form__reset-button');
const result = document.querySelector('.counter__result');
const resultList = document.querySelector('.counter__result-list');

let activityCoefficient = ACTIVITY_COEFFS.get('min');

const disableSubmitButton = () => {
    buttonSubmit.disabled =
        !(NUMBER_REGEX.test(ageInput.value) &&
            NUMBER_REGEX.test(heightInput.value) &&
            NUMBER_REGEX.test(weightInput.value));
};

const disableResetButton = () => {
    buttonReset.disabled =
        (ageInput.value === '' &&
            heightInput.value === '' &&
            weightInput.value === '');
};

ageInput.addEventListener('keyup', () => {
    disableSubmitButton();
    disableResetButton();
});

heightInput.addEventListener('keyup', () => {
    disableSubmitButton();
    disableResetButton();
});

weightInput.addEventListener('keyup', () => {
    disableSubmitButton();
    disableResetButton();
});

activityInputs.addEventListener('change', (evt) => {
    evt.preventDefault();
    activityCoefficient = ACTIVITY_COEFFS.get(form.elements.activity.value);
});

const calculateCalories = () => {
    return Math.round(activityCoefficient *
        ((WEIGHT_CONSTANT * weightInput.value) +
        (HEIGHT_CONSTANT * heightInput.value) -
        (AGE_CONSTANT * ageInput.value) +
        SEX_COEFFS.get(form.elements.gender.value)));
};

buttonSubmit.addEventListener('click', (evt) => {
    evt.preventDefault();
    result.classList.remove('counter__result--hidden');
    const calories = calculateCalories();
    resultList.querySelector('#calories-norm').textContent = calories.toString();
    resultList.querySelector('#calories-minimal').textContent = Math.round(calories * GAIN_LOSS_COEFFS.get('loss')).toString();
    resultList.querySelector('#calories-maximal').textContent = Math.round(calories * GAIN_LOSS_COEFFS.get('gain')).toString();
});

const reset = () => {
    result.classList.add('counter__result--hidden');
    genderInputMale.checked = true;
    ageInput.value = '';
    heightInput.value = '';
    weightInput.value = '';
    activityCoefficient = ACTIVITY_COEFFS.get('min');
    buttonSubmit.disabled = true;
    buttonReset.disabled = true;
    activityInputs.querySelectorAll('input').forEach((element) => {
        element.checked = false;
    });
    activityMinInput.checked = true;
};

buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    reset();
});

disableResetButton();
disableSubmitButton();
reset();