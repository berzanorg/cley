export type Handler<T extends string> = (
    params: Params<T>
) => Promise<void> | void

type Params<T extends string> = T extends `${infer K} ${infer L}`
    ? ParamsInner<L>
    : {}

type ParamsInner<T extends string> = T extends `<${infer K}> ${infer L}`
    ? Objectify<K> & ParamsInner<L>
    : T extends `-${infer K} ${infer L}`
    ? Objectify<K> & ParamsInner<L>
    : T extends `<${infer K}>`
    ? Objectify<K>
    : T extends `-${infer K}`
    ? Objectify<K>
    : never

type Objectify<T extends string> = T extends `${infer K}?`
    ? { [key in K]?: string }
    : { [key in T]: string }
