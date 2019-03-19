# UI Decorators

A TypeScript project to decorate classes with UI annotations.


### Usage

```typescript
import UIComponent, { field } from "ui-decorators";

export default class TodoItem extends UIComponent {
    @field({ label: "Name", transform: val => val.toUpperCase() })
    itemName: string;

    @field({ label: "Description", transform: val => val })
    itemDescription: string;

    constructor(itemName: string, itemDescription: string) {
        super();
        this.itemName = itemName;
        this.itemDescription = itemDescription;
    }
}

const item = new TodoItem("Finish chores", "Finish all of my chores");
console.log(item.renderComponent());
```

Which will return a JSON object that looks like:

```json
{
    "fields": [
        {
            "label": "Name",
            "type": "field",
            "value": "FINISH CHORES"
        },
        {
            "label": "Description",
            "type": "field",
            "value": "Finish all of my chores"
        }
    ]
}
```