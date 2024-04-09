class BoxShadowGenerator {

    constructor() {
        this.horizontal = document.querySelector("#horizontal")
        this.horizontalRef = document.querySelector("#horizontal-value")
        this.vertical = document.querySelector("#vertical")
        this.verticalRef = document.querySelector("#vertical-value")
        this.blur = document.querySelector("#blur")
        this.blurRef = document.querySelector("#blur-value")
        this.spread = document.querySelector("#spread")
        this.spreadRef = document.querySelector("#spread-value")
        this.previewBox = document.querySelector("#box")
        this.rule = document.querySelector("#rule span")
        this.webkitRule = document.querySelector("#webkit-rule span")
        this.mozRule = document.querySelector("#moz-rule span")
        this.color = document.querySelector("#color")
        this.colorRef = document.querySelector("#color-value")
        this.opacity = document.querySelector("#opacity")
        this.opacityRef = document.querySelector("#opacity-value")
        this.inset = document.querySelector("#inset")
        this.insetRef = false;
    }

    initialize() {
        this.horizontalRef.value = this.horizontal.value
        this.verticalRef.value = this.vertical.value
        this.blurRef.value = this.blur.value
        this.spreadRef.value = this.spread.value
        this.colorRef.value = this.color.value
        this.opacityRef.value = this.opacity.value

        console.log(this.insetRef)

        this.applyRule()
        this.showRule()
        this.addEvents()
    }

    applyRule() {
        const rgbValue = this.hexToRgb(this.colorRef.value)

        const shadowRule = `${this.insetRef ? "inset" : ""} ${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${rgbValue}, ${this.opacityRef.value})`

        this.previewBox.style.boxShadow = shadowRule
        this.currentRule = shadowRule
    }

    showRule(){
        this.rule.innerText = this.currentRule
        this.webkitRule.innerText = this.currentRule
        this.mozRule.innerText = this.currentRule
    }

    updateValue(type, value) {
        switch(type) {
            case "horizontal":
                this.horizontalRef.value = value
                break

            case "vertical":
                this.verticalRef.value = value
                break

            case "spread":
                this.spreadRef.value = value
                break

            case "blur":
                this.blurRef.value = value
                break

            case "color":
                this.colorRef.value = value
                break

            case "opacity":
                this.opacityRef.value = value
                break

            case "inset":
                this.insetRef = value
                break
        }

        this.applyRule()
        this.showRule()
    }

    hexToRgb(hex) {
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${("0x" + hex[5] + hex[6]) | 0}`
    }

    addEvents() {
        this.horizontal.addEventListener("input", e => this.updateValue("horizontal", e.target.value))
        this.vertical.addEventListener("input", e => this.updateValue("vertical", e.target.value))
        this.spread.addEventListener("input", e => this.updateValue("spread", e.target.value))
        this.blur.addEventListener("input", e => this.updateValue("blur", e.target.value))
        this.color.addEventListener("input", e => this.updateValue("color", e.target.value))
        this.opacity.addEventListener("input", e => this.updateValue("opacity", e.target.value))
        this.inset.addEventListener("input", e => this.updateValue("inset", e.target.checked))
    }
}

const boxShadow = new BoxShadowGenerator()
boxShadow.initialize()

const rulesArea = document.querySelector("#rules-area")
const copyInstructions = document.querySelector("#copy-instructions")

rulesArea.addEventListener("click", () => {
    const rule = rulesArea.innerText.replace(/^\s*\n/gm, "")

    navigator.clipboard.writeText(rule).then(() => {

        copyInstructions.innerText = "Regra copiada com sucesso!"

        setTimeout(() => {
            copyInstructions.innerText = "Clique no quadro acima para copiar as regras"
        }, 1500)
    })

})