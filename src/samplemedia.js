
import loremgen from "lorem-ipsum"
const IconSVG = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='{{w}}' height='{{h}}' viewBox='0 0 {{w}} {{h}}'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><rect x='0' y='0' fill='#F8F8F8' width='100%' height='100%'/><text x='10' y='20' fill='#ccc' style="font: 14px sans-serif;">FPO: {{w}} x {{h}}</text><use xlink:href='#a' width='20%' x='40%'/></svg>`
export const avatarSquare = "https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/avatarSquare.jpg"
export const avatarPortrait = "https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/avatarPortrait.jpg"
export const lorem ={
  sentence() {
    return loremgen({
      count: 1,
      units: 'sentences'
    })
  },
  paragraph() {
    return loremgen({
      count: 1,
      units: 'paragraphs'
    })
  },
  paragraphs(count) {
    return loremgen({
      count: count || Math.floor(Math.random() * 10),
      units: 'paragraphs'
    })
  }
}
export function placeholderImage(width = 512, height = 512) {
  // We need to base64 encode this because otherwise FF will add extra escape chars
  const dataUri = btoa(
    IconSVG.replace(/{{w}}/g, width).replace(/{{h}}/g, height).trim()
  )
  return `data:image/svg+xml;base64,${dataUri}`
}
