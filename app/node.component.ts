import { Component, Input, AfterViewInit } from '@angular/core';
import { jsPlumb } from 'jsplumb';

export interface Node {
  id: string;
  top?: number;
  left?: number;
  title: string;
}

@Component({
  selector: 'node',
  templateUrl: `node.component.html`,
  styles: [`.node {position: absolute;width: 150px;height: 50px;
  padding: 4px;box-shadow: 0 10px 40px 0 #B0C1D9;text-align: center;}`]
})
export class NodeComponent implements AfterViewInit {
  @Input() node: Node;

  @Input() jsPlumbInstance;

  rows = ['Option 1', 'Option 2', 'Option 3'];

  ngAfterViewInit() {
    const exampleDropOptions = {
      tolerance: 'touch',
      hoverClass: 'dropHover',
      activeClass: 'dragActive'
    };
    let Endpoint1 = {
      endpoint: ['Blank', {src: "img/arrow.png", width: 20, height: 20}],
      paintStyle: { fill: '#99cb3a' },
      isSource: true,
      scope: 'jsPlumb_DefaultScope',
      connectorStyle: { stroke: '#99cb3a', strokeWidth: 3 },
      connector: ['Bezier', { curviness: 63 }],
      maxConnections: 30,
      isTarget: false,
      connectorOverlays: [['Arrow', { location: 1 }]],
      dropOptions: exampleDropOptions
    };
    let Endpoint2 = {
      endpoint: ["Blank", { width: 5, height: 5}],
      paintStyle: { fill: '#ffcb3a' },
      isSource: false,
      scope: 'jsPlumb_DefaultScope',
      maxConnections: 1,
      isTarget: true,
      dropOptions: exampleDropOptions
    };
    const { id } = this.node;
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Bottom', uuid: id + '_bottom' }, Endpoint1);
    this.rows.forEach((row, index) => {
      const rowId = id+index;
       this.jsPlumbInstance.addEndpoint(rowId, { anchor: 'Right', uuid: rowId + '_right' }, Endpoint1);
      this.jsPlumbInstance.makeSource(rowId, Endpoint1);
    });
    this.jsPlumbInstance.makeTarget(id+'-title', Endpoint2);
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Top', uuid: id + '_top' }, Endpoint2);
    this.jsPlumbInstance.draggable(id);
  }

}
