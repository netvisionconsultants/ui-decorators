# UI Decorators

A TypeScript project to decorate classes with UI annotations.

### Docs
https://netvisionconsultants.github.io/ui-decorators

### Why?

This project was the result of wanting to decorate TypeScript classes and members with UI specific code for rendering in a web application. This allows the developer to create a plain TypeScript class as a data transfer object, but adds an additional `renderDocument()` method which will provide the UI specific rendering of the object. This object can then be passed to a web application for dynamic result rendering.


### Usage

```typescript
import UIDocument, {
    field,
    link,
    table,
    documentId,
    source
} from "ui-decorators";

@source('MyTodoList')
export default class TodoItem extends UIDocument {
    @documentId()
    id: string;

    @field({ label: "Name", transform: val => val.toUpperCase() })
    itemName: string;

    @field({ label: "Description", transform: val => val })
    itemDescription: string;

    @table({
        label: 'Sub Tasks',
        columns: ['id', 'name', 'description'],
        sortingColumn: 'id',
        sortOrder: SortOrder.DESC
    })
    subTasks: Array<String>

    constructor(itemName: string, itemDescription: string, subTasks: Array<String>, id: string) {
        super();
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.subTasks = subTasks;
        this.id = id;
    }
}
const subTasks = [
    { id: 1, name: 'washDog', 'Give the dog a bath' },
    { id: 2, name: 'washCat', 'Give the cat a bath' },
    { id: 3, name: 'cleanRoom', 'Clean out my room' },
]
const item = new TodoItem('Finish chores', 'Finish all of my chores', subTasks, 'uuid-1234');
console.log(item.renderDocument());
```

Which will return a JSON object that looks like:

```json
{
    "source": "MyTodoList",
    "documentId": "uuid-1234",
    "components": [
        {
            "label": "Name",
            "type": "field",
            "value": "FINISH CHORES"
        },
        {
            "label": "Description",
            "type": "field",
            "value": "Finish all of my chores"
        },
        {
            "label": "Sub Tasks",
            "columns": ["id", "name", "description"],
            "type": "table",
            "value": [
                [3, "cleanRoom", "Clean out my room"],
                [2, "washCat", "Give the cat a bath"],
                [1, "washDog", "Give the dog a bath"]
            ]
        }
    ],
}
```
