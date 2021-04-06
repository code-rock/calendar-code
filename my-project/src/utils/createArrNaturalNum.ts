// создает массив натуральных чисел
export default function createArr(max: number) {
    return Array.from(Array(max).keys())
                .map(n => n + 1)
}