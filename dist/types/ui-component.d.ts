export interface Component {
    fields: Array<any>;
    source: any;
    tables: Array<any>;
}
export default class UIComponent {
    renderComponent(): Component;
}
