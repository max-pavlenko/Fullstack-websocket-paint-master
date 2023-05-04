import {makeAutoObservable} from "mobx";
import Eraser from "../tools/Eraser";

class ToolState {
    tool = null;
    colorBeforeErasing = '';

    constructor() {
        makeAutoObservable(this)
    }

    setColorBeforeErasing(color){
        this.colorBeforeErasing = color;
    }

    setTool(tool) {
        this.tool = tool;
        if (tool instanceof Eraser) {
            this.colorBeforeErasing = tool.ctx.strokeStyle;
            console.log('colorBeforeErasing', this.colorBeforeErasing, tool.ctx.strokeStyle)
        }
        else if(this.colorBeforeErasing) {
            this.setStrokeColor(this.colorBeforeErasing)
            this.colorBeforeErasing = '';
        }
    }
    setFillColor(color) {
        this.tool.fillColor = color
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color
    }
    setLineWidth(width) {
        this.tool.lineWidth = width
    }
}

export default new ToolState()
