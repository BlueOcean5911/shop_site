import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#EFBD4E',
  decal: 'three2',
  logo: {
    position: [0.08, 0.05, 0.11],
    scale: 0.05,
  },
  text: {
    position: [0.08, 0.07, 0.15],
    scale: 0.1,
    content: "Hello world!",
    font: {
      family: 'Arial',
      color: 'black',
      size: '48',
    }
  }
})

export { state }
