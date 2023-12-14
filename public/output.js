//D3
let inputData;
fetch('/getInputData')
.then(response => response.json())
.then(data => {
    console.log(data);
    inputData = data.data;
    createD3(inputData);
})

function createD3(dataArray){

    let svg = d3.select('#container')
            .append('svg')
            .attr("width", window.innerWidth)
            .attr("height", window.innerHeight); 

    let width = svg.attr("width");
    let height = svg.attr("height");
    let centerx = width / 2;

    
    let simulation = d3
        .forceSimulation(dataArray)
        .force("charge", d3.forceManyBody().strength(10))
        .force("center", d3.forceCenter(width / 2 ,height / 2))
        .force("collide", d3.forceCollide(30).strength(0.7))
        .on("tick", ticked);
    
    let drag = d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    let circle = svg
        .selectAll('circle')
        .data(dataArray)
        .enter()
        .append('circle')
        .attr('cx', d => {
            if (d.qZero === "sound") {
                return 50;
            }else {
                return width - 50;
            }
        })
        .attr('cy', d => Math.random() * height)
        .attr('r', function(d) {
                return d.qOne;
            })
        .attr('fill', d => `rgba(${d.qThree}, ${d.qTwo}, ${d.qOne}, ${d.qOne / 255})`)
        .call(drag);
    
    let texts = svg
        .selectAll('text')
        .data(dataArray)
        .enter()
        .append('text')
        .attr('x', centerx)
        .attr('y', d => Math.random() * height)
        .text(d => d.name)
        .attr('text-anchor', "middle")
        .attr('dy', 4)
        .call(drag);

    function ticked(){
        texts
            .attr("x", d => d.x)
            .attr("y", d => d.y);
        circle
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
    
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
    
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
}






