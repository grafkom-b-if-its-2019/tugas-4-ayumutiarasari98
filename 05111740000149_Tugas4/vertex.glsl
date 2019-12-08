precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;

varying vec3 fColor;
varying vec3 fPosition;
varying vec3 fNormal;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

uniform mat3 normalMatrix;

uniform float scale;
uniform float mid;
uniform vec3 mantul;

void main() {
  mat4 to_origin = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, -2.0, 1.0 
  );

  mat4 mantul = mat4(
    1.0, 0.0, 0.0, mantul.x,
    0.0, 1.0, 0.0, mantul.y,
    0.0, 0.0, 1.0, mantul.z,
    0.0, 0.0, 0.0, 1.0
  );

  vec4 vecmid = vec4(mid,0,0,1.0);

  mat4 skalasi = mat4(
    scale, 0.0, 0.0, -(vecmid.x)*scale + (vecmid.x),
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = projection * view * model * vec4(vPosition, 1.0);
 
  fColor = vColor;
  fPosition = vec3(view * model * vec4(vPosition, 1.0));
  fNormal = normalMatrix * vNormal;
}
