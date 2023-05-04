import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null
    socket = null
    sessionid = null
    undoList = []
    redoList = []
    username = ""

    constructor() {
        makeAutoObservable(this)
    }

    setSessionId(id) {
        this.sessionid = id
    }
    setSocket(socket) {
        this.socket = socket
    }

    setUsername(username) {
        this.username = username
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    pushToUndo(data) {
        this.undoList.push(data)
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        let dataUrl;
        let resetCanvas = false;

        if (this.undoList.length > 0) {
            this.redoList.push(this.canvas.toDataURL())
            dataUrl = this.undoList.pop()
            let img = new Image()
            img.src = dataUrl
            img.onload =  () => {
                // ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            resetCanvas = true;
        }
        console.log('dataUrl', dataUrl)

        this.updateCanvas(dataUrl, resetCanvas)
    }

    updateCanvas(img, resetCanvas){
        this.socket.send(JSON.stringify({
            method: 'updateCanvas',
            image: img,
            reset: resetCanvas
        }))
    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        let dataUrl;

        if (this.redoList.length > 0) {
            this.undoList.push(this.canvas.toDataURL())
            dataUrl = this.redoList.pop()
            let img = new Image()
            img.src = dataUrl
            img.onload =  () => {
                // ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
        dataUrl && this.updateCanvas(dataUrl, false)
    }

}

export default new CanvasState()
