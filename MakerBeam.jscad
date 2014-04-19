var aluminum = [0.75,0.75,0.75];
var blackanodized = [0.15,0.15,0.15];

function beam_quarter(angle) {
        return polygon([[0,0], [2,0], [2,1], 
                        [4,3.5], [4,1.5], [5,1.5], 
                        [5,5], [1.5,5], [1.5,4], 
                        [3.5,4], [1,2], [0,2]])
                .rotateZ(angle).translate([5,5,0]);
}

function beam(length) {
    var beam = beam_quarter(0)
        .union(beam_quarter(90))
        .union(beam_quarter(180))
        .union(beam_quarter(270))
        .extrude({offset: [0,0,length]})
            .setColor(blackanodized);
            
    beam.properties.BottomConnector = new CSG.Connector([5,5,0], [0,-1,-1], [1,0,0]);
    beam.properties.TopConnector = new CSG.Connector([5,5,length], [0,1,1], [1,0,0]);
    
    beam.properties.BottomNorth = new CSG.Connector([5,0,5], [1,1,0], [0,0,1]);
    beam.properties.TopNorth = new CSG.Connector([5,0,95], [1,1,0], [0,0,1]);
    
    // Untested
    beam.properties.BottomSouth = new CSG.Connector([5,10,5], [-1,1,0], [0,0,-1]);
    beam.properties.TopSouth = new CSG.Connector([5,10,95], [-1,1,0], [0,0,-1]);    
    
    beam.properties.BottomWest = new CSG.Connector([0,5,5], [0,1,1], [1,0,0]);
    beam.properties.TopWest = new CSG.Connector([0,5,95], [0,1,1], [1,0,0]);

    beam.properties.BottomEast = new CSG.Connector([10,5,5], [0,1,-1], [-1,0,0]);
    beam.properties.TopEast = new CSG.Connector([10,5,95], [0,1,-1], [-1,0,0]);

    return beam;
}

function bracket_90deg(reverse) {
    var bracket = cube({size: [30, 10, 2]})
        .union(cube({size: [10, 20, 2]}))
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([15,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([25,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,15,0]))
           .setColor(aluminum);

    if (reverse) {
        bracket = bracket.rotateX(180);
        bracket.properties.CornerConnector = new CSG.Connector([5,-5,-2], [-1,1,0], [0,0,-1]);        
    }
    else
        bracket.properties.CornerConnector = new CSG.Connector([5,5,0], [-1,1,0], [0,0,-1]);
    
    return bracket;
}

function main() {
    var bottombeam = beam(100);
    var topbeam = beam(100);
    
    var leftbeam = beam(200);
    var rightbeam = beam(200);    
    
    var bracket1 = bracket_90deg(false);
    var bracket2 = bracket_90deg(true);

    var bracket3 = bracket_90deg(true);
    var bracket4 = bracket_90deg(false);
    
    leftbeam = leftbeam.setColor([0,1,0]);
    bracket1 = bracket1.setColor([1,0,0]);

    // Now connect everything
    bottombeam = bottombeam.connectTo(bottombeam.properties.BottomNorth, leftbeam.properties.BottomConnector, false, 0);
    rightbeam = rightbeam.connectTo(rightbeam.properties.BottomConnector, bottombeam.properties.TopNorth, false, 0);    
    topbeam = topbeam.connectTo(topbeam.properties.BottomNorth, leftbeam.properties.TopConnector, false, 0);
    
    bracket1 = bracket1.connectTo(bracket1.properties.CornerConnector, bottombeam.properties.BottomWest, false, 0);
    bracket2 = bracket2.connectTo(bracket2.properties.CornerConnector, bottombeam.properties.TopWest, false, 0);
    
    bracket3 = bracket3.connectTo(bracket3.properties.CornerConnector, topbeam.properties.BottomEast, false, 0);
    bracket4 = bracket4.connectTo(bracket4.properties.CornerConnector, topbeam.properties.TopEast, false, 0);
    
    
    var everything = bottombeam.union(leftbeam).union(rightbeam).union(topbeam)
        .union(bracket1).union(bracket2).union(bracket3).union(bracket4);    

    return everything.translate([-50,0,10]);  
}
