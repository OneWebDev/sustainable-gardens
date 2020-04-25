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
        moment,
        examplePlot: {
            attr: {
                health: "good",
                water: "good",
                humidity: "good",
                light: "good",
                size: "good"
            },
            actions: [
                {
                    title: "Water Plants",
                    desc: "It's been 4 days since these plants have been watered.",
                    type: "water"
                },
                {
                    title: "Fertilize",
                    desc: "These plants need to be fertilized",
                    type: "fertilize"
                }
            ],
            snapshots: [
                {
                    src: "https://www.ikea.com/us/en/images/products/fejka-artificial-potted-plant-with-pot-in-outdoor-succulent__0614211_PE686835_S5.JPG",
                    date: new Date() - 10000    
                },
                {
                    src: "https://www.ikea.com/us/en/images/products/fejka-artificial-potted-plant-with-pot-in-outdoor-succulent__0614211_PE686835_S5.JPG",
                    date: new Date() - 100000    
                },
                {
                    src: "https://www.ikea.com/us/en/images/products/fejka-artificial-potted-plant-with-pot-in-outdoor-succulent__0614211_PE686835_S5.JPG",
                    date: new Date() - 100000    
                }
            ]
        },
        categories: ['Action Items', 'Snapshots', 'Live'],
        selectedCategory: 'Action Items',
        activePlot: 4
    },
    methods: {
        newActivePlot(n) {
            this.activePlot = n;
        },
        changeCategory(n) {
            this.selectedCategory = n;
        },
        postNewAction(type) {
            axios.post('/new-plant-action', {
                plot: activePlot,
                type
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
})