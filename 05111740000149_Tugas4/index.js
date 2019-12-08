
(function() {

  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);
  var program,program2,program3;

  glUtils.SL.init({ callback: function() { main(); } });


  function main() {
   
    window.addEventListener('resize', resizer);
  
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);
  
    
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader3 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex); //cube
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment); //cube

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var trans = gl.getUniformLocation(program, 'mantul');
    var mid = gl.getUniformLocation(program, 'mid');
    program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
    var trans2 = gl.getUniformLocation(program2, 'mantul2');
    var mid2 = gl.getUniformLocation(program, 'mid2');
    program3 = glUtils.createProgram(gl, vertexShader3, fragmentShader2);



    var translasi= [0.0, 0.0, 0.0];
    var xAdder = 0.02;
    var yAdder = 0.03;
    var zAdder = 0.04;
  
    var theta = [0.0, 0.0, 0.0];
    var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;

    function listener(){
      function onKeyPress(event) {
        if (event.keyCode == 88 || event.keyCode == 120) {
          axis = xAxis;
        } else if (event.keyCode == 89 || event.keyCode == 121) {
          axis = yAxis;
        } else if (event.keyCode == 90 || event.keyCode == 122) {
          axis = zAxis;
        }
      }
      document.addEventListener('keypress', onKeyPress);
  
      var lastX, lastY;
      function onMouseDown(event){
        var x = event.clientX;
        var y = event.clientY;
        var rect = event.target.getBoundingClientRect();
        if (rect.left <= x &&
            rect.right > x &&
            rect.top <= y &&
            rect.bottom > y) {
              lastX = x;
              lastY = y;
              dragging = true;
        }
      }
      function onMouseUp(event) {
        dragging = false;
      }
      function onMouseMove(event) {
        var x = event.clientX;
        var y = event.clientY;
        if (dragging) {
          var factor = 5 / canvas.height;
          var dx = factor * (x-lastX);
          var dy = factor * (y-lastY);
          theta[yAxis] += dx;
          theta[xAxis] += dy;
        }
        lastX = x;
        lastY = y;
      }
      document.addEventListener('mousedown',onMouseDown);
      document.addEventListener('mouseup',onMouseUp);
      document.addEventListener('mousemove',onMouseMove);
    }
    function render() {
    
      gl.clearColor(0, 0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);
      drawtriangle();
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);
      
      gl.useProgram(program2);
      drawtriangle2();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
     
      gl.useProgram(program3);
      cube();    
      gl.drawArrays(gl.TRIANGLES, 0, 30);
      requestAnimationFrame(render); 
    }
    function cube(){
    
      var cubeVertices = [
        // x, y, z            u, v         normal
  
        // -0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, //BAD BDC
        // -0.5, -0.5,  0.5,     0.0, 0.0,  0.0, 0.0, 1.0, 
        //  0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
        // -0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, 
        //  0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
        //  0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 0.0, 1.0, 
  
        0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0, // CDH CHG
        0.5, -0.5,  0.5,     0.0, 0.0,  1.0, 0.0, 0.0,
        0.5, -0.5, -0.5,     0.2, 0.0,  1.0, 0.0, 0.0,
        0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0,
        0.5, -0.5, -0.5,     0.2, 0.0,  1.0, 0.0, 0.0,
        0.5,  0.5, -0.5,     0.2, 1.0,  1.0, 0.0, 0.0,
 
        0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0, // DAE DEH
       -0.5, -0.5,  0.5,     0.2, 0.0,  0.0, -1.0, 0.0,
       -0.5, -0.5, -0.5,     0.4, 0.0,  0.0, -1.0, 0.0,
        0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0,
       -0.5, -0.5, -0.5,     0.4, 0.0,  0.0, -1.0, 0.0,
        0.5, -0.5, -0.5,     0.4, 1.0,  0.0, -1.0, 0.0,
 
       -0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0, // EFG EGH
       -0.5,  0.5, -0.5,     0.4, 0.0,  0.0, 0.0, -1.0,
        0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 0.0, -1.0,
       -0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0,
        0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 0.0, -1.0,
        0.5, -0.5, -0.5,     0.6, 1.0,  0.0, 0.0, -1.0,
 
       -0.5,  0.5, -0.5,     0.6, 1.0,  -1.0, 0.0, 0.0, //FEA FAB
       -0.5, -0.5, -0.5,     0.6, 0.0,  -1.0, 0.0, 0.0,
       -0.5, -0.5,  0.5,     0.8, 0.0,  -1.0, 0.0, 0.0,
       -0.5,  0.5, -0.5,     0.6, 1.0,  -1.0, 0.0, 0.0,
       -0.5, -0.5,  0.5,     0.8, 0.0,  -1.0, 0.0, 0.0,
       -0.5,  0.5,  0.5,     0.8, 1.0,  -1.0, 0.0, 0.0,
 
        0.5,  0.5, -0.5,     0.8, 1.0,  0.0, 1.0, 0.0, //GFB GBC
       -0.5,  0.5, -0.5,     0.8, 0.0,  0.0, 1.0, 0.0,
       -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
        0.5,  0.5, -0.5,     0.8, 1.0,  0.0, 1.0, 0.0,
       -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
        0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 1.0, 0.0
      ];
      var cubeVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program3, 'vPosition');
      var vTexCoord = gl.getAttribLocation(program3, 'vTexCoord');
      var vNormal = gl.getAttribLocation(program3, 'vNormal');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);

      // Uniform untuk definisi cahaya
      var lightColorLoc = gl.getUniformLocation(program3, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program3, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program3, 'ambientColor');
      var lightColor = [2., 2., 2.];

      var shine = gl.getUniformLocation(program3,'shininess'); //program nyesuain huruf atau kubus
      var s = 0.05; //tingkat shininess

      var lightPosition = [0 + translasi[0] ,0 + translasi[1] ,0 + translasi[2]];
      var ambientColor = glMatrix.vec3.fromValues(0.17, 0.41, 0.49);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);
      gl.uniform1f(shine, s);

      var nmLoc = gl.getUniformLocation(program3, 'normalMatrix');

      // Definisi view, model, dan projection
      var vmLoc = gl.getUniformLocation(program3, 'view');
      var pmLoc = gl.getUniformLocation(program3, 'projection');
      var mmLoc = gl.getUniformLocation(program3, 'model');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, 1.5),  // posisi kamera
        glMatrix.vec3.fromValues(0.0, 0.0, 0.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.1;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
        fovy,
        aspect,
        near,
        far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -0.2]);
      glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
      glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
      glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

    }

    function drawtriangle(){

            var triangleVertices = new Float32Array([
              0.4, 0.15, 
              0.3,-0.5, 
              0.2,-0.5, 
              0.35,0.3,
              0.45,0.3, 
              0.6,-0.5, 
              0.5,-0.5, 
              ]);

            var triangleVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program, 'vPosition');
            var vColor = gl.getAttribLocation(program, 'vColor');
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
            
        
            if (translasi[0]  < -0.45 || translasi[0] > 0.45) {
                xAdder*=-1;
            }

            translasi[0] += xAdder;
            var middle_point = -0.3 + translasi[0];
            
            gl.uniform1f(mid, middle_point);

            if (translasi[1] < -0.45 || translasi[1] > 0.45) {
                yAdder*=-1;
            }

            translasi[1] += yAdder;

            if (translasi[2] < -0.45 || translasi[2] > 0.45) {
                zAdder*=-1;
            }

            translasi[2] += zAdder;
            
            gl.uniform3fv(trans, translasi);
            

            if (scale >= 1) membesar = -1;
            else if (scale <= -1) membesar = 1;
            scale = scale + (membesar * 0.00149); 
            gl.uniform1f(scaleLoc, scale);
      
      // Uniform untuk definisi cahaya
      var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
      var lightColor = [2., 2., 2.];
      var lightPosition = [0 + translasi[0] ,0 + translasi[1] ,0 + translasi[2]];

      var shine = gl.getUniformLocation(program,'shininess'); //program nyesuain huruf atau kubus
      var s = 0.149
      var ambientColor = glMatrix.vec3.fromValues(0.17, 0.41, 0.49);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);
      gl.uniform1f(shine, s);

      // Definisi view dan projection
      var vmLoc = gl.getUniformLocation(program, 'view');
      var pmLoc = gl.getUniformLocation(program, 'projection');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, 1.5),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.5;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      
      var mmLoc = gl.getUniformLocation(program, 'model');
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0,-0.2]);
      glMatrix.mat4.translate(mm, mm, translasi);
      glMatrix.mat4.scale(mm, mm, [0.2, 0.2, 0.2]);
      glMatrix.mat4.scale(mm, mm, [scale, 1.0, 1.0]);
      gl.uniformMatrix4fv(mmLoc, false, mm);
    }
    function drawtriangle2(){
            var triangleVertices2 = new Float32Array([
              0.4, 0.15, 
              0.3,-0.5, 
              0.2,-0.5, 
              0.35,0.3,
              0.45,0.3, 
              0.6,-0.5, 
              0.5,-0.5, 
              ]);

            var triangleVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices2), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program2, 'vPosition');
            var vColor = gl.getAttribLocation(program2, 'vColor');
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
           

            if (translasi[0]  < -0.45 || translasi[0] > 0.45) {
                xAdder*=-1;
            }
            translasi[0] += xAdder;
            var middle_point = -0.3 + translasi[0];         
            gl.uniform1f(mid2, middle_point);

            if (translasi[1] < -0.45 || translasi[1] > 0.45) {
                yAdder*=-1;
            }
            translasi[1] += yAdder;

            if (translasi[2] < -0.45 || translasi[2] > 0.45) {
                zAdder*=-1;
            }
            translasi[2] += zAdder;
            gl.uniform3fv(trans2, translasi);
            

            if (scale >= 1) membesar = -1;
            else if (scale <= -1) membesar = 1;
            scale = scale + (membesar * 0.00149); 
            gl.uniform1f(scaleLoc, scale);
      
      // Uniform untuk definisi cahaya
      var lightColorLoc = gl.getUniformLocation(program2, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program2, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program2, 'ambientColor');
      var lightColor = [2., 2., 2.];
      var lightPosition = [0 + translasi[0] ,0 + translasi[1] ,0 + translasi[2]];

      var shine = gl.getUniformLocation(program2,'shininess'); //program nyesuain huruf atau kubus
      var s = 0.149; //tingkat shininess

      // var lightPosition = [0., 0., -1.];
      var ambientColor = glMatrix.vec3.fromValues(0.17, 0.41, 0.49);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);
      gl.uniform1f(shine, s);

      // Definisi view dan projection
      var vmLoc = gl.getUniformLocation(program2, 'view');
      var pmLoc = gl.getUniformLocation(program2, 'projection');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, 1.5),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.5;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      
      var mmLoc = gl.getUniformLocation(program2, 'model');
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0,-0.2]);
      glMatrix.mat4.translate(mm, mm, translasi);
      glMatrix.mat4.scale(mm, mm, [0.2, 0.2, 0.2]);
      glMatrix.mat4.scale(mm, mm, [scale, 1.0, 1.0]);
      gl.uniformMatrix4fv(mmLoc, false, mm);
    }

    function texturePack(){      
      // Uniform untuk tekstur
      var sampler0Loc = gl.getUniformLocation(program3, 'sampler0');
      gl.uniform1i(sampler0Loc, 0);
      // Inisialisasi tekstur
      var texture = gl.createTexture();
      if (!texture) {
        reject(new Error('Error Texture'));
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
      initTexture(function () {
      });

      // Membuat mekanisme pembacaan gambar jadi tekstur
      function initTexture(callback, args) {
        var imageSource = 'images/ayu.jpeg';
        var promise = new Promise(function(resolve, reject) {
          var image = new Image();
          if (!image) {
            reject(new Error('Error Image'));
          }
          image.onload = function() {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            resolve('Done');
          }
          image.src = imageSource;
        });
        promise.then(function() {
          if (callback) {
            callback(args);
          }
        }, function (error) {
          console.log('Error', error);
        });
      }
    }

    var sudut = 0;
    var scale = 1;
    var membesar = 1;
    var scaleLoc = gl.getUniformLocation(program, 'scale');


    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    render();
    texturePack();
    listener();
    resizer();
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

})(window || this);
