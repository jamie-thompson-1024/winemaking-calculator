
import Wine from "./Wine.js";
import Input from "./Input.js";
import Output from "./Output.js";
import { yeastPresets, fruitPresets } from "./Presets.js";
import SelectInput from "./SelectInput.js";

const wine = new Wine();

// Results
let resultantVolume = new Output('.resultant-volume');
let resultantAbv = new Output('.resultant-abv');
let resultantSugar = new Output('.resultant-sugar-total');
let resulantSugarConc = new Output('.resultant-sugar-conc');

wine.addEventListener('updateResults', updateOutputs);

function updateOutputs() {
    let resAbv_percent = wine.resultantAbv_vv * 100;

    resultantVolume.setValue(wine.resultantVolume_L);
    resultantAbv.setValue(isNaN(resAbv_percent) ? undefined : resAbv_percent);
    resultantSugar.setValue(wine.resultantSugar_g);
    resulantSugarConc.setValue(wine.resultantSugarConc_gL);
}

// Yeast
let yeastMaxAbv = new Input('.yeast-abv-tolerance', 0, 100);
let yeastSugarToAbv = new Input('.yeast-sugar-abv', 0);

yeastMaxAbv.addEventListener('change', updateYeast);
yeastSugarToAbv.addEventListener('change', updateYeast);

yeastSugarToAbv.setValue(wine.yeastSugarToAlcRatio_gL_vv);

let yeastPreset = new SelectInput('.yeast-preset', yeastPresets, 'High tolerance');
yeastPreset.addEventListener('change', () => {
    let yeast = yeastPreset.getValue();
    yeastMaxAbv.setValue(yeast['tolerance']);
    wine.setYeast(
        parseFloat(yeastMaxAbv.value) / 100,
        parseFloat(yeastSugarToAbv.value)
    );
});
yeastPreset.change();

function updateYeast() {
    wine.setYeast(
        parseFloat(yeastMaxAbv.value) / 100,
        parseFloat(yeastSugarToAbv.value)
    );
    yeastPreset.setOption('Custom');
}

// Fruit
let fruitSugarConc = new Input('.fruit-sugar-conc', 0, 100);
let fruitWaterContents = new Input('.fruit-water-cont', 0, 100);

fruitSugarConc.addEventListener('change', updateFruit);
fruitWaterContents.addEventListener('change', updateFruit);

let fruitPreset = new SelectInput('.fruit-preset', fruitPresets, 'Apple');
fruitPreset.addEventListener('change', () => {
    let fruit = fruitPreset.getValue();
    fruitSugarConc.setValue(fruit['sugarContents']);
    fruitWaterContents.setValue(fruit['waterContents']);
    wine.setFruit(
        parseFloat(fruitSugarConc.value) / 100,
        parseFloat(fruitWaterContents.value) / 100
    );
});
fruitPreset.change();

function updateFruit() {
    wine.setFruit(
        parseFloat(fruitSugarConc.value) / 100,
        parseFloat(fruitWaterContents.value) / 100
    );
    fruitPreset.setOption('Custom');
}

// Quantities
let addedFruit = new Input('.added-fruit', 0);
let addedSugar = new Input('.added-sugar', 0);
let addedWater = new Input('.added-water', 0);

addedFruit.addEventListener('change', updateQuantities);
addedSugar.addEventListener('change', updateQuantities);
addedWater.addEventListener('change', updateQuantities);

updateQuantities();

function updateQuantities() {
    wine.setQuantities(
        parseFloat(addedFruit.value),
        parseFloat(addedWater.value),
        parseFloat(addedSugar.value)
    );
}

