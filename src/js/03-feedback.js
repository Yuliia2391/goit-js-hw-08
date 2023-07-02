import throttle from "lodash.throttle";

const LOCAL_STORAGE_KEY = 'feedback-form-state';

let formData = {};
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInputs, 500));

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.target.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    console.log(formData);
};

function onFormInputs(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
};

function populateInputs() {
    const savedInputs = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedInputs) {
        formData = JSON.parse(savedInputs);

        for (const key in formData) {
            // console.log(form.elements);
            form.elements[key].value = formData[key];
        }
    }
};

populateInputs();