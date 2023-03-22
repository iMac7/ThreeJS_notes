uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute vec2 uv;
//varying sends variable to fragment
varying vec2 vUv;
varying float vElevation;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //separated the math below to access the total height coordinates
    //note: sin ranges from -1 to +1
    float elevation = sin(modelPosition.x*uFrequency.x + uTime)*.4;
    elevation += sin(modelPosition.y*uFrequency.y)*.2;
    // modelPosition.z += sin(modelPosition.x*uFrequency.x + uTime)*.4;
    // modelPosition.z += sin(modelPosition.y*uFrequency.y)*.2;
    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_Position = projectedPosition;

    //send to fragment
    vUv = uv;
    vElevation = elevation;
}