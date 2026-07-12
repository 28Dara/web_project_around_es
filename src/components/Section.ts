import type { SectionConfig, RendererFunction } from "../types/types.js";

export class Section<T> {
  private items: T[];
  private renderer: RendererFunction<T>;
  private container: HTMLElement;

  constructor(
    { items, renderer }: SectionConfig<T>,
    containerSelector: string,
  ) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(
      containerSelector,
    ) as HTMLElement;
  }

  renderItems(): void {
    this.items.forEach((item) => {
        this.renderer(item);
    });
  }

  addItem(element: HTMLElement): void {
    this.container.append(element);
  }
}