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
        selectedCategory: 'Snapshots',
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
        },
        getTitleText(img) {
            // console.log(img.includes('latest'))
            var s = "a"
            if(img.includes('latest')) {
                s = "Latest Snapshot"
            } else if (img.includes('default')) {
                s = 'Original Snapshot'
            } else {
                var t = img.split("-")[1].split(".")[0]
                s = moment(t * 1000).fromNow() + " at " + moment(t * 1000).format("H:mm a")
            }
            return s
        },
        getPlantIcon(plot) {
            if(plot >= 5) {
                return "./img/tomato_img.png"
            } else {
                return this.plots[plot].images.filter(e => e.includes('latest'))[0]
            }
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

            console.log(this.plots)

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


