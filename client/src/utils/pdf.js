import pdfMake from 'pdfmake/build/pdfmake';
import html2canvas from 'html2canvas';

export const convertElementToPDF = async (element, fileName) => {
  try {
    const content = [];
    const pageWidth = 950;
    const pageHeight = 1400;
    const childCount = element.getElementsByTagName('*').length
    const elementHeight = childCount * 7.5
    const pageNumber = Math.ceil(elementHeight / pageHeight);

    console.log(pageNumber)

    for (let i = 0; i < pageNumber; i++) {
      const canvas = await html2canvas(element, {
        y: pageHeight * i,
        width: pageWidth,
        windowWidth: pageWidth,
        height: pageHeight,
        windowHeight: elementHeight,
      });

      content.push({
        image: canvas.toDataURL(),
        width: 500,
      })
    }
    if (fileName) {
      pdfMake.createPdf({ content }).download(fileName);
    } else {
      pdfMake.createPdf({ content }).open();
    }
  } catch (e) {
    throw (e);
  }
};

