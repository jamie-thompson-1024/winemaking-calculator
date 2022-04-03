
class Output {

    outputs;
    dp;
    defaultValue;
    value;

    constructor(querySelector, defaultValue = '~', dp = 2) {
        this.outputs = [...document.querySelectorAll(querySelector)];
        this.defaultValue = defaultValue;
        this.dp = dp;
        this.setValue();
    }

    setValue(value) {
        if(value) {
            this.value = value.toFixed(this.dp).replaceAll(/\.?(0*)$/g, '');
        }else
            this.value = this.defaultValue;

        this.outputs.forEach(output => {
            output.innerText = this.value;
        })
    }
}

export default Output;
