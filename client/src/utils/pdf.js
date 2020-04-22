import pdfMake from 'pdfmake/build/pdfmake';
import html2canvas from 'html2canvas';

export const convertElementToPDF = async (element, fileName, filter = () => true) => {
  try {
    const pageNumber = 3;
    const content = [];

    for (let i = 0; i < pageNumber; i++) {
      const canvas = await html2canvas(element, {
        y: (window.outerHeight + window.innerHeight) * i,
        height: window.outerHeight + window.innerHeight,
        windowHeight: window.outerHeight + window.innerHeight,
      });

      content.push({
        image: canvas.toDataURL(),
        width: 500,
      })
    }
    pdfMake.createPdf({ content }).download(fileName);
  } catch (e) {
    throw (e);
  }
};

