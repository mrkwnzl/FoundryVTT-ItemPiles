import { TJSDialog } from '@typhonjs-fvtt/runtime/svelte/application';
import ItemFiltersShell from './item-filters-editor.svelte';

export default class ItemFiltersEditor extends TJSDialog {

  constructor(data = false, options, dialogData = {}) {
    super({
      ...dialogData,
      title: "ITEM-PILES.Applications.FilterEditor.Title",
      content: {
        class: ItemFiltersShell,
        props: {
          itemFilters: data
        }
      },
      buttons: {
        save: {
          icon: 'fas fa-save',
          label: "ITEM-PILES.Applications.FilterEditor.Submit",
          onclick: "requestSubmit"
        },
        no: {
          icon: 'fas fa-times',
          label: 'Cancel',
          onclick: () => {
            this.options.resolve(false);
            this.close();
          }
        }
      },
      zIndex: 102,
      default: 'save',
      autoClose: false, // Don't automatically close on button onclick.
      close: () => this.options.resolve(null)
    }, {
      width: 400,
      height: "auto",
      ...options
    });
  }

  static async show(data = false, options = {}, dialogData = {}) {
    return new Promise((resolve) => {
      options.resolve = resolve;
      new this(data, options, dialogData).render(true, { focus: true });
    })
  }
}