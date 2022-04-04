
import Brew from "./Brew.js";
import Input from "./Input.js";
import Output from "./Output.js";
import { yeastPresets, fruitPresets } from "./Presets.js";
import SelectInput from "./SelectInput.js";

const brew = new Brew();
console.log(brew);

// Results
let resultantVolume = new Output('.resultant-volume');
let resultantAbv = new Output('.resultant-abv');
let resultantSugar = new Output('.resultant-sugar-total');
let resulantSugarConc = new Output('.resultant-sugar-conc');

brew.addEventListener('updateResults', updateOutputs);

function updateOutputs() {
    let resAbv_percent = brew.resultantAbv_vv * 100;

    resultantVolume.setValue(brew.resultantVolume_L);
    resultantAbv.setValue(isNaN(resAbv_percent) ? undefined : resAbv_percent);
    resultantSugar.setValue(brew.resultantSugar_g);
    resulantSugarConc.setValue(brew.resultantSugarConc_gL);
}

// Yeast
let yeastMaxAbv = new Input('.yeast-abv-tolerance', 0, 100);
let yeastSugarToAbv = new Input('.yeast-sugar-abv', 0);

yeastMaxAbv.addEventListener('change', updateYeast);
yeastSugarToAbv.addEventListener('change', updateYeast);

yeastSugarToAbv.setValue(brew.yeastSugarToAlcRatio_gL_vv);

function updateYeast() {
    brew.setYeast(
        parseFloat(yeastMaxAbv.value) / 100,
        parseFloat(yeastSugarToAbv.value)
    );
}

let yeastPreset = new SelectInput('.yeast-preset', yeastPresets, 'High tolerance');
yeastPreset.addEventListener('change', () => {
    let yeast = yeastPreset.getValue();
    yeastMaxAbv.setValue(yeast['tolerance']);
    yeastMaxAbv.change();
});
yeastPreset.change();

// Fruit
let fruitSugarConc = new Input('.fruit-sugar-conc', 0, 100);
let fruitWaterContents = new Input('.fruit-water-cont', 0, 100);

fruitSugarConc.addEventListener('change', updateFruit);
fruitWaterContents.addEventListener('change', updateFruit);

function updateFruit() {
    brew.setFruit(
        parseFloat(fruitSugarConc.value) / 100,
        parseFloat(fruitWaterContents.value) / 100
    );
}

let fruitPreset = new SelectInput('.fruit-preset', fruitPresets, 'Apple');
fruitPreset.addEventListener('change', () => {
    let fruit = fruitPreset.getValue();
    fruitSugarConc.setValue(fruit['waterContents']);
    fruitSugarConc.change();
    fruitWaterContents.setValue(fruit['sugarContents']);
    fruitWaterContents.change();
});
fruitPreset.change();

// Quantities
let addedFruit = new Input('.added-fruit', 0);
let addedSugar = new Input('.added-sugar', 0);
let addedWater = new Input('.added-water', 0);

addedFruit.addEventListener('change', updateQuantities);
addedSugar.addEventListener('change', updateQuantities);
addedWater.addEventListener('change', updateQuantities);

updateQuantities();

function updateQuantities() {
    brew.setQuantities(
        parseFloat(addedFruit.value),
        parseFloat(addedWater.value),
        parseFloat(addedSugar.value)
    );
}

