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

    constructor() {
        super();
        for (itemName: string, itemDescription: string) {
            this.itemName = itemName;
            this.itemDescription = itemDescription;
        }
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

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)