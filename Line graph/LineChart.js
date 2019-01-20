let table = {
    spring2018:clarity1,
    summer2018:clarity2,
    fall2018:clarity3,
    spring2019:clarity4,
    summer2019:clarity5

}
let g_chart=0;
class LineChart {

    constructor(clarities,difficulties) {
        this.tittle ={
            text: "Clarity and Difficulty"
        };
        this.clarities = clarities;
        this.difficulties = difficulties;
        this.csum = 0;
        this.dsum = 0;
        this.cnum = 0;
        this.dnum=0;
        this.createCanvas();
    }
    createCanvas() {
        this.canvas = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Course Average Clarity and Difficulty"
            },
            axisX:{
                //valueFormatString: "DD MMM",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Score",
                crosshair: {
                    enabled: true
                }
            },
            toolTip:{
                shared:true
            },
            legend:{
                cursor:"pointer",
                verticalAlign: "bottom",
                horizontalAlign: "left",
                dockInsidePlotArea: true

            },
            data:  [{
            type: "line",
            showInLegend: true,
            name: "Clarity",
            markerType: "square",
            //xValueFormatString: "DD MMM, YYYY",

            dataPoints: this.clarities
        }, {
                name: "Difficulty",
                type: "line",
                showInLegend: true,
                markerType: "square",
                //xValueFormatString: "DD MMM, YYYY",

                dataPoints: this.difficulties
            }]
        });
    }
    display() {

        this.canvas.render();
    }
    /*obj = {
    term:xxxx,
    clarity:3,
    diffficulty:4,
    index = 1
    }
     */
    updateWithNewData(obj) {
        let cArray = [clarity1,clarity2,clarity3,clarity4,clarity5];

        let car = cArray[obj.index];
        let csum=0;
        for(let cl of car) {
            csum+=cl["clarity level"];
        }
        let dsum=0;
        for(let cl of car) {
            dsum+=cl["easy_level"];
        }

        let gg = (csum+(+(obj.clarity)));
        //console.log(gg)
         gg=   gg/(car.length+1);

        this.canvas.data[0].dataPoints[+(obj.index)].y = gg;
        let dd = (dsum+(+(obj.clarity)));
        console.log(dd)
            dd = dd/(car.length+1);

        this.canvas.data[1].dataPoints[+(obj.index)].y = dd;
        this.display();
    }
    static updateWithNewData(obj) {
        g_chart =
        this.display();
    }
    }



function submit() {
    let clarity = document.getElementById("clarity").value;
    let difficulty = document.getElementById("difficulty").value;
    let term = document.getElementById("op").value;

    let index= 0;
    if(term=="spring2018")
        index = 0;
    else if(term=="summer2018")
        index=2;
    else if(term=="fall2018")
        index=3;
    else if(term=="spring2019")
        index=4;
    else
        index=5;
    console.log(clarity,difficulty,term,index)
    g_chart.updateWithNewData({term:term,clarity:clarity,difficulty:difficulty,index:index});

}
window.onload =function(e){
    fetch('http://test.holeeman.com/api/get_val/').then(r => r.json())
        .then(data => console.log(data))
        .catch(e => console.log("Booo"))



    let calc = function(clarity) {
        let sum= 0
        for(let cl of clarity) {
            sum+=cl["clarity level"];
        }
        return sum/clarity.length;
    }
    let calc2 = function(diffi) {
        let sum= 0
        for(let cl of diffi) {
            sum+=cl["easy_level"];
        }
        return sum/diffi.length;

    }


    let clarities = [{
        y:calc(clarity1),
        label:'2018 Spring'
    }, {
        y:calc(clarity2),
        label:'2018 Summer'
    }, {
        y:calc(clarity3),
        label:'2018 Fall'
    },{
        y:calc(clarity4),
        label:'2019 Spring'
    },{
        y:calc(clarity5),
        label:'2019 Summer'
    }]
    let Diffi = [{
        y:calc2(clarity1),
        label:'2018 Spring'
    }, {
        y:calc2(clarity2),
        label:'2018 Summer'
    }, {
        y:calc2(clarity3),
        label:'2018 Fall'
    },{
        y:calc2(clarity4),
        label:'2019 Spring'
    },{
        y:calc2(clarity5),
        label:'2019 Summer'
    }]
    let chart = new LineChart(clarities,Diffi);
    g_chart = chart;
    chart.display();

}