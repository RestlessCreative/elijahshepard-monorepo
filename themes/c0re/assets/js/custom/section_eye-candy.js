if($('#eye-candy').length > 0) {
  
    
    $('.candy-item').each(function() {
      $(this).mouseenter(function(){
        var img = $(this).find('img'),
            imgSrc = img.attr('data-src');
            img.attr('src', imgSrc);
      });
    });
        
    $('#candy').mixItUp({  
      load: {
        filter: '.featured'
      },
      selectors: {
        target: '.candy-item',
        filter: '.filter',
        sort: '.sort-btn'
      },
      animation: {
          animateResizeContainer: false,
          effects: 'fade scale'
       }
    
    });
     
        /*
        this work is licensed under a Creative Commons 表示 - 非営利 - 継承 2.1 日本 License.
        http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
      */
      var AttractorPointCloudClass = function(geometry, scene) {
        this.material = new THREE.PointCloudMaterial({
          size:1,
          color:0xffffff,
          transparent:true,
          opacity:0.4,
          blending:THREE.AdditiveBlending
        });
        this.pointCloud = new THREE.PointCloud(geometry, this.material);
        this.scene = scene;
      };
      AttractorPointCloudClass.prototype = {
        add : function() {
          this.scene.add(this.pointCloud);
        },
        remove : function() {
          this.scene.remove(this.pointCloud);
        },
        update : function(param) {
          if(param.position) {
            this.pointCloud.position.x = param.position.x;
            this.pointCloud.position.y = param.position.y;
            this.pointCloud.position.z = param.position.z;
          };
          if(param.rotation) {
            this.pointCloud.rotation.x = param.rotation.x;
            this.pointCloud.rotation.y = param.rotation.y;
            this.pointCloud.rotation.z = param.rotation.z;
          };
          if(param.scale) {
            this.pointCloud.scale.x = param.scale.x;
            this.pointCloud.scale.y = param.scale.y;
            this.pointCloud.scale.z = param.scale.z;
          };
        }
      };
      var AttractorLineClass = function(scene) {
        this.scene = scene;
        this.geometry = new THREE.Geometry();
        this.material = new THREE.LineBasicMaterial({color:0xffffff, linewidth:0.5, transparent:true, opacity:0.4});
        this.line = new THREE.Line(this.geometry, this.material);
        this.param = {
          position : {x:0, y:0, z:0},
          rotation : {x:0, y:0, z:0},
          scale : {x:1, y:1, z:1},
        };
      };
      AttractorLineClass.prototype = {
        add : function() {
          this.scene.add(this.line);
        },
        remove : function() {
          this.scene.remove(this.line);
        },
        createVertices : function(geometry) {
          this.geometry.vertices = [];
          this.geometry.vertices.push(new THREE.Vector3(10000,0,0));
          for(var i=0; i<15; i++) {
            this.geometry.vertices.push(
              geometry.vertices[parseInt(50000*Math.random())]
            );
          };
          this.geometry.vertices.push(new THREE.Vector3(-10000,0,0));
        },
        update : function(param) {
          if(param.position) {
            this.line.position.x = param.position.x;
            this.line.position.y = param.position.y;
            this.line.position.z = param.position.z;
          };
          if(param.rotation) {
            this.line.rotation.x = param.rotation.x;
            this.line.rotation.y = param.rotation.y;
            this.line.rotation.z = param.rotation.z;
          };
          if(param.scale) {
            this.line.scale.x = param.scale.x*1.2;
            this.line.scale.y = param.scale.y*1.2;
            this.line.scale.z = param.scale.z*1.2;
          };
        }
      };
      var AttractorGeometryClass = function() {
        this.value = {x:0, y:0, z:0};
        this.p = [0.60,1.15,0.28,-0.19,-0.34,-0.17,-0.70,-0.69,-0.52,0.39,-0.96,0.95,0.30,-0.43,0.13,0.41,1.14,-0.65,-0.84,0.75,-0.41];
        this.pFixed = [0.60,1.15,0.28,-0.19,-0.34,-0.17,-0.70,-0.69,-0.52,0.39,-0.96,0.95,0.30,-0.43,0.13,0.41,1.14,-0.65,-0.84,0.75,-0.41];
        this.pnFlags = [];
        for(var i=0; i<this.pFixed.length; i++) this.pnFlags[i] = new closeValueClass(100, 300);
      
        this.geometry = new THREE.Geometry();
      };
      AttractorGeometryClass.prototype = {
        returnGeometry : function() {
          return this.geometry;
        },
        generate : function() {
          this.geometry.vertices = [];
          this.geometry.colors = [];
          this.value = {x:0, y:0, z:0};
      
          for (var i=0; i<50000; i++) {
            this.value = this.recursive(this.value.x, this.value.y, this.value.z);
            var vertex = new THREE.Vector3();
            vertex.x = this.value.x-1.5;
            vertex.y = this.value.y-0.25;
            vertex.z = this.value.z;
            this.geometry.vertices.push(vertex);
          }
          this.geometry.verticesNeedUpdate = true;
        },
        change : function(vol) {
          for(var i=0; i<this.p.length; i++) {
            if(i%5 == 0) {
              this.p[i] = this.pFixed[i] + this.pFixed[i]*0.2*vol*this.pnFlags[i].execution();
            };
          };
        },
        returnPN : function() {
          if(Math.random() >= 0.5) {
            return true;
          } else {
            return false;
          };
        },
        recursive : function(x, y, z) {
          return {
            x : this.p[0] + this.p[1]*x + this.p[2]*y + this.p[3]*z + this.p[4]*Math.abs(x) + this.p[5]*Math.abs(y) + this.p[6]*Math.abs(z),
            y : this.p[7] + this.p[8]*x + this.p[9]*y + this.p[10]*z + this.p[11]*Math.abs(x) + this.p[12]*Math.abs(y) + this.p[13]*Math.abs(z),
            z : this.p[14] + this.p[15]*x + this.p[16]*y + this.p[17]*z + this.p[18]*Math.abs(x) + this.p[19]*Math.abs(y) + this.p[20]*Math.abs(z)
          }	
        }
      };
      var closeValueClass = function(minTime, maxTime) {
        this.flag = 0;
        
        this.progress = 0;
        this.startTime = 0;
        this.durationTime = 0;
        
        this.fromValue = 0;
        this.toValue = 0;
        
        this.minValue = 0;
        this.maxValue = 1;
        this.minDuration = minTime;
        this.maxDuration = maxTime;
      };
      closeValueClass.prototype = {
        init : function() {
          this.durationTime = this.minDuration + (this.maxDuration-this.minDuration) * Math.random();
          this.startTime = Date.now();
          this.progress = Math.min(1, ((Date.now()-this.startTime)/this.durationTime))
          this.fromValue = this.toValue;
          this.toValue = this.minValue + this.maxValue * Math.random();
          this.flag = 1;
          return this.fromValue + (this.toValue - this.fromValue) * this.progress;
        },
        update : function() {
          this.progress = Math.min(1, ((Date.now()-this.startTime)/this.durationTime));
          if(this.progress== 1) this.flag = 0;
          return this.fromValue + (this.toValue - this.fromValue) * this.progress;
        },
        execution : function() {
          if(this.flag == 0)		{return this.init()}
          else if(this.flag == 1)	{return this.update()};
        }
      };
      var AudioDataClass = function(audioURL) {
        var self = this;
        this.xml = new XMLHttpRequest();
        this.context = new AudioContext();
        this.audioURL = audioURL;
        this.audioBuffer;
        this.sourceNode;
        this.channel = [];
        this.numberOfChannels = 0;
        this.sampleRate = 44100;
        this.loadCallback;
      };
      AudioDataClass.prototype = {
        init : function(lc) {
          var self = this;
          this.loadCallback = lc;
          this.xml.open("GET", this.audioURL);
          this.xml.send(null);
          this.xml.responseType = "arraybuffer";
          this.xml.onreadystatechange = function(e) {
            self.changed(e);
          }
        },
        changed : function(e) {
          var self = this;
          if (this.xml.readyState == 4) {
            var arraybuffer = this.xml.response;
            if(arraybuffer instanceof ArrayBuffer) {
              this.context.decodeAudioData(arraybuffer, function(audioBuffer) {
                self.audioBuffer = audioBuffer;
                self.sampleRate = self.context.sampleRate;
                self.numberOfChannels = audioBuffer.numberOfChannels;
                for(var i=0; i<self.numberOfChannels; i++) {
                  self.channel.push(new Float32Array(audioBuffer.length));
                  self.channel[i].set(audioBuffer.getChannelData(i));
                };
                if(typeof self.loadCallback === "function") {
                  audioInitFlg = true;
                  self.loadCallback();
                };
              }, function() {});
            }
          }
        },
        getVolume : function(time) {
          var returnVolume = [];
          for(var i=0; i<this.numberOfChannels; i++) {
            returnVolume.push(this.channel[i][parseInt(time*this.sampleRate)]);
          };
          return returnVolume;
        },
        play : function() {
          this.sourceNode = this.context.createBufferSource();
          this.sourceNode.buffer = this.audioBuffer;
          this.sourceNode.connect(this.context.destination);
          this.sourceNode.start(0);
        }
      };
      
      /**
       * @author alteredq / http://alteredqualia.com/
       */
      
      THREE.EffectComposer = function ( renderer, renderTarget ) {
      
        this.renderer = renderer;
      
        if ( renderTarget === undefined ) {
      
          var pixelRatio = renderer.getPixelRatio();
      
          var width  = Math.floor( renderer.context.canvas.width  / pixelRatio ) || 1;
          var height = Math.floor( renderer.context.canvas.height / pixelRatio ) || 1;
          var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };
      
          renderTarget = new THREE.WebGLRenderTarget( width, height, parameters );
      
        }
      
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
      
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
      
        this.passes = [];
      
        if ( THREE.CopyShader === undefined )
          console.error( "THREE.EffectComposer relies on THREE.CopyShader" );
      
        this.copyPass = new THREE.ShaderPass( THREE.CopyShader );
      
      };
      
      THREE.EffectComposer.prototype = {
      
        swapBuffers: function() {
      
          var tmp = this.readBuffer;
          this.readBuffer = this.writeBuffer;
          this.writeBuffer = tmp;
      
        },
      
        addPass: function ( pass ) {
      
          this.passes.push( pass );
      
        },
      
        insertPass: function ( pass, index ) {
      
          this.passes.splice( index, 0, pass );
      
        },
      
        render: function ( delta ) {
      
          this.writeBuffer = this.renderTarget1;
          this.readBuffer = this.renderTarget2;
      
          var maskActive = false;
      
          var pass, i, il = this.passes.length;
      
          for ( i = 0; i < il; i ++ ) {
      
            pass = this.passes[ i ];
      
            if ( !pass.enabled ) continue;
      
            pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );
      
            if ( pass.needsSwap ) {
      
              if ( maskActive ) {
      
                var context = this.renderer.context;
      
                context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
      
                this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );
      
                context.stencilFunc( context.EQUAL, 1, 0xffffffff );
      
              }
      
              this.swapBuffers();
      
            }
      
            if ( pass instanceof THREE.MaskPass ) {
      
              maskActive = true;
      
            } else if ( pass instanceof THREE.ClearMaskPass ) {
      
              maskActive = false;
      
            }
      
          }
      
        },
      
        reset: function ( renderTarget ) {
      
          if ( renderTarget === undefined ) {
      
            renderTarget = this.renderTarget1.clone();
      
            var pixelRatio = this.renderer.getPixelRatio();
      
            renderTarget.width  = Math.floor( this.renderer.context.canvas.width  / pixelRatio );
            renderTarget.height = Math.floor( this.renderer.context.canvas.height / pixelRatio );
      
          }
      
          this.renderTarget1 = renderTarget;
          this.renderTarget2 = renderTarget.clone();
      
          this.writeBuffer = this.renderTarget1;
          this.readBuffer = this.renderTarget2;
      
        },
      
        setSize: function ( width, height ) {
      
          var renderTarget = this.renderTarget1.clone();
      
          renderTarget.width = width;
          renderTarget.height = height;
      
          this.reset( renderTarget );
      
        }
      
      };
      /**
       * @author alteredq / http://alteredqualia.com/
       */
      
      THREE.MaskPass = function ( scene, camera ) {
      
        this.scene = scene;
        this.camera = camera;
      
        this.enabled = true;
        this.clear = true;
        this.needsSwap = false;
      
        this.inverse = false;
      
      };
      
      THREE.MaskPass.prototype = {
      
        render: function ( renderer, writeBuffer, readBuffer, delta ) {
      
          var context = renderer.context;
      
          // don't update color or depth
      
          context.colorMask( false, false, false, false );
          context.depthMask( false );
      
          // set up stencil
      
          var writeValue, clearValue;
      
          if ( this.inverse ) {
      
            writeValue = 0;
            clearValue = 1;
      
          } else {
      
            writeValue = 1;
            clearValue = 0;
      
          }
      
          context.enable( context.STENCIL_TEST );
          context.stencilOp( context.REPLACE, context.REPLACE, context.REPLACE );
          context.stencilFunc( context.ALWAYS, writeValue, 0xffffffff );
          context.clearStencil( clearValue );
      
          // draw into the stencil buffer
      
          renderer.render( this.scene, this.camera, readBuffer, this.clear );
          renderer.render( this.scene, this.camera, writeBuffer, this.clear );
      
          // re-enable update of color and depth
      
          context.colorMask( true, true, true, true );
          context.depthMask( true );
      
          // only render where stencil is set to 1
      
          context.stencilFunc( context.EQUAL, 1, 0xffffffff );  // draw if == 1
          context.stencilOp( context.KEEP, context.KEEP, context.KEEP );
      
        }
      
      };
      
      
      THREE.ClearMaskPass = function () {
      
        this.enabled = true;
      
      };
      
      THREE.ClearMaskPass.prototype = {
      
        render: function ( renderer, writeBuffer, readBuffer, delta ) {
      
          var context = renderer.context;
      
          context.disable( context.STENCIL_TEST );
      
        }
      
      };
      /**
       * @author alteredq / http://alteredqualia.com/
       */
      
      THREE.RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {
      
        this.scene = scene;
        this.camera = camera;
      
        this.overrideMaterial = overrideMaterial;
      
        this.clearColor = clearColor;
        this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;
      
        this.oldClearColor = new THREE.Color();
        this.oldClearAlpha = 1;
      
        this.enabled = true;
        this.clear = true;
        this.needsSwap = false;
      
      };
      
      THREE.RenderPass.prototype = {
      
        render: function ( renderer, writeBuffer, readBuffer, delta ) {
      
          this.scene.overrideMaterial = this.overrideMaterial;
      
          if ( this.clearColor ) {
      
            this.oldClearColor.copy( renderer.getClearColor() );
            this.oldClearAlpha = renderer.getClearAlpha();
      
            renderer.setClearColor( this.clearColor, this.clearAlpha );
      
          }
      
          renderer.render( this.scene, this.camera, readBuffer, this.clear );
      
          if ( this.clearColor ) {
      
            renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );
      
          }
      
          this.scene.overrideMaterial = null;
      
        }
      
      };
      /**
       * @author alteredq / http://alteredqualia.com/
       */
      
      THREE.ShaderPass = function ( shader, textureID ) {
      
        this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";
      
        this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );
      
        this.material = new THREE.ShaderMaterial( {
      
                defines: shader.defines || {},
          uniforms: this.uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader
      
        } );
      
        this.renderToScreen = false;
      
        this.enabled = true;
        this.needsSwap = true;
        this.clear = false;
      
      
        this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
        this.scene  = new THREE.Scene();
      
        this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
        this.scene.add( this.quad );
      
      };
      
      THREE.ShaderPass.prototype = {
      
        render: function ( renderer, writeBuffer, readBuffer, delta ) {
      
          if ( this.uniforms[ this.textureID ] ) {
      
            this.uniforms[ this.textureID ].value = readBuffer;
      
          }
      
          this.quad.material = this.material;
      
          if ( this.renderToScreen ) {
      
            renderer.render( this.scene, this.camera );
      
          } else {
      
            renderer.render( this.scene, this.camera, writeBuffer, this.clear );
      
          }
      
        }
      
      };
      /**
       * @author alteredq / http://alteredqualia.com/
       *
       * Full-screen textured quad shader
       */
      
      THREE.CopyShader = {
      
        uniforms: {
      
          "tDiffuse": { type: "t", value: null },
          "opacity":  { type: "f", value: 1.0 }
      
        },
      
        vertexShader: [
      
          "varying vec2 vUv;",
      
          "void main() {",
      
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
      
          "}"
      
        ].join("\n"),
      
        fragmentShader: [
      
          "uniform float opacity;",
      
          "uniform sampler2D tDiffuse;",
      
          "varying vec2 vUv;",
      
          "void main() {",
      
            "vec4 texel = texture2D( tDiffuse, vUv );",
            "gl_FragColor = opacity * texel;",
      
          "}"
      
        ].join("\n")
      
      };
      
      THREE.InvertShader = {
      
        uniforms: {
          "tSize": {type: "v2", value: new THREE.Vector2(0, 0)},
          "tDiffuse": {type: "t", value: null},
        },
      
        vertexShader: [
          "varying vec2 vUv;",
          "void main() {",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
          "}"
        ].join("\n"),
      
        fragmentShader: [
          "uniform sampler2D tDiffuse;",
          "varying vec2 vUv;",
          "void main() {",
            "vec4 texel = texture2D(tDiffuse, vUv);",
            "gl_FragColor = vec4(1.0-texel.x, 1.0-texel.y, 1.0-texel.z, 1.0);",
          "}"
        ].join("\n")
      
      };
      THREE.cutslideHorizonalShader = {
      
        uniforms: {
          "tSize": {type: "v2", value: new THREE.Vector2(0, 0)},
          "tDiffuse": {type: "t", value: null},
          //"rand": {type:"f", value: 0},
          "freqRand": {type:"f", value: 0},
          "slideRand": {type:"f", value: 0}
        },
      
        vertexShader: [
          "varying vec2 vUv;",
          "void main() {",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
          "}"
        ].join("\n"),
      
        fragmentShader: [
          "uniform sampler2D tDiffuse;",
          "uniform float freqRand;",
          "uniform float slideRand;",
          "varying vec2 vUv;",
          "void main() {",
            "vec4 texel = texture2D(tDiffuse, vUv);",
            "vec2 cs = vec2(floor(sin(vUv.y*freqRand))*slideRand, 0.0);",
            "vec4 texel_cs = texture2D(tDiffuse, vUv + cs);",
            "gl_FragColor = texel_cs;",
          "}"
        ].join("\n")
      
      };
      THREE.cutslideVerticalShader = {
      
        uniforms: {
          "tSize": {type: "v2", value: new THREE.Vector2(0, 0)},
          "tDiffuse": {type: "t", value: null},
          //"rand": {type:"f", value: 0},
          "freqRand": {type:"f", value: 0},
          "slideRand": {type:"f", value: 0}
        },
      
        vertexShader: [
          "varying vec2 vUv;",
          "void main() {",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
          "}"
        ].join("\n"),
      
        fragmentShader: [
          "uniform sampler2D tDiffuse;",
          "uniform float freqRand;",
          "uniform float slideRand;",
          "varying vec2 vUv;",
          "void main() {",
            "vec4 texel = texture2D(tDiffuse, vUv);",
            "vec2 cs = vec2(0.0, floor(sin(vUv.x*freqRand))*slideRand);",
            "vec4 texel_cs = texture2D(tDiffuse, vUv + cs);",
            "gl_FragColor = texel_cs;",
          "}"
        ].join("\n")
      
      };
      THREE.ShakerShader = {
      
        uniforms: {
          "tSize": {type: "v2", value: new THREE.Vector2(0, 0)},
          "tDiffuse": {type: "t", value: null},
          "rand": {type: "v2", value: new THREE.Vector2(0.0, 0.0)},
        },
      
        vertexShader: [
          "varying vec2 vUv;",
          "void main() {",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
          "}"
        ].join("\n"),
      
        fragmentShader: [
          "uniform sampler2D tDiffuse;",
          "uniform vec2 rand;",
          "varying vec2 vUv;",
          "void main() {",
            "vec4 texel = texture2D(tDiffuse, vUv+rand);",
            "gl_FragColor = texel;",
          "}"
        ].join("\n")
      
      };
      THREE.RGBShiftShader = {
      
        uniforms: {
      
          "tDiffuse": { type: "t", value: null },
          "ramount":   { type: "f", value: 0.00 },
          "gamount":   { type: "f", value: 0.00 },
          "bamount":   { type: "f", value: 0.00 },
          "rangle":    { type: "f", value: 0.0 },
          "gangle":    { type: "f", value: 0.0 },
          "bangle":    { type: "f", value: 0.0 }
      
        },
      
        vertexShader: [
      
          "varying vec2 vUv;",
      
          "void main() {",
      
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
      
          "}"
      
        ].join("\n"),
      
        fragmentShader: [
      
          "uniform sampler2D tDiffuse;",
          "uniform float ramount;",
          "uniform float gamount;",
          "uniform float bamount;",
          "uniform float rangle;",
          "uniform float gangle;",
          "uniform float bangle;",
      
          "varying vec2 vUv;",
      
          "void main() {",
      
            "vec2 roffset = ramount * vec2( cos(rangle), sin(rangle));",
            "vec2 goffset = gamount * vec2( cos(gangle), sin(gangle));",
            "vec2 boffset = bamount * vec2( cos(bangle), sin(bangle));",
            "vec4 cr = texture2D(tDiffuse, vUv + roffset);",
            "vec4 cg = texture2D(tDiffuse, vUv + goffset);",
            "vec4 cb = texture2D(tDiffuse, vUv + boffset);",
            "gl_FragColor = vec4(cr.r, cg.g, cb.b, 1.0);",
      
          "}"
      
        ].join("\n")
      
      };
      
      
      var camera, scene, renderer;
      var composer, toScreen;
      var effectCoefficientX, effectCoefficientY;
      var volume = 0;
      var audioInitFlg = false;
      var initVisualizer = function() {
          //environment
          camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 3000);
          camera.position.z = 1000;
          scene = new THREE.Scene();
          renderer = new THREE.WebGLRenderer({antialias: true, precision:"lowp"});
          renderer.setSize(window.innerWidth, window.innerHeight);
          document.getElementById("bg-wrap").appendChild(renderer.domElement);
      
          /*event setter*/
          window.addEventListener('resize', function() {
              renderer.setSize(window.innerWidth, window.innerHeight);
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
          }, false );
      
          var downFlg = false;
          effectCoefficientX = 0.5;
          effectCoefficientY = 0.5;
          window.addEventListener('mousedown', function(e) {
              downFlg = true;
          }, false);
          window.addEventListener('mousemove', function(e) {
              if(downFlg) {
                  effectCoefficientX = e.offsetX/window.innerWidth *2;
                  effectCoefficientY = e.offsetY/window.innerHeight *2;
              };
          }, false);
          window.addEventListener('mouseup', function(e) {
              effectCoefficientX = 1;
              effectCoefficientY = 1;
              downFlg = false;
          }, false);
      
          window.addEventListener('touchstart', function(e) {
              downFlg = true;
          }, false);
          window.addEventListener('touchmove', function(e) {
              if(downFlg) {
                  effectCoefficientX = e.touches[0].pageX/window.innerWidth *2;
                  effectCoefficientY = e.touches[0].pageY/window.innerHeight *2;
              };
          }, false);
          window.addEventListener('touchend', function(e) {
              effectCoefficientX = 1;
              effectCoefficientY = 1;
              downFlg = false;
          }, false);
          //environment
      
      
          //effect
          composer = new THREE.EffectComposer(renderer);
          composer.addPass(new THREE.RenderPass(scene, camera));
      
          invertPass = new THREE.ShaderPass(THREE.InvertShader);
          invertPass.enabled = false;
          composer.addPass(invertPass);
      
          cutslideHorizonalPass = new THREE.ShaderPass(THREE.cutslideHorizonalShader);
          cutslideHorizonalPass.enabled = true;
          composer.addPass(cutslideHorizonalPass);
      
          cutslideVerticalPass = new THREE.ShaderPass(THREE.cutslideVerticalShader);
          cutslideVerticalPass.enabled = true;
          composer.addPass(cutslideVerticalPass);
      
          shakerPass = new THREE.ShaderPass(THREE.ShakerShader);
          shakerPass.enabled = true;
          composer.addPass(shakerPass);
      
          rgbShiftPass = new THREE.ShaderPass(THREE.RGBShiftShader);
          rgbShiftPass.enabled = true;
          composer.addPass(rgbShiftPass);
      
          toScreen = new THREE.ShaderPass(THREE.CopyShader);
          toScreen.renderToScreen = true;
          composer.addPass(toScreen);
          //effect
      
          //object
          controll.init();
          //object
      
          //starter
          animate();
          //audioInstance.play();
          //starter
      
      }
      var controll = {
          attractors : [],
          lines : [],
          geometry : {},
          parameters : [],
          closeValues : [],
          init : function() {
              this.geometry = new AttractorGeometryClass();
              for(var i=0; i<2; i++) {
                  this.attractors.push(new AttractorPointCloudClass(this.geometry.returnGeometry(), scene));
                  this.lines.push(new AttractorLineClass(scene));
              };
              for(var i=0; i<2; i++) {
                  this.attractors[i].add();
                  this.lines[i].add();
              };
              this.parametersInit();
          },
          parametersInit : function() {
              for(var i=0; i<3; i++) { //3 common
                  this.parameters.push({
                      p:{x:0, y:0, z:0},
                      r:{x:0, y:0, z:0},
                      s:{x:0, y:0, z:0}
                  });
                  this.closeValues.push({
                      position : {
                          x:new closeValueClass(200, 400),
                          y:new closeValueClass(200, 400),
                          z:new closeValueClass(200, 400),
                          t:new closeValueClass(200, 400)},
                      rotation : {
                          x:new closeValueClass(200, 700),
                          y:new closeValueClass(200, 700),
                          z:new closeValueClass(200, 700),
                          t:new closeValueClass(300, 500)},
                      scale : {
                          s:new closeValueClass(500, 1000),
                          t:new closeValueClass(400, 700)},
                      line : new closeValueClass(50, 100)
                  });
              };
              this.geometry.generate();
          },
          update : function() {
              if(audioInitFlg) {
                  this.geometry.change(audioInstance.getVolume(audioInstance.context.currentTime)[0]);
              } else {
                  this.geometry.change(this.closeValues[0].rotation.z.execution());
              };
              this.geometry.generate();
              var cvpx = [];
              var cvpy = [];
              var cvpz = [];
              var cvpt = [];
              var cvrx = [];
              var cvry = [];
              var cvrz = [];
              var cvrt = [];
              var cvs = [];
              var cvst = [];
              for(var i=0; i<3; i++) {
                  cvpx[i] = this.closeValues[i].position.x.execution();
                  cvpy[i] = this.closeValues[i].position.y.execution();
                  cvpz[i] = this.closeValues[i].position.z.execution();
                  cvpt[i] = this.closeValues[i].position.t.execution();
                  cvrx[i] = this.closeValues[i].rotation.x.execution();
                  cvry[i] = this.closeValues[i].rotation.y.execution();
                  cvrz[i] = this.closeValues[i].rotation.z.execution();
                  cvrt[i] = this.closeValues[i].rotation.t.execution();
                  cvs[i] = this.closeValues[i].scale.s.execution();
                  cvst[i] = this.closeValues[i].scale.t.execution();
              };
              for(var i=0; i<2; i++) {
                  if(audioInitFlg) {
                      volume = audioInstance.getVolume(audioInstance.context.currentTime)[i];
                  } else {
                      volume = Math.random()*2-1;
                  };
                  if(volume>0.075 || -0.075>volume) {
                      if(i%2 === 0) {
                          var reversal = -1;
                      } else {
                          var reversal = 1;
                      };
                      if(cvpt[i] > 0.8) {
                          this.parameters[i].p.x = volume*100*reversal;
                      } else {
                          this.parameters[i].p.x = 50*reversal;
                      };
                      this.parameters[i].p.y = 0;
                      this.parameters[i].p.z = 0;
      
                      if(volume > 0.2) {
                      } else if(cvrt[2] > 0.3) {
                          this.parameters[i].r.x = 3.14*2*cvrx[2];
                          this.parameters[i].r.y = 3.14*2*reversal*cvry[2];
                          this.parameters[i].r.z = 3.14*2*reversal*cvrz[2];
                      } else if(cvrt[2] > 0.0) {
                          this.parameters[i].r.x = 3.14*2*cvrx[i];
                          this.parameters[i].r.y = 3.14*2*reversal*cvry[i];
                          this.parameters[i].r.z = 3.14*2*reversal*cvrz[i];
                      };
                      if(Math.max(volume, Math.abs(volume)) > 0.3) {
                          this.parameters[i].s.x += ((300*reversal*volume+300*reversal)-this.parameters[i].s.x)/8;
                          this.parameters[i].s.y += ((300*volume+300)-this.parameters[i].s.y)/8;
                          this.parameters[i].s.z += ((300*volume+300)-this.parameters[i].s.z)/8;
                      } else if(Math.max(volume, Math.abs(volume)) > 0.15) {
                          this.parameters[i].s.x = cvs[i]*100*reversal + 250*reversal;
                          this.parameters[i].s.y = cvs[i]*100 + 250;
                          this.parameters[i].s.z = cvs[i]*100 + 250;
                      } else {
                          this.parameters[i].s.x = 200*reversal;
                          this.parameters[i].s.y = this.parameters[i].s.z = 200;
                      };
      
                      this.attractors[i].update({
                          position : {x:this.parameters[i].p.x, y:this.parameters[i].p.y, z:this.parameters[i].p.z},
                          rotation : {x:this.parameters[i].r.x, y:this.parameters[i].r.y, z:this.parameters[i].r.z},
                          scale : {x:this.parameters[i].s.x, y:this.parameters[i].s.y, z:this.parameters[i].s.z}
                      });
                      
                      if(Math.random() > 0.3) {
                          this.lines[i].material.opacity = 0.4;
                      } else{
                          this.lines[i].material.opacity = 0;
                      };
                      this.lines[i].createVertices(this.geometry.geometry);
                      this.lines[i].update({
                          position : {x:this.parameters[i].p.x, y:this.parameters[i].p.y, z:this.parameters[i].p.z},
                          rotation : {x:this.parameters[i].r.x, y:this.parameters[i].r.y, z:this.parameters[i].r.z},
                          scale : {x:this.parameters[i].s.x, y:this.parameters[i].s.y, z:this.parameters[i].s.z}
                      });
                  } else {
                  };
              };
          }
      }
      
      var effect = {
          RGBThCV : new closeValueClass(100, 400),
          RGBamountCV : new closeValueClass(200, 700),
          csTh : new closeValueClass(100, 400),
          freqThCV : new closeValueClass(100, 400),
          slideCV : new closeValueClass(25, 30),
          shakerCV : new closeValueClass(100, 400),
          invertCV : new closeValueClass(50, 150),
          update : function() {
              if(this.invertCV.execution() < 0.15 * effectCoefficientX) {
                  invertPass.enabled = true;
              } else {
                  invertPass.enabled = false;
              };
      
              if(this.csTh.execution() < 0.25 * effectCoefficientX) {
                  cutslideHorizonalPass.uniforms.freqRand.value = 
                      Math.floor(this.freqThCV.execution()*4) * 6;
                  cutslideHorizonalPass.uniforms.slideRand.value = 
                      (this.slideCV.execution() * 0.2 - 0.1) * effectCoefficientX;
                  cutslideVerticalPass.uniforms.freqRand.value = 
                      Math.floor(this.freqThCV.execution()*6) * 6;
                  cutslideVerticalPass.uniforms.slideRand.value = 
                      (this.slideCV.execution() * 0.2 - 0.1) * effectCoefficientX;
              } else {
                  cutslideHorizonalPass.uniforms.freqRand.value = 0;
                  cutslideHorizonalPass.uniforms.slideRand.value = 0;
                  cutslideVerticalPass.uniforms.freqRand.value = 0;
                  cutslideVerticalPass.uniforms.slideRand.value = 0;
              };
      
              if(effectCoefficientX*effectCoefficientY*this.shakerCV.execution() > 3) {
                  shakerPass.uniforms.rand.value.x = Math.random()*0.1-0.05;
                  shakerPass.uniforms.rand.value.y = Math.random()*0.1-0.05;
              };
      
              if(this.RGBThCV.execution() < 0.25*effectCoefficientY) {
                  rgbShiftPass.uniforms.ramount.value = Math.floor(this.RGBamountCV.execution()*4) * 0.005;
                  rgbShiftPass.uniforms.bamount.value = -Math.floor(this.RGBamountCV.execution()*4) * 0.005;
              } else if(this.RGBThCV.execution() < 0.5*effectCoefficientY) {
                  rgbShiftPass.uniforms.ramount.value = 0.0;
                  rgbShiftPass.uniforms.bamount.value = 0.0;
              } else {
                  rgbShiftPass.uniforms.ramount.value = 0.004;
                  rgbShiftPass.uniforms.bamount.value = 0.004;
              };
          }
      };
      
      var animate = function() {
          effect.update();
          controll.update();
          composer.render();
          requestAnimationFrame(animate);
      };
      
      src = "https://assets.elijahshepard.com/es-main/ear-worms/tracks/elijah-shepard_montage-new.mp3";
      audioInstance = new AudioDataClass(src);
      audioInstance.init(audioInstance.play);
      initVisualizer();
      
      var sound = new Howl({
        src: ['https://assets.elijahshepard.com/es-main/ear-worms/tracks/elijah-shepard_montage-new.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
      });
      sound.play();       
  
}