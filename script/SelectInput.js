
class SelectInput extends EventTarget {

    optionElements = [];
    selectElements;
    
    options;
    defaultOption;

    selected;

    constructor(querySelector, options, defaultOption) {
        super();

        this.selectElements = [...document.querySelectorAll(querySelector)];

        this.options = options;
        this.defaultOption = defaultOption ?? Object.keys(options)[0];
        this.selected = this.defaultOption;

        this.selectElements.forEach((el, i) => {
            el.addEventListener('change', this.onChange.bind(this));

            this.optionElements[i] = [];
            Object.keys(this.options).forEach(key => {
                let option = document.createElement('option');

                option.selected = key === this.selected;
                option.value = key;
                option.innerText = key;

                this.optionElements[i].push(option);
                el.appendChild(option);
            });
        });
    }

    onChange({ target: { value } }) {
        this.setOption(value);
        this.change();
    }

    setOption(name) {
        this.selected = name;
    }

    getValue() {
        return this.options[this.selected];
    }

    change() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: this
        }));
    }
}

export default SelectInput;
