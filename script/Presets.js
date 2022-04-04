
const yeastPresets = {
    "Custom": {
        tolerance: undefined,
    },
    "Low tolerance": {
        tolerance: 7,
    },
    "Medium tolerance": {
        tolerance: 12,
    },
    "High tolerance": {
        tolerance: 18,
    }
};

const fruitPresets = {
    "Custom": {
        waterContents: undefined,
        sugarContents: undefined,
    },
    "Apple": {
        waterContents: 85,
        sugarContents: 10,
    },
    "Grape": {
        waterContents: 81,
        sugarContents: 16,
    },
    "Peach": {
        waterContents: 89,
        sugarContents: 9,
    },
    "Blackcurrant": {
        waterContents: 82,
        sugarContents: 15,
    },
    "Carrot": {
        waterContents: 90,
        sugarContents: 5,
    }
};

export {
    yeastPresets,
    fruitPresets
};
