import 'reflect-metadata'

// plainToClass
import { plainToClass } from 'class-transformer'

class IceCream {
  constructor(
    public flavor: string,
    public toppings: string[]
  ) {}
}

const iceCreamPlain = {
  flavor: 'vanilla',
  toppings: [ 'chocolate chip', 'nougat' ],
  crap: 2 // будет добавлен так или иначе
}

const iceCreamReal = plainToClass(IceCream, iceCreamPlain)

console.log(iceCreamReal); // IceCream { ... }

// plainToClass -- работает и с массивами
const iceCreamPlainArr = [
  {
    flavor: 'caramel',
    toppings: 'nougat', // !1!
  },
  {
    flavor: 'cherry'
    // toppings отсутствует, будет undefined поле
  }
]
const iceCreamRealArr = plainToClass(IceCream, iceCreamPlainArr)
console.log(iceCreamRealArr);
console.log(typeof iceCreamRealArr[0].toppings) // !1! заметим, что строгая типизация будет проигнорирована, строка заменит массив строк

// plainToClassFromExist
// Делает новый объект класса из существующего инстанса 
import { plainToClassFromExist } from 'class-transformer'
const existingIceCream = new IceCream('EGG', [ 'potato' ])
const existingPlain = { 
  flavor: 'DOUBLE EGG', // flavor will be overwritten
  crap: 8 // crap will be added
} 
const existingNewFromPlain = plainToClassFromExist(existingIceCream, existingPlain) // ИСХОДНЫЙ ИНСТАНС ПЕРЕЗАПИСЫВАЕТСЯ
console.log(existingIceCream);
console.log(existingNewFromPlain);
console.log(existingIceCream === existingNewFromPlain);


// class to plain
// трансформация инстанса в простой JS-объект, который к сериализации
import { classToPlain } from 'class-transformer'
const plainFromIceCream = classToPlain(existingNewFromPlain)
console.log(plainFromIceCream); // { ... }

// classToClass
// трансформация инстанса в новый инстанс того же класса
// глубокое копирование, в общем то
import { classToClass } from 'class-transformer'
const clonedIceCream = classToClass(existingNewFromPlain)
console.log(clonedIceCream); // копирует и с лишними полями
console.log(clonedIceCream === existingNewFromPlain); // false

// serialize -- преобразование инстансов в JSON сразу
import { serialize } from 'class-transformer'
const serializedCloned = serialize(clonedIceCream)
console.log(serializedCloned); // JSON
// работает с массивами
const serializedClonedArr = serialize([clonedIceCream, existingIceCream])
console.log(serializedClonedArr); // [ {...}, {...} ]

// deserialize -- для объектов ТОЛЬКО
// deserializeArray -- для массивов
import { deserialize, deserializeArray } from 'class-transformer'
const deserialized = deserialize(IceCream, serializedCloned)
const deserializedArr = deserializeArray(IceCream, serializedClonedArr)
console.log(deserialized)
console.log(deserializedArr);


