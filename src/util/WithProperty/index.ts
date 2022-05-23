type WithProperty<T, K extends string, V> = T & { [k in K]: V };

export default WithProperty;
