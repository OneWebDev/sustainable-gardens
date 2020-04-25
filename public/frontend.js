new Vue({
    el: '#app',
    data: {
        plots: {
            "3": {
                type: "Tomato"
            },
            "4": {
                type: "Fenwick Tree"
            },
            "6": {
                type: "Onion"
            },
            "7": {
                type: "AVL Tree"
            }
        },
        examplePlot: {
            attr: {
                health: "good",
                water: "good",
                humidity: "good",
                light: "good",
                size: "good"
            }
        },
        activePlot: 4
    },
    methods: {
        newActivePlot(n) {
            this.activePlot = n;
        }
    },
})