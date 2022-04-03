
import Brew from "./Calcuator.js";
import Input from "./Input.js";
import Output from "./Output.js";

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

yeastMaxAbv.setValue(brew.yeastAbvMax_vv * 100);
yeastSugarToAbv.setValue((
    brew.yeastSugarToAlcRatioMax_gL_vv + 
    brew.yeastSugarToAlcRatioMin_gL_vv) / 2);

function updateYeast() {
    brew.setYeast(
        parseFloat(yeastMaxAbv.value) / 100,
        parseFloat(yeastSugarToAbv.value),
        parseFloat(yeastSugarToAbv.value)
    );
}

// Fruit
let fruitSugarConc = new Input('.fruit-sugar-conc', 0, 100);
let fruitWaterContents = new Input('.fruit-water-cont', 0, 100);

fruitSugarConc.addEventListener('change', updateFruit);
fruitWaterContents.addEventListener('change', updateFruit);

fruitSugarConc.setValue(brew.fruitSugarConcentration_gg * 100);
fruitWaterContents.setValue(brew.fruitWaterContents_mL_g * 100);

function updateFruit() {
    brew.setFruit(
        parseFloat(fruitSugarConc.value) / 100,
        parseFloat(fruitWaterContents.value) / 100
    );
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
    brew.setQuantities(
        parseFloat(addedFruit.value),
        parseFloat(addedWater.value),
        parseFloat(addedSugar.value)
    );
}

