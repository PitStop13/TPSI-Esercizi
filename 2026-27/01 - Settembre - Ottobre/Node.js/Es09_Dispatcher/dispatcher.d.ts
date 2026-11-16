declare class Dispatcher {
    prompt: string;
    listeners: any;
    constructor();
    addListener(metodo: string, risorsa: string, callBack: any): void;
    dispatch(req: any, res: any): void;
    private innerDispatch;
}
declare const _default: Dispatcher;
export default _default;
//# sourceMappingURL=dispatcher.d.ts.map