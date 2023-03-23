precision mediump float;

uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;


void main(){
    // gl_FragColor = vec4(0.9569, 0.2235, 0.5804, 0.5);
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 1.5 + 1.5;
    gl_FragColor = textureColor;
}