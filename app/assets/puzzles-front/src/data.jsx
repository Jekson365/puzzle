import cola from '../src/assets/products/cola.png'
import shawarma from '../src/assets/products/shawarma.png'
import water from '../src/assets/products/water.png'

export const arr = [
    {
        img: shawarma,
        name: "შაურმა პატარა",
        price: 9,
        scale: "small",
        id: 2,
        type: "shawarma"
    },
    {
        img: shawarma,
        name: "შაურმა საშუალო",
        price: 12,
        scale: "medium",
        id: 3,
        type: "shawarma"
    },
    {
        img: shawarma,
        name: "შაურმა დიდი",
        price: 5,
        type: "shawarma",
        scale: "big",
        id: 1,
    },
    {
        img: cola,
        name: 'კოკა კოლა',
        price: 2,
        id: 8,
        type: "drink",
    },
    {
        img: water,
        name: 'წყალი',
        price: 2,
        id: 9,
        type: "drink",
    },
]

export const shawaraTypeData = [
    {
        more: false,
        have: true,
        ingredient: "ხახვი"
    },
    {
        more: false,
        have: true,
        ingredient: "წიწაკა"
    },
    {
        more: false,
        have: true,
        ingredient: "კიტრი"
    },
    {
        more: false,
        have: true,
        ingredient: "მაიონეზი"
    },
]

export const reportColumns = ['კოდი','დასახელება','შეკვეთის ნომერი','ფასი','გაყიდვის დრო','მომწოდებელი','დღგ']
export const stockColumns = ['კოდი','დასახელება','ტიპი','რაოდენობა','თვითღირებულება','ფასი','მომწოდებელი']