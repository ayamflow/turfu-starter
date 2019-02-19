import test from "lib/test";
import glsl from "glslify";
import Header from "components/header";
import anime from "animejs";

let header = new Header();
document.body.appendChild(header.render().el);

/*
// import shader from './lib/shader.frag'

const myFragShader = glsl(`
import noise from './lib/shader.frag'

void main () {
  float brightness = noise(gl_FragCoord.xy);
  gl_FragColor = vec4(vec3(brightness), 1.);
}
`);
console.log('myFragShader', myFragShader);

console.log('coucou index.js!', process.env.NODE_ENV)

// if (module.hot) {
//     module.hot.accept('./lib/test.js', function() {
//         test()
//     })
// }
*/
