import JsPDF from 'jspdf'
import font from './fonts/THSarabun.ttf'
const CREATE_PDF = (html) => {
  let doc = new JsPDF()
  doc.addFileToVFS(font)
  doc.addFont(font, 'THsarabun', 'normal')
  doc.setFont('THsarabun')
  doc.fromHTML(html, 15, 15)
  doc.save('file.pdf')
}

export default {
  CREATE_PDF
}
