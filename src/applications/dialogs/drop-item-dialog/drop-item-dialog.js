import DropItemDialogShell from "./drop-item-dialog-shell.svelte";
import { SvelteApplication } from '@typhonjs-fvtt/runtime/svelte/application';
import { getActiveApps } from "../../../helpers/helpers";

export default class DropItemDialog extends SvelteApplication {

  /**
   *
   * @param item
   * @param target
   * @param options
   */
  constructor(item, target, options = {
    localizationTitle: "DropItem"
  }) {
    super({
      title: game.i18n.localize(`ITEM-PILES.Applications.${options.localizationTitle}.Title`),
      id: `item-pile-drop-item-${item.id}${target ? "-" + target.id : ""}-${randomID()}`,
      svelte: {
        class: DropItemDialogShell,
        target: document.body,
        props: {
          item,
          target
        }
      },
      close: () => this.options.resolve?.(null),
      ...options
    });
    this.item = item;
    this.target = target;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 430,
      height: "auto",
      classes: ["item-piles-app"]
    })
  }

  static getActiveApps(id) {
    return getActiveApps(`item-pile-drop-item-${id}`);
  }

  static async show(item, target, options = {
    localizationTitle: "DropItem"
  }) {
    const apps = this.getActiveApps(item.id + (target ? "-" + target.id : ""));
    if (apps.length) {
      for (let app of apps) {
        app.render(false, { focus: true });
      }
      return;
    }
    return new Promise((resolve) => {
      options.resolve = resolve;
      new this(item, target, options).render(true, { focus: true });
    })
  }

}
