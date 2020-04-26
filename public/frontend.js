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
        wikiMap: {},
        activePlot: 4,
        wikiData,
        wat: 0
    },
    methods: {
        newActivePlot(n) {
            this.activePlot = n;
        },
        changeCategory(n) {
            this.selectedCategory = n;
        },
        postNewAction(type) {

            var auto = false;
            if(action == 'water') {
                auto == true;
            }

            axios.post('/new-plant-action', {
                plotid: activePlot,
                action: type,
                auto
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        openWikiItem(ele) {
            console.log(this.wikiMap, ele)
            if(ele in this.wikiMap) {
                delete this.wikiMap[ele]
            } else {
                this.wikiMap[ele] = ""
            }
            this.wat += 1;
        }
    },
    mounted() {
        axios.get('/get-all-data').then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
})


