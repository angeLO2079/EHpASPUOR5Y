// 代码生成时间: 2025-10-15 21:22:55
import { Component, Prop, Vue } from 'vue-property-decorator';

// Define the breadcrumb item interface
interface BreadcrumbItem {
  name: string;
  url: string;
  icon?: string; // Optional property for breadcrumb item icon
}

@Component
export default class BreadcrumbComponent extends Vue {
  // Props for the breadcrumb component
  @Prop({ type: Array, default: () => [] })
  private breadcrumbs!: BreadcrumbItem[];

  // Computed property to determine if breadcrumbs array is empty
  private get isEmpty(): boolean {
    return this.breadcrumbs.length === 0;
  }

  // Method to handle the click event on a breadcrumb item
  private onBreadcrumbClick(item: BreadcrumbItem): void {
    if (!item.url) {
      // Handle error if URL is missing for a breadcrumb item
      console.error('Breadcrumb URL is missing.', item);
      return;
    }
    // Navigate to the URL of the clicked breadcrumb item
    window.location.href = item.url;
  }

  // Render function to display the breadcrumb component
  public render(h: Function): any {
    if (this.isEmpty) {
      // If there are no breadcrumbs, render nothing
      return null;
    }

    // Create the breadcrumb navigation list
    const breadcrumbList = h('ol', {
      class: 'breadcrumb'
    }, this.breadcrumbs.map((item, index) => {
      // Determine if the current item is the last one
      const isLast = index === this.breadcrumbs.length - 1;

      // Render the breadcrumb item as a list item
      return h('li', {
        class: { 'breadcrumb-item': true, 'active': isLast },
        on: { click: () => this.onBreadcrumbClick(item) }
      }, [
        // Render the icon if available
        item.icon ? h('i', { class: item.icon }) : null,
        // Render the name of the breadcrumb item
        h('span', item.name)
      ]);
    }));

    return breadcrumbList;
  }
}
