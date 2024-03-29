class MainNeuron {
    constructor(context, {x, y, sprite, offsetX, offsetY}) {
        this.context = context;
        this.position = {
            x: x,
            y: y,
        }
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.offset = {
            x: offsetX,
            y: offsetY,
        }
        this.inputs = [];
        this.bias = null;
        this.output = null;
        this.value = 0;
        this.font = "Abel";
    }

    addInput(input) {
        this.inputs.push(input);
    }

    addBias(bias) {
        this.bias = bias;
    }

    addOutput(output) {
        this.output = output;
    }

    getInputs() {
        let result = 0;
        this.inputs.forEach(inputNode => {
            result += inputNode.getValue();
        });
        result += this.bias.getValue();
        this.value = result;
    }

    forwardResult() {
        this.output.value = this.value < 0 ? 0 : 1;
    }

    draw() {
        this.context.drawImage(this.sprite, this.position.x - this.offset.x, this.position.y - this.offset.y);
        let fontSize = 20;
        this.context.font = fontSize + "px " + this.font;
        this.context.textAlign = "center";
        this.context.fillStyle = "white";
        this.context.fillText(this.value.toFixed(1), this.position.x - this.sprite.width / 4, this.position.y + fontSize / 4);

        this.context.lineWidth = 3;
        this.context.strokeStyle = "white";
        this.context.beginPath();
        this.context.moveTo(this.position.x + 11, this.position.y + 15);
        this.context.lineTo(this.position.x + 31, this.position.y + 15);
        this.context.lineTo(this.position.x + 31, this.position.y - 15);
        this.context.lineTo(this.position.x + 51, this.position.y - 15);
        this.context.stroke();
    }

    update() {
        this.draw();
        this.forwardResult();
    }
}

export default MainNeuron;