/**
 * @fileoverview A Visual containing a cube mesh.
 * @author Tony Parisi
 */
goog.provide('Vizi.CubeVisual');
goog.require('Vizi.Visual');

/**
 * @param {Object} param supports the following options:
 *   radiusTop (number): The top radius of the cylinder
 *   radiusBottom (number): The bottom radius of the cylinder
 *   height (number): The height of the cylinder
 *   segmentsRadius (number): The radius of the segments
 *   segmentsHeight (number): The height of the segments
 *   openEnded (boolean): Whether the cylinder is open ended
 * @constructor
 * @extends {Vizi.Visual}
 */
Vizi.CubeVisual = function(param) {
    Vizi.Visual.call(this, param);

    this.param = param || {};
}

goog.inherits(Vizi.CubeVisual, Vizi.Visual);

Vizi.CubeVisual.prototype.realize = function()
{
	Vizi.Visual.prototype.realize.call(this);
	
    var width = this.param.width || 2.0;
    var height = this.param.height || 2.0;
    var depth = this.param.depth || 2.0;
    var color;
    if (this.param.color === null)
    {
    	color = 0x808080;
    }
    else
    {
    	color = this.param.color;
    }
    
    var map = this.param.map;
    
    var ambient = this.param.ambient || 0;
    
	var geometry = new THREE.CubeGeometry(width, height, depth);
	this.object = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial( { color: color, map:map, opacity: 1, ambient: ambient, transparent: false, wireframe: false } ));
	
    this.addToScene();
}
