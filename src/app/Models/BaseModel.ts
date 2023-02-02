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

    static validateDate(d:string |null) {
        if(d == null) return "";
        if(d.length >= 10) d = d.substring(0,10);
        if (d ==="0001-01-01"){
          return "";
        }else{
          return d;
        }
      }
}

