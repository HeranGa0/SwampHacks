
class DotMap {

    constructor(grades) {
        this.tittle ={
            text: "Student Grade"
        };
        this.grades = grades;
        this.gradeStats = {"a":0,"b":0,"c":0,"d":0,"f":0,"total":0}
        for(let grade of grades) {
            if(+grade>=90)
                this.gradeStats["a"]++;
            else if(+grade>=80)
                this.gradeStats["b"]++;
            else if(+grade>=70)
                this.gradeStats["c"]++;
            else if(+grade>=60)
                this.gradeStats["d"]++;
            else
                this.gradeStats["f"]++;
            this.gradeStats["total"]++;
            console.log(this.gradeStats["total"]);
        }
        this.calculate();
        this.createCanvas();
    }
    createCanvas() {
        this.canvas = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            zoomEnabled: true,
            title: this.tittle,
            exportEnabled: true,
            animationEnabled: true,

            legend:{
                cursor: "pointer"
            },
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}%</strong>",
                indexLabel: "{name} - {y}%",
                dataPoints: this.dataPoint
            }]
        });
    }
    display() {

        this.canvas.render();
    }
    calculate() {
        this.dataPoint = [{y:this.gradeStats["a"]/this.gradeStats["total"]*100, name: "90%-100%", exploded: true},
            {y:this.gradeStats["b"]/this.gradeStats["total"]*100, name: "80%-90%", exploded: true},
            {y:this.gradeStats["c"]/this.gradeStats["total"]*100, name: "70%-80%", exploded: true},
            {y:this.gradeStats["d"]/this.gradeStats["total"]*100, name: "60%-70%", exploded: true},
            {y:this.gradeStats["f"]/this.gradeStats["total"]*100, name: "0%-60%", exploded: true}];
    }
    updateWithNewData(grade) {
        if (+grade >= 90)
            this.gradeStats["a"]++;
        else if (+grade >= 80)
            this.gradeStats["b"]++;
        else if (+grade >= 70)
            this.gradeStats["c"]++;
        else if (+grade >= 60)
            this.gradeStats["d"]++;
        else
            this.gradeStats["f"]++;
        this.gradeStats["total"]++;
        this.calculate();
        this.canvas.options.data[0].dataPoints = this.dataPoint;
        this.display();
    }
}

let g_chart=0;
function loadFileAsText() {

    var fileToLoad = document.getElementById("myFile").files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent){
        // Entire file


        // By lines
        let lines = this.result.split('\n');
        let dataset = [];
        for(var line = 0; line < lines.length; line++){
            //console.log(lines[line].split(',')[0]+" ",lines[line].split(',')[1]);
            dataset.push(lines[line].split(',')[1]);
            // dataset.push({x:line,y:line+1})
        }
        let chart = new DotMap(dataset);
        g_chart = chart;
        chart.display();

    };
    reader.readAsText(fileToLoad);

}
function submit() {
    let inputGrade = document.getElementById("input").value;
    console.log(inputGrade);
    g_chart.updateWithNewData(inputGrade);

}