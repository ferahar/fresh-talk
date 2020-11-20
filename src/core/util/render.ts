import { Component } from "../component/component"

export function render(query: string, block: Component) {
    const root = document.querySelector(query);
    if (!root)  return
    root.appendChild( (block as any).getContent() );
    return root;
}