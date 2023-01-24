import throttle from "lodash.throttle ";

const STORAGE_KEY = 'feedback-form-state';

const feedbackFormData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

const refs = {
    form: document.querySelector('.js-feedback-form'),
    input: document.querySelector('.js-feedback-form input'),
    textarea:document.querySelector('.js-feedback-form textarea'),
};


refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextInput, 500));

textOutput();

function onFormSubmit(e) {
    e.preventDefault();
    console.log(feedbackFormData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    feedbackFormData.email = '';
    feedbackFormData.message = '';
}

function onTextInput(e) {
        if (e.target.name == 'email') {
            feedbackFormData.email = e.target.value;
        }
        if (e.target.name == 'message') {
            feedbackFormData.message = e.target.value;
        }
    
 
    const text = JSON.stringify(feedbackFormData);
    localStorage.setItem(STORAGE_KEY, text);
    
}

function textOutput() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(saved);
    if (saved) {
        refs.input.value = parsed.email;
        refs.textarea.value = parsed.message;
    }
}
