precision mediump float;
varying vec2 vUv;
// vUv ranges from 0-1 in both the x and y axes(vUv.x, vUv.y)

void main(){

    //storing vUv.x or vUv.y as a variable(float strength = ...) to reuse the variable and avoid redeclaring gl_fragColor(old code below page for reference), example:
    
    //black to white, left to right
    float strength = vUv.x;  

    // striped black and white, no gradient between black and white (enforced by step() below)
    // changing the .5 above changes the where step runs, changing the size of segments
    // float strength = mod(vUv.y * 10.0, 1.0); //modulus returns the remainder to start the pattern again
    // strength = step(.5, strength); //step function, if(strength>.5), step forward to 1, if<.5, step back to 0. substitute for an if check

    // striped white mesh, black holes
    // float strength = step(.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(.8, mod(vUv.y * 10.0, 1.0));

    // striped black mesh, white holes. smaller step on the y for smaller white holes
    // float strength = step(.8, mod(vUv.x * 10.0, 1.0));
    // strength -= step(.1, mod(vUv.y * 10.0, 1.0));




    gl_FragColor = vec4(strength, strength, strength, 1.0);
}













//normal color for this material
// gl_FragColor = vec4(0.9569, 0.2235, 0.5804, 0.5);

//black to white, left to right
// gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 0.8);

//black to white, bottom to top
// gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 0.8);

//black to white, bottom to top
// gl_FragColor = vec4(1.0-vUv.y, 1.0-vUv.y, 1.0-vUv.y, 0.8);

//black to white, bottom to top, much longer white than black
// gl_FragColor = vec4(vUv.y * 10.0, vUv.y * 10.0, vUv.y * 10.0, 1);
