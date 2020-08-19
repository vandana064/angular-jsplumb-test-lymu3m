import {
  ComponentRef,
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core';
import { jsPlumb } from 'jsplumb';

import { NodeComponent, Node } from './node.component';

@Injectable()
export class NodeService {

  private rootViewContainer: any;

  jsPlumbInstance; 

  constructor(private factoryResolver: ComponentFactoryResolver) {
    
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.jsPlumbInstance.importDefaults({Anchors: ['Right', 'Top']});
   }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
    this.jsPlumbInstance.setContainer('container');
    window['plumber'] = this.jsPlumbInstance;

  }

  public addDynamicNode(node: Node) {
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;
    this.rootViewContainer.insert(component.hostView);
    console.log("in NodeService.." , component.instance );
  }
 
  addConnection(connection) {
    this.jsPlumbInstance.connect({ uuids: connection.uuids });
  }

  public clear() {
    this.rootViewContainer.clear();
  }
}

