import MainNeuron from "./classes/main_neuron.js";
import InputNeuron from "./classes/input_neuron.js";
import BiasNeuron from "./classes/bias_neuron.js";
import OutputNeuron from "./classes/output_neuron.js";
import AxonLine from "./classes/axon_line.js";
import InputGrid from "./classes/input_grid.js";

// Canvas and global drawing context
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 640;

console.log(context);

// Objects
const input1 = new InputNeuron(context, {
    x: 350,
    y: 200,
    sprite: "./assets/images/input_1.png",
    offsetX: 80,
    offsetY: 50,
    value: 0,
    weight: 6.4,
});
const input2 = new InputNeuron(context, {
    x: 350,
    y: 360,
    sprite: "./assets/images/input_2.png",
    offsetX: 80,
    offsetY: 50,
    value: 0,
    weight: -5,
});
const input3 = new InputNeuron(context, {
    x: 350,
    y: 520,
    sprite: "./assets/images/input_3.png",
    offsetX: 80,
    offsetY: 50,
    value: 0,
    weight: 0,
});
const biasNeuron = new BiasNeuron(context, {
    x: 620,
    y: 100,
    sprite: "./assets/images/bias_node.png",
    offsetX: 80,
    offsetY: 50,
    value: 1,
});
const outputNeuron = new OutputNeuron(context, {
    x: 950,
    y: 360,
    sprite: "./assets/images/output_node.png",
    offsetX: 50,
    offsetY: 50,
});
const mainNeuron = new MainNeuron(context, {
    x: 650,
    y: 360,
    sprite: "./assets/images/main_node.png",
    offsetX: 75,
    offsetY: 50,
})
mainNeuron.addInput(input1);
mainNeuron.addInput(input2);
mainNeuron.addInput(input3);
mainNeuron.addBias(biasNeuron);
mainNeuron.addOutput(outputNeuron);
const axon1 = new AxonLine(context, {
    startX: input1.position.x,
    startY: input1.position.y,
    endX: mainNeuron.position.x,
    endY: mainNeuron.position.y,
    getValue: () => input1.weight,
    range: [-10, 10],
    sectionLength: 20,
    gap: 10,
    animationSpeed: 1,
    weighted: true,
});
const axon2 = new AxonLine(context, {
    startX: input2.position.x,
    startY: input2.position.y,
    endX: mainNeuron.position.x,
    endY: mainNeuron.position.y,
    getValue: () => input2.weight,
    range: [-10, 10],
    sectionLength: 20,
    gap: 10,
    animationSpeed: 1,
    weighted: true,
});
const axon3 = new AxonLine(context, {
    startX: input3.position.x,
    startY: input3.position.y,
    endX: mainNeuron.position.x,
    endY: mainNeuron.position.y,
    getValue: () => input3.weight,
    range: [-10, 10],
    sectionLength: 20,
    gap: 10,
    animationSpeed: 1,
    weighted: true,
});
const biasAxon = new AxonLine(context, {
    startX: biasNeuron.position.x,
    startY: biasNeuron.position.y,
    endX: biasNeuron.position.x + 1,
    endY: mainNeuron.position.y,
    getValue: () => biasNeuron.getValue(),
    range: [-10, 10],
    sectionLength: 20,
    gap: 10,
    animationSpeed: 1,
    weighted: true,
});
const outputAxon = new AxonLine(context, {
    startX: mainNeuron.position.x,
    startY: mainNeuron.position.y,
    endX: outputNeuron.position.x,
    endY: outputNeuron.position.y,
    getValue: () => outputNeuron.getValue(),
    range: [-1, 1],
    sectionLength: 0,
    gap: 0,
    animationSpeed: 1,
    weighted: false,
});
const inputAxon1 = new AxonLine(context, {
    startX: 0,
    startY: 0,
    endX: input1.position.x,
    endY: input1.position.y,
    getValue: () => -0.5,
    range: [-1, 1],
    sectionLength: 20,
    gap: 10,
    animationSpeed: 1.3,
    weighted: true,
})
const inputAxon2 = new AxonLine(context, {
    startX: 0,
    startY: 0,
    endX: input2.position.x,
    endY: input2.position.y,
    getValue: () => -0.5,
    range: [-1, 1],
    sectionLength: 20,
    gap: 10,
    animationSpeed: 1.3,
    weighted: true,
})
const inputAxon3 = new AxonLine(context, {
    startX: 0,
    startY: 0,
    endX: input3.position.x,
    endY: input3.position.y,
    getValue: () => -0.5,
    range: [-1, 1],
    sectionLength: 20,
    gap: 10,
    animationSpeed: 1.3,
    weighted: true,
})
const inputGrid = new InputGrid(context, {
    x: 65,
    y: 100,
    width: 150,
    columns: 2,
    childAspectRatio: 1,
    gap: 40,
});

// Define rendering order (layers)
const RENDER_PRORITY = [inputAxon1, inputAxon2, inputAxon3, inputGrid, axon1, axon2, axon3, biasAxon, outputAxon, input1, input2, input3, biasNeuron, mainNeuron, outputNeuron];

// Register events
canvas.onmousemove = function(args) {
    var mousePos = getMousePosition(this.getBoundingClientRect(), args.clientX, args.clientY);
    RENDER_PRORITY.forEach(instance => {
        if (typeof(instance.onMouseMove) == "function")
        {
            instance.onMouseMove(mousePos);
        }
    });
}

function getMousePosition(clientRect, clientX, clientY) {
    return {
        x: clientX - clientRect.left,
        y: clientY - clientRect.top,
    }
}

// --- MAIN ---
export function main() {
    context.font = "40px UnicaOne";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.fillText("R", input1.position.x, input1.position.y - 60);
    context.fillText("G", input2.position.x, input2.position.y - 60);
    context.fillText("B", input3.position.x, input3.position.y - 60);
    context.fillText("INPUTS", 140, 70);

    let inputItem = inputGrid.getItem(0);

    inputAxon1.positionStart.x = inputItem.position.x + inputItem.size.width / 2;
    inputAxon1.positionStart.y = inputItem.position.y + inputItem.size.width / 2;
    inputAxon2.positionStart.x = inputItem.position.x + inputItem.size.width / 2;
    inputAxon2.positionStart.y = inputItem.position.y + inputItem.size.width / 2;
    inputAxon3.positionStart.x = inputItem.position.x + inputItem.size.width / 2;
    inputAxon3.positionStart.y = inputItem.position.y + inputItem.size.width / 2;

    input1.value = inputItem.data[0];
    input2.value = inputItem.data[1];
    input3.value = inputItem.data[2];

    context.font = "30px Abel";
    context.fillText(axon1.value, (axon1.positionEnd.x + axon1.positionStart.x) / 2 + 20, (axon1.positionEnd.y + axon1.positionStart.y) / 2 - 30);
    context.fillText(axon2.value, (axon2.positionEnd.x + axon2.positionStart.x) / 2, (axon2.positionEnd.y + axon2.positionStart.y) / 2 - 20);
    context.fillText(axon3.value, (axon3.positionEnd.x + axon3.positionStart.x) / 2 - 20, (axon3.positionEnd.y + axon3.positionStart.y) / 2 - 20);

    mainNeuron.getInputs();

    return RENDER_PRORITY;
}

// --- CLEAR CANVAS ---
export function clear() {
    context.fillStyle = "rgb(1, 65, 91)";
    context.fillRect(0, 0, canvas.width, canvas.height);
}