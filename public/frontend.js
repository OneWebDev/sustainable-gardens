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
                },
                {
                    title: "Enable Light",
                    desc: "Turn on additional lighting.",
                    type: "enablelight"
                },
                {
                    title: "Disable Light",
                    desc: "Disable additional lighting.",
                    type: "disablelight"
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

            // var auto = false;
            // if(type == 'water') {
            //     auto == true;
            // }
            console.log(type)

            axios.post('/new-plant-action', {
                plotid: this.activePlot,
                action: type
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
        },
        getTitleText(img) {
            // console.log(img.includes('latest'))
            var s = ""
            if(img.includes('latest')) {
                s = "Latest Snapshot"
            } else if (img.includes('default')) {
                s = 'Original Snapshot'
            } else if (img.includes('carrot')) {
                s = "Carrot growth stage " + img[img.length - 5]
            } else if (img.includes('onion')) {
                s = "Onion growth stage " + img[img.length - 5]
            }else {
                var t = img.split("-")[1].split(".")[0]
                s = moment(t * 1000).fromNow() + " at " + moment(t * 1000).format("H:mm a")
            }
            return s
        },
        getPlantIcon(plot) {
            if(plot >= 5) {
                if(plot == 6) {
                    return "./img/carrot4.png"
                }
                if(plot == 7) {
                    return "./img/onion4.png"
                }
                // return "./img/tomato_img.png"
            } else {
                return this.plots[plot].images.filter(e => e.includes('latest'))[0]
            }
        },
        getPlantStat(plot, stat) {
            return this.plots[plot][stat][this.plots[plot][stat].length - 1];
        },
        formatData(data) {
            // console.log(data)
            var data = data.data
            var d = {
                "plot1": {
                    humid: [],
                    images: [],
                    lights: [],
                    moists: [],
                    temps: [],
                    times: [],
                    type: "Fittonia"
                },
                "plot2": {
                    humid: [],
                    images: [],
                    lights: [],
                    moists: [],
                    temps: [],
                    times: [],
                    type: "Peperomia"
                }
            }
            console.log(data)
            var size = data.humid.length;

            var uniqueImg = {}
            for(var i = 0; i < size; i++) {
                // console.log(data)
                var humid = data.humid[i];
                var lights = data.lights[i];
                var moists = data.moists[i];
                var temps = data.temps[i];
                var times = data.times[i];
                var name = data.names[i]
                var image = data.images[i]
                uniqueImg[image] = ""
                // console.log(name)
                d[name].humid.push(humid)
                d[name].lights.push(lights)
                d[name].moists.push(moists)
                d[name].temps.push(temps)
                d[name].times.push(times)
            }

            var imgArr = Object.keys(uniqueImg)
            d["plot1"].images = imgArr.filter(e => e.includes('plot1'))
            d["plot2"].images = imgArr.filter(e => e.includes('plot2'))

            d["plot1"].images.sort().reverse()
            d["plot2"].images.sort().reverse()

            this.plots["3"] = d["plot1"]
            this.plots["4"] = d["plot2"]

            this.plots["6"] = JSON.parse(JSON.stringify(d["plot1"]))
            this.plots["7"] = JSON.parse(JSON.stringify(d["plot2"]))
            
            this.plots["6"].type = "Carrot"
            this.plots["7"].type = "Onion"

            this.plots["6"].images = ["./img/carrot1.png", "./img/carrot2.png", "./img/carrot3.png", "./img/carrot4.png"].reverse()
            this.plots["7"].images = ["./img/onion1.png", "./img/onion2.png", "./img/onion3.png", "./img/onion4.png"].reverse()


            console.log("here", this.plots)

            // console.log(d, uniqueImg)
        }
    },
    mounted() {
        this.formatData(serverData);
        // axios.get('/get-all-data').then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });

    }
})


