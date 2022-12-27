export abstract class Base {
    public abstract getDataToFilter(): string;

    static Filtrar<Type extends Base>(arg: Type[], filtro: string): Type[] {
        if (filtro == "") {
            return arg;
        } else {
            let result = arg.filter(
                (x: Type) => {
                    return x.getDataToFilter().toLowerCase().match(filtro.toLowerCase())
                }
            );
            return result;
        }
    }

    static validateDate(d:string) {
        if (d ==="0001-01-01T00:00:00"){
          return "";
        }else{
          return d;
        }
      }
}

