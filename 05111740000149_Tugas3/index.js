(function() {
  // ambil elemen canvas dan cek apakah webGL nya hidup
  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);
  var program,program2;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
      // Register Callbacks
      window.addEventListener('resize', resizer);

      // Get canvas element and check if WebGL enabled
      canvas = document.getElementById("glcanvas");
      gl = glUtils.checkWebGL(canvas);
  
      // Initialize the shaders and program
     var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
      vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
      vertexShader3 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex), //cube
      fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
     
      //huruf
      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      var thetaLoc = gl.getUniformLocation(program, 'theta'); 
      var transLoc = gl.getUniformLocation(program, 'trans');
      var thetaA = [10, 20, 0];
      var trans = [0, 0, 0]; 
      var X = 0.0080;
      var Y = 0.0090;
      var Z = 0.0130;

      program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
      var thetaLoc1 = gl.getUniformLocation(program2, 'theta1'); 
      var transLoc1 = gl.getUniformLocation(program2, 'trans1');
      var thetaA1 = [10, 20, 0];
      var trans1 = [0, 0, 0]; 
      var X1 = 0.0080;
      var Y1 = 0.0090;
      var Z1 = 0.0130;


      //cube
      program3 = glUtils.createProgram(gl, vertexShader3, fragmentShader);
      var thetaLocCube = gl.getUniformLocation(program3, 'theta');
      var thetaCube;

     

      function render(){
        gl.clearColor(0, 0, 0, 1);
        gl.colorMask(true,true,true,true);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        drawtriangle();
        gl.drawArrays(gl.TRIANGLE_FAN,0,7);

        gl.useProgram(program2);
        drawtriangle2();
        gl.drawArrays(gl.TRIANGLE_STRIP,0,3);

        gl.useProgram(program3);
        thetaCube = [10, 10, 0];
        gl.uniform3fv(thetaLocCube, thetaCube);
        drawcube();
        gl.drawArrays(gl.LINES,0,24);

        requestAnimationFrame(render);
      }
     

      function drawcube(){
          var cubeVertices = [
            //BAWAH
              -0.3,  -0.8,  0.7,      255, 255, 255,          
              0.4,  -0.8,  0.7,       255, 255, 255,          
              0.4,  -0.8,  0.7,       255, 255, 255,          
              0.4,  -0.8,  -0.6,      255, 255, 255,          
              0.4,  -0.8,  -0.6,      255, 255, 255,          
              -0.3,  -0.8,  -0.6,     255, 255, 255,          
              -0.3,  -0.8,  -0.6,     255, 255, 255,          
              -0.3,  -0.8,  0.7,      255, 255, 255,          
              //ATAS
              -0.3,  0.6,  0.7,       255,255, 255,          
              0.4,  0.6,  0.7,        255,255, 255,       
              0.4,  0.6,  0.7,        255,255, 255,         
              0.4,  0.6,  -0.6,      255,255, 255,          
              0.4,  0.6,  -0.6,       255,255, 255,          
              -0.3,  0.6,  -0.6,      255,255, 255,          
              -0.3,  0.6,  -0.6,      255,255, 255,          
              -0.3,  0.6,  0.7,       255,255, 255,          
              //BELAKANG
              -0.3,  -0.8,  0.7,      255,255, 255,            
              -0.3,  0.6,  0.7,       255,255, 255,           
              0.4,  -0.8,  0.7,      255,255, 255,            
              0.4,  0.6,  0.7,        255,255, 255,            
              //DEPAN
              0.4,  -0.8,  -0.6,      255,255, 255,            
              0.4,  0.6,  -0.6,       255,255, 255,           
              -0.3,  -0.8,  -0.6,     255,255, 255,            
              -0.3,  0.6,  -0.6,      255,255, 255             
        ];

        var cubeVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program3,'vPosition');
        var vColor = gl.getAttribLocation(program3,'vColor');
        gl.vertexAttribPointer(
          vPosition,                          // variable yang memegang posisi atrbute di shader
          3,                                  // jumlah elemen per attribute
          gl.FLOAT,                           // tipe data attribut
          gl.FALSE,                           // default
          6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);
      }

      function drawtriangle(){
        var triangleVertices = [
          0.4, 0.15, 2.0,1.0,0.0,
          0.3,-0.5, 0.7,1.0,0.6,
          0.2,-0.5, 0.3,1.0,0.6,
          0.35,0.3, 1.0,1.0,0.0,
          0.45,0.3, 0.4,0.0,1.0,
          0.6,-0.5, 1.0,1.0,0.5,
          0.5,-0.5, 0.2,0.0,1.0
        ];
        var triangleVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program,'vPosition');
        var vColor = gl.getAttribLocation(program,'vColor');
        gl.vertexAttribPointer(
          vPosition,                          
          2,                                  // jumlah elemen per attribute
          gl.FLOAT,                           // tipe data attribut
          gl.FALSE,                           // default
          5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
          5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

          if(trans[0] >= 0.4*0.8 || trans[0] <= -0.3*0.8 ){
              X *= -1;
            }
            trans[0] += X;
      
            if(trans[1] >= 0.6*0.8 || trans[1] <= -0.8*0.8 ){
              Y *= -1;
            }
            trans[1] += Y;
      
            if(trans[2] >= 0.7*0.8 || trans[2] <= -0.6*0.8){
              Z *= -1;
            }
            trans[2] += Z;
      
            gl.uniform3fv(transLoc, trans);

  
          thetaA[1] += 0.149;
          gl.uniform3fv(thetaLoc, thetaA);

          gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);
          
      }
      function drawtriangle2(){
        var triangleVertices2 = [
          0.345,-0.2, 0.7,1.0,0.6,
          0.45,-0.2, 0.3,1.0,0.2,
          0.368,-0.05, 0.2,1.0,0.7
        ];
        var triangleVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices2), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program2,'vPosition');
        var vColor = gl.getAttribLocation(program2,'vColor');
        gl.vertexAttribPointer(
          vPosition,                       
          2,                                  // jumlah elemen per attribute
          gl.FLOAT,                           // tipe data attribut
          gl.FALSE,                           // default
          5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
          5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
          if(trans1[0] >= 0.4*0.8 || trans1[0] <= -0.3*0.8 ){
            X1 *= -1;
          }
          trans1[0] += X1;
    
          if(trans1[1] >= 0.6*0.8 || trans1[1] <= -0.8*0.8 ){
            Y1 *= -1;
          }
          trans1[1] += Y1;
    
          if(trans1[2] >= 0.7*0.8 || trans1[2] <= -0.6*0.8){
            Z1 *= -1;
          }
          trans1[2] += Z1;
    
          gl.uniform3fv(transLoc1, trans1);


        thetaA1[1] += 0.149;
        gl.uniform3fv(thetaLoc1, thetaA1);

        gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      }

      resizer();
      render();
  }
    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  
  })(window || this);
  