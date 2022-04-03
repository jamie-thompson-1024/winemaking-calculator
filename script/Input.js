
class Input extends EventTarget{

    inputs;
    value;

    inputCooldownDuration = 500;
    inputLastTimeout;

    min;
    max;

    constructor(querySelector, min, max) {
        super();

        this.inputs = [...document.querySelectorAll(querySelector)];
        this.min = min;
        this.max = max;

        this.inputs.forEach(el => {
            el.addEventListener('input', this.onInput.bind(this));
            el.addEventListener('change', this.onChange.bind(this));
        });
    }

    onInput(inputEv) {
        this.setValue(inputEv.target.value);

        clearTimeout(this.inputLastTimeout);
        this.inputLastTimeout = setTimeout(() => {
            this.change();
        }, this.inputCooldownDuration);
    }

    onChange(changeEv) {
        this.setValue(changeEv.target.value);
        this.change();
    }

    setValue(value) {
        value = value.toString();
        this.value = value.replaceAll(/[^0-9\-,.]/g, '').replaceAll(',', '.');

        let numVal = parseFloat(this.value);
        if(!isNaN(numVal)) {
            if(numVal < this.min)
                this.value = this.min.toString();
            else if(numVal > this.max)
                this.value = this.max.toString();
        }

        this.inputs.forEach(el => {
            el.value = this.value;
        });
    }

    change() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: this
        }));
    }
}

export default Input;
