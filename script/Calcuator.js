
class Brew extends EventTarget{
    static default_sugarToAlcMin_gL_vv = 16.5;
    static default_sugarToAlcMax_gL_vv = 18;
    static default_yeastAbvMax_vv = 0.13;
    static default_fruitSugar_gg = 0.1;
    static default_fruitWaterContents_mL_g = 0.85;

    yeastSugarToAlcRatioMin_gL_vv = Brew.default_sugarToAlcMin_gL_vv;
    yeastSugarToAlcRatioMax_gL_vv = Brew.default_sugarToAlcMax_gL_vv;
    yeastAbvMax_vv = Brew.default_yeastAbvMax_vv;

    fruitSugarConcentration_gg = Brew.default_fruitSugar_gg;
    fruitWaterContents_mL_g = Brew.default_fruitWaterContents_mL_g;
    
    addedFruit_g;
    addedWater_L;
    addedSugar_g;

    resultantVolume_L;
    resultantAbv_vv;
    resultantSugar_g;
    resultantSugarConc_gL;

    setYeast(
        abvMax_vv= Brew.default_yeastAbvMax_vv, 
        sugarToAlcMin_gL_vv = Brew.default_sugarToAlcMin_gL_vv, 
        sugarToAlcMax_gL_vv = Brew.default_sugarToAlcMax_gL_vv)
    {
        this.yeastAbvMax_vv = abvMax_vv;
        this.yeastSugarToAlcRatioMin_gL_vv = sugarToAlcMin_gL_vv;
        this.yeastSugarToAlcRatioMax_gL_vv = sugarToAlcMax_gL_vv;

        this.updateResults();
    }

    setFruit(
        sugarConcentration_gg = Brew.default_fruitSugar_gg, 
        waterContents_mL_g = Brew.default_fruitWaterContents_mL_g) 
    {
        this.fruitSugarConcentration_gg = sugarConcentration_gg;
        this.fruitWaterContents_mL_g = waterContents_mL_g;

        this.updateResults();
    }

    setQuantities(
        addedFruit_g,
        addedWater_L,
        addedSugar_g) 
    {
        this.addedFruit_g = addedFruit_g;
        this.addedWater_L = addedWater_L;
        this.addedSugar_g = addedSugar_g;

        this.updateResults();
    }

    updateResults() {
        if(typeof this.addedFruit_g === 'number', typeof this.addedSugar_g === 'number', typeof this.addedWater_L === 'number') {
            this.resultantVolume_L = this.addedWater_L + (this.addedFruit_g * this.fruitWaterContents_mL_g) * 0.001;

            let sugarPreFerment_g = this.addedSugar_g + (this.addedFruit_g * this.fruitSugarConcentration_gg);
            let sugarPreFerment_gL = sugarPreFerment_g / this.resultantVolume_L;

            let avgSugarToAbv_gL_vv = (this.yeastSugarToAlcRatioMax_gL_vv + this.yeastSugarToAlcRatioMin_gL_vv) / 2;
            let tempAbvFromSugar_vv = sugarPreFerment_gL / (avgSugarToAbv_gL_vv * 100);

            if(tempAbvFromSugar_vv > this.yeastAbvMax_vv) {
                let usedSugarConc_gL = this.yeastAbvMax_vv * avgSugarToAbv_gL_vv * 100;
                console.log(usedSugarConc_gL);
                let usedSugar_g = usedSugarConc_gL * this.resultantVolume_L;
                console.log(usedSugar_g);

                this.resultantSugar_g = sugarPreFerment_g - usedSugar_g;
                this.resultantSugarConc_gL = this.resultantSugar_g / this.resultantVolume_L;
                this.resultantAbv_vv = this.yeastAbvMax_vv;
            } else {
                this.resultantSugar_g = 0;
                this.resultantSugarConc_gL = 0;
                this.resultantAbv_vv = tempAbvFromSugar_vv;
            }

            this.dispatchEvent(new Event('updateResults'));
        } else {
            this.resultantVolume_L = undefined;
            this.resultantSugar_g = undefined;
            this.resultantSugarConc_gL = undefined;
            this.resultantAbv_vv = undefined;

            this.dispatchEvent(new Event('updateResults'));
        }
    }

}

export default Brew;
