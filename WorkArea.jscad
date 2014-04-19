var aluminum = [0.75,0.75,0.75];
var blackanodized = [0.15,0.15,0.15];

function bracket_corner() {
    return cube({size: [30, 10, 2]})
        .union(cube({size: [10, 30, 2]}))
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([15,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([25,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,15,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,25,0]))
            .setColor(aluminum);
}

function bracket_90deg() {
    return cube({size: [30, 10, 2]})
        .union(cube({size: [10, 20, 2]}))
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([15,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([25,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,15,0]))
           .setColor(aluminum);
}

function bracket_60deg() {
    return cube({size: [30, 10, 2]})
        .union(cube({size: [10, 20, 2]}))
        .union(cube({size: [20, 10, 2]})
            .subtract(cylinder({r: 1.5, h: 2}).translate([5,5,0]))
            .subtract(cylinder({r: 1.5, h: 2}).translate([15,5,0]))            
            .rotateZ(30).translate([10,10,0])        
        )
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([15,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([25,5,0]))
            .setColor(aluminum);
}

function bracket_45deg() {
    return cube({size: [30, 10, 2]})
        //.union(cube({size: [10, 20, 2]}))
        .union(cube({size: [20, 10, 2]})
            .subtract(cylinder({r: 1.5, h: 2}).translate([5,5,0]))
            .subtract(cylinder({r: 1.5, h: 2}).translate([15,5,0]))            
            .rotateZ(45).translate([5,0,0])        
        )
        .subtract(cylinder({r: 1.5, h: 2}).translate([5,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([15,5,0]))
        .subtract(cylinder({r: 1.5, h: 2}).translate([25,5,0]))
            .setColor(aluminum);
}

function beam_quarter() {
        return polygon([[0,0], [2,0], [2,1], 
                        [4,3.5], [4,1.5], [5,1.5], 
                        [5,5], [1.5,5], [1.5,4], 
                        [3.5,4], [1,2], [0,2]]);
}

function beam(length) {
    return beam_quarter().translate([5,5,0])
        .union(beam_quarter().rotateZ(90).translate([5,5,0]))
        .union(beam_quarter().rotateZ(180).translate([5,5,0]))
        .union(beam_quarter().rotateZ(270).translate([5,5,0]))
        .extrude({offset: [0,0,length]})
            .setColor(blackanodized);
}

function main() {
    
    
    return [ 
        beam(100).rotateX(90),
        beam(100).rotateX(90).translate([0,0,210]),
        beam(200).translate([0,-10,10]),
        beam(200).translate([0,-100,10]),
        
        bracket_90deg().rotateY(270).rotateZ(180).translate([-2,0,0]),
        bracket_90deg().rotateY(270).rotateZ(0).translate([0,-100,0]),
        
        beam(300).rotateX(90).rotateZ(150).translate([20,-20,0]),
        
        
        bracket_60deg().rotateX(180).rotateZ(90).translate([0,-30,0])
        ];
    
}

function xmain() {
    return bracket_45deg();
}
