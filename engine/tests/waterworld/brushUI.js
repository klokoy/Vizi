BrushUIPrefab = function(param) {

	param = param || {};
	
	var obj = new Vizi.Object;

	var i, len = BrushUIScript.urls.length;
	for (i = 0; i < len; i++) {

		
		var map = new THREE.ImageUtils.loadTexture(BrushUIScript.urls[i]);
		
		/*
		var geometry = new THREE.PlaneGeometry(.2, .2);
		var material = new THREE.MeshBasicMaterial({
			map: map,
			transparent:true,
//			opacity:.8,
		});
		
		var mesh = new THREE.Mesh(geometry, material);
		*/
		
		var mesh = BrushUIScript.createMesh(i);
		
		mesh.visible = (i == 0);
		var visual = new Vizi.Visual({object:mesh});
		obj.addComponent(visual);
		
	}	

	obj.transform.position.set(0, 0, -1);

	var brushUIScript = new BrushUIScript(param);
	obj.addComponent(brushUIScript);
	
	return obj;
}

BrushUIScript = function(param) {
	
	this.visuals = [];
	this.brushIndex = 0;
	this.brushes = param.brushes;
	this.brushDirection = new THREE.Vector3;
	this.brushPosition = new THREE.Vector3;
	this.cameraPosition = new THREE.Vector3;
}

goog.inherits(BrushUIScript, Vizi.Script);

BrushUIScript.prototype.realize = function() {
	
	var visuals = this._object.getComponents(Vizi.Visual);
	var i, len = visuals.length;
	for (i = 0; i < len; i++) {
		this.visuals.push(visuals[i]);
	}
}

BrushUIScript.prototype.update = function() {

	return;
	if (this.brushes) {
		var brushes = this.brushes.brushes;
		var brush = brushes[this.brushIndex];
		if (brush) {
			if (true) {
				this._object.transform.position.z = -brush.distanceFromPlayer / 10;
			}
			else {
				this.brushDirection.set(0, 0, -1);
				this.brushDirection.transformDirection(Vizi.Graphics.instance.camera.matrixWorld);
				this.brushDirection.multiplyScalar(brush.distanceFromPlayer);
				this.cameraPosition.setFromMatrixPosition(Vizi.Graphics.instance.camera.matrixWorld);
				this.brushPosition.copy(this.cameraPosition).add(this.brushDirection);
				this._object.transform.position.copy(this.brushPosition);
				this._object.transform.lookAt(this.cameraPosition);
			}
// );
		}
	}
}

BrushUIScript.prototype.setBrush = function(index) {
	
	if (index >= this.visuals.length)
		index = this.visuals.length - 1;
	
	if (index < 0)
		return;
	
	var visual = this.visuals[this.brushIndex];
	if (visual) {
		visual.object.visible = false;
	}
	
	visual = this.visuals[index];
	if (visual) {
		visual.object.visible = true;
	}
	
	this.brushIndex = index;
}

BrushUIScript.prototype.setBrushes = function(brushes) {
	this.brushes = brushes;
}

BrushUIScript.createMesh = function(index) {
	
	var geometry, color = 0;
	
	switch (index) {
		case 0 : // wand
			geometry = new THREE.SphereGeometry(BrushUIScript.BRUSH_SIZE / 2, 16, 16);
			color = 0x00ff00;
			break;
		case 1 : // fire
			geometry = new THREE.CylinderGeometry(0, BrushUIScript.BRUSH_SIZE / 3, BrushUIScript.BRUSH_SIZE, 16, 16);
			color = 0xffaa00;
			break;
		case 2 : // bubbles
			geometry = new THREE.SphereGeometry(BrushUIScript.BRUSH_SIZE / 2, 16, 16);
			color = 0x0044ff;
			break;
		case 3 : // fireflies
			geometry = new THREE.CylinderGeometry(BrushUIScript.BRUSH_SIZE / 6, BrushUIScript.BRUSH_SIZE / 6, BrushUIScript.BRUSH_SIZE, 16, 16);
			color = 0xffff00;
			break;
	}
	
	// var map = new THREE.ImageUtils.loadTexture(BrushUIScript.urls[index]);
	var map = null;
	
	if (geometry) {
		return new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:color, map:map, transparent:true, opacity:.5}));
	}
	else {
		return null;
	}
}

BrushUIScript.urls = [
                      "../images/smokeparticlebrush.png",
                      "../images/firebrush.png",
                      "../images/bubblesbrush.png",
                      "../images/fireflybrush.png",
                      ];

BrushUIScript.textures = [
                      ];

BrushUIScript.BRUSH_SIZE = .16;